"use client";
import { Button } from "@/components/ui/button";
import { BrowserProvider, Contract, ethers, formatUnits, parseEther } from "ethers";
import { useState, useEffect } from "react";
import ICO_CONTRACT_ABI from "@/contract/ico.json";
import { ICO_CONTRACT_ADDRESS, CSP_PRICE , OWNER_ADDRESS} from "../../env/config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutWrapper from "@/components/LayoutWrapper";
import axios from "axios";
// import { useWallet } from '../../walletContext/WalletContext';
import { userAuth } from "@/Use_Context/authContext";
import { toast } from "sonner";
import PaymentModal from "@/components/PaymentModal";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { BASE_URL } from "@/config/config";
import { LucideStretchHorizontal } from "lucide-react";

export default function BuyCSP() {
  const { authUser, userDetails } = userAuth();
  // const { account, isBuyCSPDisabled } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
    const [isTokenLoading, setIsTokenLoading] = useState(false);

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


  
const BuyToken = async () => {
  if (!authUser) {
    toast("Please log in first!");
    return;
  }

  if (!isConnected) {
    toast("Please connect wallet first");
    return;
  }

  try {
    setIsLoading(true);

    const toAddress = OWNER_ADDRESS;
    const amountInWei = parseEther(amount.toString());

    let ethersProvider = new BrowserProvider(walletProvider);
    let signer = await ethersProvider.getSigner();
    let tx;

    try {
      // Attempt using the default provider
      tx = await signer.sendTransaction({
        to: toAddress,
        value: amountInWei,
      });
    } catch (txError) {
      if (txError?.data?.cause?.isBrokenCircuitError) {
        toast.warn("Network busy. Switching to fallback RPC...");

        // Fallback provider
        const fallbackProvider = new JsonRpcProvider("https://bnb-mainnet.g.alchemy.com/v2/P3qo_KQomGJeghNc4ax9fTtxW9uEW7nF");

        // Build raw transaction
        const from = await signer.getAddress();
        const nonce = await fallbackProvider.getTransactionCount(from);
        const gasPrice = await fallbackProvider.getGasPrice();
        const gasLimit = 21000;

        const unsignedTx = {
          to: toAddress,
          value: amountInWei,
          nonce,
          gasPrice,
          gasLimit,
          chainId: await fallbackProvider.getNetwork().then(n => n.chainId),
        };

        // Sign using original signer (wallet extension)
        const signedTx = await signer.signTransaction(unsignedTx);

        // Broadcast via fallback RPC
        tx = await fallbackProvider.sendTransaction(signedTx);
      } else {
        throw txError;
      }
    }

    console.log("Transaction sent:", tx.hash);

    const payload = {
      amount,
      cryptoType: selectedCurrency,
      transactionHash: tx.hash,
    };

    const response = await axios.post(
      `${BASE_URL}/api/payment/create-payment`,
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
    toast.success("BNB sent successfully!");
  } catch (error) {
    console.error("Error sending BNB:", error);

    if (error?.code === "ACTION_REJECTED") {
      toast.error("Transaction rejected by user.");
    } else if (error?.code === "INSUFFICIENT_FUNDS") {
      toast.error("Insufficient BNB balance.");
    } else if (error?.message?.includes("user denied transaction")) {
      toast.error("You cancelled the transaction.");
    } else {
      toast.error("BNB transaction failed. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};


  
// Get total locked amount for user
const getTotalLockedAmount = async () => {
  if (!isConnected) {
    setIsTokenLoading(false)
    setTotalLockedAmount(0)
  }
  try {
    setIsTokenLoading(true)
    const provider = new BrowserProvider(walletProvider); // Reown injected provider
    const signer = await provider.getSigner();
    console.log({ICO_CONTRACT_ADDRESS, signer});
    const icoContract = new Contract(ICO_CONTRACT_ADDRESS, ICO_CONTRACT_ABI, signer);

    const lockInfoArray = await icoContract.getUserLocks(address);
console.log({lockInfoArray});
    if (!lockInfoArray || lockInfoArray.length === 0) {
        setIsTokenLoading(false)
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
  setIsTokenLoading(false)
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
      getTotalLockedAmount()
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

  return (
    <LayoutWrapper>
      <div className="relative z-30 ">
        <div className="buy-csp-container relative z-30 flex flex-wrap gap-2 mb-10 items-center justify-between">
          <h1 className="text-3xl font-bold">Buy CSP</h1>
          <div className="mt-4 text-lg bg-yellow-400 border border-yellow-100 w-fit p-2 rounded-lg text-black">
            {isTokenLoading ? "Loading..." : `Total CSP Tokens : ${totalLockedAmount}` }
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
            onClick={BuyToken}
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
          <td colSpan={6} className="p-2">No transactions found.</td>
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
          const scanLink = `https://bscscan.com/tx/${hash}`;

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
              <td className="border border-gray-300 p-2">{transaction.amount}</td>
              <td className="border border-gray-300 p-2">{transaction.cryptoType}</td>
              <td className="border border-gray-300 p-2">
                {transaction.token?.token ?? "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {transaction.token?.currentPrice ?? "-"}
              </td>
              <td className={`border border-gray-300 p-2 font-semibold ${statusColor}`}>
                {status}
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  </table>
</div>

      </div>

      {/* Payment Modal Component */}
    </LayoutWrapper>
  );
}
