"use client";

import { React, useEffect, useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import axios from "axios";
import { useWallet } from "@/walletContext/WalletContext";
// import { useWallet } from "@/context/WalletContext";  //added

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  // const { sendTransaction, account } = useWallet();  //added
  const { account } = useWallet();


  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage

      try {
        const response = await axios.get(
          "http://3.109.67.109:8001/api/v1/user/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setTransactions(response.data.data);
      } catch (err) {
        if (err.response.status == 404) {
          alert("No Transaction for your wallet address yet.");
        }
        setError("No Transaction for your wallet address yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

   const handleCurrencySelect = async (currency) => {
    setSelectedCurrency(currency);
    setModalOpen(false);
    console.log("Selected currency show:", currency);
    // You can also trigger backend payment API here
    
       if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    // Example recipient address and value
    const recipient = "0xRecipientAddressHere"; // Replace with your payment address
    const valueInEth = currency === "ETH" ? "0.01" : "0.005"; // Just example amounts

    try {
      // Send transaction using wallet context
      // await sendTransaction({ to: recipient, valueInEth });

      // Optionally record transaction on your backend
      const token = localStorage.getItem("token");
      await axios.post(
        "http://3.109.67.109:8001/api/v1/user/record-transaction",
        {
          currency,
          amount: valueInEth,
          wallet: account,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Transaction successful and recorded.");
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Transaction failed.");
    }



  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>No transactions to show</div>;

  return (
    <div
      style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF", padding: "20px" }}
    >
      <h1 style={{ color: "#FFA500" }}>Your Transaction History</h1>

         <button                   //button show 
        onClick={() => setModalOpen(true)}
        style={{
          backgroundColor: "#FFA500",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Make Payment
      </button>

      {selectedCurrency && (
        <p>
          Selected Payment Currency:{" "}
          <strong style={{ color: "#FFA500" }}>{selectedCurrency}</strong>
        </p>
      )}

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            style={{
              marginBottom: "15px",
              border: "1px solid #FFA500",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              Transaction Hash:{" "}
              <span style={{ color: "#FFA500" }}>
                {transaction.transactionHash}
              </span>
            </p>
            <p>
              Amount:{" "}
              <span style={{ color: "#FFA500" }}>${transaction.amount}</span>
            </p>
            <p>
              Price:{" "}
              <span style={{ color: "#FFA500" }}>{transaction.price}</span>
            </p>
            <p>
              Value:{" "}
              <span style={{ color: "#FFA500" }}>{transaction.value}</span>
            </p>
            <p>
              Status:{" "}
              <span style={{ color: "#FFA500" }}>{transaction.status}</span>
            </p>
            <p>
              Type: <span style={{ color: "#FFA500" }}>{transaction.type}</span>
            </p>
            <p>
              Created At:{" "}
              <span style={{ color: "#FFA500" }}>
                {new Date(transaction.createdAt).toLocaleString()}
              </span>
            </p>
          </li>
        ))}
      </ul>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelectCurrency={handleCurrencySelect}
      />
    </div>
  );
}
