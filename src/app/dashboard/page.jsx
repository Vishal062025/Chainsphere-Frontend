"use client";
import { Button } from "@/components/ui/button";
import {
  BrowserProvider,
  Contract,
  ethers,
  JsonRpcProvider,
  formatUnits,
  parseEther,
} from "ethers";
import { useState, useEffect } from "react";
import ICO_CONTRACT_ABI from "@/contract/ico.json";
import ERC20_ABI from "@/contract/usdt.json";
import {
  ICO_CONTRACT_ADDRESS,
  CSP_PRICE,
  OWNER_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "../../env/config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutWrapper from "@/components/LayoutWrapper";
import axios from "axios";
import { Dialog } from "@/components/ui/dialog";
// import { useWallet } from '../../walletContext/WalletContext';
import { userAuth } from "@/Use_Context/authContext";
import { toast } from "sonner";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BASE_URL } from "@/config/config";

export default function BuyCSP() {
  const { authUser, checkAuth } = userAuth();
  // const { account, isBuyCSPDisabled } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [txHex, setTxHex] = useState("");

  const [totalLockedAmount, setTotalLockedAmount] = useState(0);
  const [bnbPrice, setBnbPrice] = useState("0");
  const [selectedCurrency, setSelectedCurrency] = useState("BNB");
  const [estimatedCSP, setEstimatedCSP] = useState(0.0);
  const [amount, setAmount] = useState(0.0);

  const token = authUser;
  const [transactions, setTransactions] = useState([]);
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  useEffect(() => {
    async function initialize() {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
      );
      console.log({ binanceprice: res.data.binancecoin.usd });
      setBnbPrice(res.data.binancecoin.usd);
    }

    initialize();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    calculateEstimatedCSP(amount, event.target.value);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(Number(value));
    calculateEstimatedCSP(value, selectedCurrency);
  };

  const calculateEstimatedCSP = (amount, currency) => {
    if (currency === "USDT") {
      setEstimatedCSP((amount / CSP_PRICE).toFixed(4));
    } else {
      setEstimatedCSP(((bnbPrice / CSP_PRICE) * amount).toFixed(4));
    }
  };

  // Actual token buying function

  const BuyToken = async (
    _paymentId = null,
    _amount = null,
    _cryptoType = null
  ) => {
    console.log(_paymentId,_amount,_cryptoType,89)
    let isBuyPaymentId = false;
    console.log(_paymentId,90)
    if (_paymentId) {
      isBuyPaymentId = true;
    }
    console.log(amount,isBuyPaymentId,94)
    const newAmount = isBuyPaymentId ? _amount : amount;
    const newCryptoType = isBuyPaymentId ? _cryptoType : selectedCurrency;
    let newPaymentId;
    if (!authUser) return toast("Please log in first!");
    if (!isConnected) return toast("Please connect wallet first");
    console.log(newAmount,99)
    if (isNaN(newAmount) || newAmount <= 0) {
      return toast.error("Please enter a valid amount");
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const toAddress = OWNER_ADDRESS;
      const amountInWei = parseEther(newAmount.toString());

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const from = await signer.getAddress();

      let tx;
      if (isBuyPaymentId) {
        newPaymentId = _paymentId;
      } else {
        const createPaymentPayload = {
          amount: newAmount,
          cryptoType: newCryptoType,
        };
        try {
          const createPayment = await axios.post(
            `${BASE_URL}/api/payment/create-payment`,
            createPaymentPayload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          newPaymentId = createPayment.data.data.id;
        } catch (error) {
          throw error;
        }
      }

      console.log("Payment API response:", newPaymentId);
      if (newCryptoType === "BNB") {
        try {
          tx = await signer.sendTransaction({
            to: toAddress,
            value: amountInWei,
          });
        } catch (txError) {
          console.log(txError, 111);
          if (txError?.data?.cause?.isBrokenCircuitError) {
            toast.warn("Network busy. Using fallback RPC...");

            const fallbackProvider = new JsonRpcProvider(
              "https://bsc-dataseed.binance.org/"
            );
            const nonce = await fallbackProvider.getTransactionCount(from);
            const gasPrice = await fallbackProvider.getGasPrice();

            const unsignedTx = {
              to: toAddress,
              value: amountInWei,
              nonce,
              gasPrice,
              gasLimit: 21000,
              chainId: await fallbackProvider
                .getNetwork()
                .then((n) => n.chainId),
            };

            const signedTx = await signer.signTransaction(unsignedTx);
            tx = await fallbackProvider.sendTransaction(signedTx);
          } else {
            throw txError;
          }
        }
      } else if (newCryptoType === "USDT") {
        const usdtContract = new Contract(
          USDT_CONTRACT_ADDRESS,
          ERC20_ABI,
          signer
        );
        const fallbackProvider = new JsonRpcProvider(
          "https://bsc-dataseed.binance.org/"
        );
        const fallbackSigner = fallbackProvider.getSigner(from);
        const fallbackUsdtContract = new Contract(
          USDT_CONTRACT_ADDRESS,
          ERC20_ABI,
          fallbackSigner
        );

        try {
          try {
            const approvalTx = await usdtContract.approve(
              toAddress,
              amountInWei
            );
            const receipt = await approvalTx.wait();
            if (!receipt.status)
              throw new Error("Approval transaction failed.");
          } catch (approvalError) {
            if (approvalError?.data?.cause?.isBrokenCircuitError) {
              toast.warn("Approval failed, using fallback RPC...");

              const nonce = await fallbackProvider.getTransactionCount(from);
              const gasPrice = await fallbackProvider.getGasPrice();

              const approvalData =
                fallbackUsdtContract.interface.encodeFunctionData("approve", [
                  toAddress,
                  amountInWei,
                ]);

              const txRequest = {
                to: USDT_CONTRACT_ADDRESS,
                data: approvalData,
                nonce,
                gasPrice,
                gasLimit: 100000,
                chainId: await fallbackProvider
                  .getNetwork()
                  .then((n) => n.chainId),
              };

              const signedTx = await signer.signTransaction(txRequest);
              await fallbackProvider.sendTransaction(signedTx);
            } else if (approvalError?.code === "ACTION_REJECTED") {
              return toast.error("Approval rejected by user.");
            } else {
              console.error("Approval failed:", approvalError);
              return toast.error("USDT approval failed.");
            }
          }

          try {
            tx = await usdtContract.transfer(toAddress, amountInWei);
          } catch (transferError) {
            if (transferError?.data?.cause?.isBrokenCircuitError) {
              toast.warn("Transfer failed, using fallback RPC...");

              const nonce = await fallbackProvider.getTransactionCount(from);
              const gasPrice = await fallbackProvider.getGasPrice();

              const transferData =
                fallbackUsdtContract.interface.encodeFunctionData("transfer", [
                  toAddress,
                  amountInWei,
                ]);

              const txRequest = {
                to: USDT_CONTRACT_ADDRESS,
                data: transferData,
                nonce,
                gasPrice,
                gasLimit: 100000,
                chainId: await fallbackProvider
                  .getNetwork()
                  .then((n) => n.chainId),
              };

              const signedTx = await signer.signTransaction(txRequest);
              tx = await fallbackProvider.sendTransaction(signedTx);
            } else if (transferError?.code === "ACTION_REJECTED") {
              return toast.error("Transfer rejected by user.");
            } else {
              console.error("Transfer error:", transferError);
              return toast.error("USDT transfer failed.");
            }
          }
        } catch (usdtError) {
          console.error("USDT error:", usdtError);
          return toast.error("USDT transaction failed.");
        }
      }

      console.log("Transaction sent:", tx.hash);

      const payload = {
        paymentId: newPaymentId,
        transactionHash: tx.hash,
      };

      const response = await axios.post(
        `${BASE_URL}/api/payment/execute-payment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment API response:", response.data);
      await fetchTransactions();

      toast.success(`${newCryptoType} sent successfully!`);
    } catch (error) {
      console.error(`Error sending ${newCryptoType}:`, error);

      if (error?.code === "ACTION_REJECTED") {
        toast.error("Transaction rejected by user.");
      } else if (error?.code === "INSUFFICIENT_FUNDS") {
        toast.error("Insufficient balance.");
      } else if (error?.message?.includes("user denied transaction")) {
        toast.error("You cancelled the transaction.");
      } else {
        toast.error(`${newCryptoType} transaction failed. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Buy token by hash
  const buyTokenByHash = async (paymentId, transactionHash) => {
    try {
      const payload = {
        paymentId,
        transactionHash,
      };

      const response = await axios.post(
        `${BASE_URL}/api/payment/execute-payment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment API response:", response.data);
      setTxHex("")
      setOpenDialog(false)
      await fetchTransactions();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
      setOpenDialog(false)
      setTxHex("")
    }
  };

  // Get total locked amount for user
  const getTotalLockedAmount = async () => {
    if (!isConnected) {
      setIsTokenLoading(false);
      setTotalLockedAmount(0);
    }
    try {
      setIsTokenLoading(true);
      const provider = new BrowserProvider(walletProvider); // Reown injected provider
      const signer = await provider.getSigner();
      console.log({ ICO_CONTRACT_ADDRESS, signer });
      const icoContract = new Contract(
        ICO_CONTRACT_ADDRESS,
        ICO_CONTRACT_ABI,
        signer
      );

      const lockInfoArray = await icoContract.getUserLocks(address);
      // console.log({lockInfoArray});
      if (!lockInfoArray || lockInfoArray.length === 0) {
        setIsTokenLoading(false);
        return "0";
      }

      // Sum all amounts
      const totalAmount = lockInfoArray.reduce((acc, lock) => {
        return acc + BigInt(lock.amount);
      }, 0n);

      // Format for display (assuming 18 decimals)
      setTotalLockedAmount(Number(formatUnits(totalAmount, 18)).toFixed(2));
    } catch (error) {
      console.error("Error fetching locked tokens:", error);
      setTotalLockedAmount(0);
    }
    setIsTokenLoading(false);
  };

  // Fetch transactions code remains same
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/payment/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data.data);
      getTotalLockedAmount();
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    const anyPending = transactions.some((tx) => tx.isActive);

    if (anyPending) {
      const interval = setInterval(() => {
        fetchTransactions();
      }, 2000); // Refresh every 2 seconds

      return () => clearInterval(interval); // Clean up when unmounted or no pending tx
    }
  }, [transactions]);

  useEffect(() => {
    if (authUser) {
      fetchTransactions();
    }
  }, [authUser, isConnected, address]);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <LayoutWrapper>
      <div className="relative z-30 ">
        <div className="buy-csp-container relative z-30 flex flex-wrap gap-2 mb-10 items-center justify-between">
          <h1 className="text-3xl font-bold">Buy CSP</h1>
          <div className="mt-4 text-lg bg-yellow-400 border border-yellow-100 w-fit p-2 rounded-lg text-black">
            {isTokenLoading
              ? "Loading..."
              : `Total CSP Tokens : ${totalLockedAmount}`}
          </div>
          <div className="mt-4 text-lg bg-yellow-400 border border-yellow-100 w-fit p-2 rounded-lg text-black">
            {selectedCurrency === "USDT"
              ? `1 CSP = ${CSP_PRICE}`
              : `1 CSP = ${((1 / bnbPrice) * CSP_PRICE).toFixed(8)} BNB`}
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 sm:gap-0 items-center justify-between bg-[#ffbe192b] backdrop-blur-lg p-4 rounded-lg mt-4">
          <div className="flex flex-col space-y-2 mr-2">
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="bg-white text-black border outline-none font-semibold border-gray-300 px-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            >
              <option value="BNB">BNB</option>
              <option value="USDT">USDT</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2 mx-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              className="bg-gray-300"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className="flex flex-col space-y-2 ml-2">
            <Label htmlFor="estimatedCSP">Est CSP Tokens</Label>
            <Input
              id="estimatedCSP"
              type="text"
              value={`${estimatedCSP}`}
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <Button
            className="hover:text-white hover:brightness-90 cursor-pointer"
            onClick={()=>BuyToken()}
            disabled={isLoading}
          >
            {/* disabled={!account || isBuyCSPDisabled || !authUser} */}
            {isLoading ? "Loading..." : "Buy and Stake"}
          </Button>
        </div>

        {/* Disclaimer Text below the button */}
        {selectedCurrency === "BNB" && (
          <p className="mt-2 text-sm text-white text-center">
            **The <span className="text-yellow-400">BNB</span> price is
            volatile, the live price will be considered.**
          </p>
        )}

        {/* Trasaction history */}

        <div className="mt-10 overflow-x-auto">
          <h2 className="mb-4 font-semibold text-3xl">Transaction History</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-200 text-center">
            <thead className="border border-gray-300 bg-[#ffbe192b] rounded-lg">
              <tr>
                <th className="border border-gray-300 p-2">Transaction Hash</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Crypto Type</th>
                <th className="border border-gray-300 p-2">CSP Tokens</th>
                <th className="border border-gray-300 p-2">CSP Price</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-2">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => {
                  const status = transaction.isActive
                    ? "Pending"
                    : transaction.isCompleted
                    ? "Completed"
                    : "Cancelled";

                  const statusColor =
                    status === "Completed"
                      ? "text-green-600"
                      : status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600";

                  const hash = transaction.transactionHash;
                  const shortHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`;
                  const scanLink = `https://testnet.bscscan.com/tx/${hash}`;

                  return (
                    <tr key={transaction.id} className="border border-gray-300">
                      <td className="border border-gray-300 p-2">
                        <a
                          href={scanLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {shortHash}
                        </a>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.amount}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.cryptoType}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.token?.token ?? "-"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {transaction.token?.currentPrice ?? "-"}
                      </td>
                      <td className="border border-gray-300 p-2 font-semibold">
                        {!transaction.isExecuted ? (
                          <Button
                          variant="outline"
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setOpenDialog(true);
                            }}
                            className="border"
                          >
                            Review
                          </Button>
                        ) : (
                          <span className={`font-semibold ${statusColor}`}>
                            {status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Content className="p-6  border border-yellow-500 shadow-xl ">
          <Dialog.Header>
            <Dialog.Title className="text-lg font-semibold">
              Review Transaction
            </Dialog.Title>
            <Dialog.Close />
          </Dialog.Header>

          {/* Option 1: Enter Hash */}
          <div className="mb-6">
            <label
              htmlFor="transactionHex"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Already have a transaction hash?
            </label>
            <input
              id="transactionHex"
              type="text"
              placeholder="Enter your transaction hash here..."
              className="w-full rounded-md border mt-3 px-3 py-2 text-sm shadow-sm backdrop-blur-lg"
              value={txHex}
              onChange={(e) => setTxHex(e.target.value)}
            />
            <Button
              variant="outline"
              className="mt-6 w-full"
              disabled={!txHex.trim()}
              onClick={() => {
                buyTokenByHash(selectedTransaction.id,txHex.trim())
              }}
            >
              Proceed with Hash
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                OR
              </span>
            </div>
          </div>

          {/* Final Action Buttons */}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                BuyToken(selectedTransaction.id,selectedTransaction.amount,selectedTransaction.cryptoType)
                setOpenDialog(false);
              }}
              disabled={txHex!==""}
            >
              Buy And Stake
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </LayoutWrapper>
  );
}
