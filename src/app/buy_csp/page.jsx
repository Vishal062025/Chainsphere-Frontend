"use client";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "@/contract/ico.json";
import abi1 from "@/contract/usdt.json";
import { CSP_PRICE, ICO_CONTRACT_ADDRESS } from "../../env/config";
import { USDT_CONTRACT_ADDRESS } from "../../env/config";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutWrapper from '@/components/LayoutWrapper';
import axios from "axios";
// import { useWallet } from '../../walletContext/WalletContext'; // Import the useWallet hook
import { userAuth } from "@/Use_Context/authContext";
import Image from "next/image";

export default function BuyCSP() {
  const { authUser, userDetails } = userAuth();

  // const { account, isBuyCSPDisabled } = useWallet(); // Get account and button state from wallet context
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract1, setContract1] = useState(null);
  const [bnbPrice, setBnbPrice] = useState("0");
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [estimatedCSP, setEstimatedCSP] = useState(0.00); // Default value
  const [amount, setAmount] = useState(0.0); // New state for amount input
  const [cspPrice, setCspPrice] = useState(0.0);
  const token = authUser; // Retrieve token from local storage
  useEffect(() => {
    async function initialize() {
      const res = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd")
      setBnbPrice(res.data.binancecoin.usd);
      if (!window.ethereum) return alert("Please install MetaMask");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(ICO_CONTRACT_ADDRESS, abi, signer);
      try {
        const price = await contract.tokenPrice();
        const formattedPrice = ethers.formatUnits(price, 18); // Convert from wei to token price
        setCspPrice(formattedPrice); // Set the formatted price
        // if (cspPrice == 0) {
        //   alert("ICO sale has not started yet");
        // }
      }
      catch (err) {
        alert("Something went wrong.")
        console.log("Error while fetching tokenPrice:", err);
      }
      const contract1 = new ethers.Contract(USDT_CONTRACT_ADDRESS, abi1, signer);
      setContract1(contract1);
      setSigner(signer);
      setContract(contract);
    }
    initialize();
  }, []);

  useEffect(() => {
    console.log("bnbPrice", bnbPrice);
  }, [bnbPrice, cspPrice]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    calculateEstimatedCSP(amount, event.target.value); // Recalculate when currency changes
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(Number(value)); // Convert to number before setting
    calculateEstimatedCSP(value, selectedCurrency); // Recalculate estimated CSP based on amount
  };

  const calculateEstimatedCSP = (amount, currency) => {
    if (currency === "USDT") {
      setEstimatedCSP((amount / cspPrice).toFixed(4)); // Calculate for USDT
    } else {
      setEstimatedCSP((bnbPrice / cspPrice) * amount); // Calculate for BNB
    }
  };

  const addTransactionToDB = async (hash, currency, amount, totalValue, price) => {
    const value = totalValue.toString();// Calculate value
    const status = "completed";
    const type = "buy";
    const transactionData = {
      transactionHash: hash.toString(),
      amount: amount.toString() + " " + currency,
      price: price.toString() + " " + currency,
      value: value,
      status: status,
      type: type,
    };
    try {
      await axios.post("http://3.109.67.109:8001/api/v1/user/transaction", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Transaction added to DB:", transactionData);
    } catch (error) {
      console.error("Error adding transaction to DB:", error.response ? error.response.data : error.message);
    }
  }

  const BuyToken = async (i, amount) => {

    if (!authUser) {
      alert("Please Log in first!");
      return;
    }

    // if (!account) { // Check if the user is connected
    //   alert("Please connect your wallet to proceed.");
    //   return;
    // }

    // if (isBuyCSPDisabled) {
    //   alert("Please connect your correct wallet account");
    //   return;
    // }

    // else if ()
    try {
      if (i === 0) {
        try {
          const bnb = ((1 / bnbPrice) * cspPrice).toFixed(8);
          console.log("bnb for scan :", bnb)
          const amountInWei = ethers.parseUnits(amount.toString(), 18); // Convert amount to Wei
          const bnbInWei = ethers.parseUnits(bnb.toString(), 18);
          console.log("value in wie:", amountInWei)
          console.log("bnbPrice in wei:", bnbInWei);
          const tx = await contract.buyToken(0, bnbInWei, { value: amountInWei });  // Pass amountInWei as msg.value
          await tx.wait();
          alert("BNB payment successful, Token transaction successful!");
          const bnb1 = ((1 / bnbPrice) * cspPrice).toFixed(8)
          try {

            await addTransactionToDB(tx.hash, "BNB", amount, estimatedCSP, bnb1)
          }
          catch (err) {
            console.log("error while adding to db : ".err);
          }
        } catch (err) {
          console.log("BNB failed due to: ", err);
          alert("Please wait for the ICO to be ACTIVE!")
        }
      } else {
        try {
          const amountInWei = ethers.parseUnits(amount.toString(), 18);
          const usdtContract = await contract1.approve(ICO_CONTRACT_ADDRESS, amountInWei);
          await usdtContract.wait();
          const tx = await contract.buyToken(amountInWei, 0); // Pass the USDT amount
          await tx.wait();
          alert("Token transaction successful");
          try {
            await addTransactionToDB(tx.hash, "USDT", amount, estimatedCSP, cspPrice)
          }
          catch (err) {
            console.log("error while adding to db : ".err);
          }
        }
        catch (err) {
          console.log("error in usdt", err)
          alert("Please wait for the ICO to be ACTIVE!")
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Token transaction unsuccessful");
    }
  }

  return (
    <LayoutWrapper>
      {/* // background image start   */}
      <div className="bgImage fixed z-20 top-[73%] translate-y-[-50%] left-[55%] translate-x-[-50%]">
        <Image loading="lazy" width={300} height={300} src="/images/logo.svg" alt="Logo" className="logo opacity-50 blursm z-20 size-[300px]" />
      </div>
      {/* // background image ends    */}
      <div className="relative z-30 ">


        <div className="buy-csp-container relative z-30 flex flex-wrap gap-2 mb-10 items-center justify-between">
          <h1 className="text-3xl font-bold">Buy CSP</h1>
          {/* Dynamic Text Display */}
          <div className="mt-4 text-lg bg-yellow-400 border border-yellow-100 w-fit  p-2 rounded-lg text-black">
            {selectedCurrency === "USDT"
              ? `1 CSP = ${cspPrice}`
              : `1 CSP = ${((1 / bnbPrice) * CSP_PRICE).toFixed(8)} BNB`}
          </div>
        </div>



        <div className="flex flex-row flex-wrap gap-4 sm:gap-0 items-center justify-between bg-[#ffbe192b] backdrop-blur-lg p-4 rounded-lg mt-4">
          <div className="flex flex-col space-y-2 mr-2">
            <Label htmlFor="currency" className="" >Currency</Label>
            <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange} className="bg-white text-black border- outline-none font-semibold [1px] border-gray-300 m-0 px-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
            p-3">
              {/* <option selected>Choose a currency</option> */}
              <option defaultValue={true} value="USDT">USDT</option>
              <option value="BNB">BNB</option>
            </select>
          </div>




          <div className="flex flex-col space-y-2 mx-2">
            <Label htmlFor="amount ">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              className="bg-gray-300"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange} // Update amount on change
            />
          </div>

          <div className="flex flex-col space-y-2 ml-2">
            <Label htmlFor="estimatedCSP">Est CSP Tokens</Label>
            <Input id="estimatedCSP" type="text" value={`${estimatedCSP}`} readOnly />
          </div>
          
        </div>

        {/* Centered Buy CSP Button */}
        <div className="flex justify-center mr-24  relative z-30 mt-4">
          <Button className="hover:text-white hover:brightness-90 cursor-pointer" onClick={() => BuyToken(selectedCurrency === "USDT" ? 1 : 0, amount)} >
            {/* disabled={!account || isBuyCSPDisabled || !authUser} */}
            Buy CSP
          </Button>
        </div>

        {/* Disclaimer Text below the button */}
        {selectedCurrency === "BNB" && (
          <p className="mt-2 text-sm text-white text-center">
            **The <span className="text-yellow-400">BNB</span> price is volatile, the live price will be considered.**
          </p>
        )}
      </div>
    </LayoutWrapper>
  );
}