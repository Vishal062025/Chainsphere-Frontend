'use client';
import React, { createContext, useContext, useState } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import axios from 'axios';
import { BASE_URL } from "../config/config";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [isBuyCSPDisabled, setIsBuyCSPDisabled] = useState(false);
    const [provider, setProvider] = useState(null);

    const connectWallet = async (type = "metamask") => {
        try {
            let selectedProvider;
            if (type === "walletconnect") {
                selectedProvider = new WalletConnectProvider({
                    rpc: {
                        1: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY", // Replace with your Infura key
                        137: "https://polygon-rpc.com"
                    }
                });
                await selectedProvider.enable();
            } else if (window.ethereum) {
                selectedProvider = window.ethereum;
                await selectedProvider.request({ method: 'eth_requestAccounts' });
            } else {
                alert('Please install MetaMask!');
                return;
            }

            const ethersProvider = new ethers.providers.Web3Provider(selectedProvider);
            const signer = ethersProvider.getSigner();
            const address = await signer.getAddress();

            setProvider(selectedProvider);
            setAccount(address);
            console.log('Connected account:', address);

            const token = localStorage.getItem("token");
            if (!token) {
                alert('Authentication required. Please log in.');
                return;
            }

            const res = await axios.post(`${BASE_URL}/user/add-address`, {
                address
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("Wallet address result from database:", res);
            setIsBuyCSPDisabled(false);

        } catch (error) {
            if ((error.response && [400, 401, 501].includes(error.response.status))) {
                const { data } = error.response;
                if (data.message === "Invalid wallet address") {
                    alert(data.message);
                    setIsBuyCSPDisabled(true);
                } else if (data.message === "Wallet address already added") {
                    setIsBuyCSPDisabled(false);
                } else {
                    setIsBuyCSPDisabled(true);
                    console.error('Unexpected error:', data.message);
                }
            } else {
                console.error('Error connecting wallet:', error);
            }
        }
    };

    const disconnectWallet = async () => {
        setAccount(null);
        setIsBuyCSPDisabled(false);
        if (provider?.disconnect) {
            await provider.disconnect();
        }
        setProvider(null);
        console.log('Disconnected wallet');
    };

    return (
        <WalletContext.Provider value={{ account, connectWallet, disconnectWallet, isBuyCSPDisabled }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);



// 'use client';
// import React, { createContext, useContext, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from "../config/config";

// const WalletContext = createContext();

// export const WalletProvider = ({ children }) => {
//     const [account, setAccount] = useState(null);
//     const [isBuyCSPDisabled, setIsBuyCSPDisabled] = useState(false);
//     const [provider, setProvider] = useState(null); // 🔹 Track wallet provider

//     // JWT token here:
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... 

//     // 🔗 Connect to MetaMask and register wallet address
//     const connectWallet = async () => {
//         if (window.ethereum) {
//             try {
//                 const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//                 setAccount(accounts[0]);
//                 console.log('Connected account:', accounts[0]);

//                 // Get token from localStorage
//                 const token = localStorage.getItem("token");
//                 console.log("Token before API call:", token);
//                 if (!token) {
//                     console.error('No token found. Please log in.');
//                     alert('Authentication required. Please log in.');
//                     return;
//                 }

//                 const walletAddress = String(accounts[0]);
//                 console.log("Wallet address being sent:", walletAddress);

//                 // Send wallet address to backend
//                 const res = await axios.post(`${BASE_URL}/user/add-address`, {
//                     address: walletAddress
//                 }, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 console.log("Wallet address result from database:", res);
//                 setIsBuyCSPDisabled(false); // Enable buy button

//             } catch (error) {
//                 // Handle common errors
//                 if ((error.response && error.response.status === 401) ||
//                     error.response.status == 501 || error.response.status == 400) {

//                     const { data } = error.response;

//                     if (data.message === "Invalid wallet address") {
//                         alert(data.message);
//                         setIsBuyCSPDisabled(true);
//                     } else if (data.message === "Wallet address already added") {
//                         setIsBuyCSPDisabled(false); // Wallet is already registered
//                     } else {
//                         setIsBuyCSPDisabled(true);
//                         console.error('Unexpected error message:', data.message);
//                     }
//                 } else {
//                     console.error('Error connecting to MetaMask:', error);
//                 }
//             }
//         } else {
//             alert('Please install MetaMask!');
//         }
//     };

//     //Disconnect wallet
//     const disconnectWallet = async () => {
//         setAccount(null);
//         setIsBuyCSPDisabled(false);
//         console.log('Disconnected wallet');

//         if (provider?.disconnect) {
//             await provider.disconnect(); // Disconnect WalletConnect if ever used
//         }
//     };

//     // Context provider with exposed values and functions
//     return (
//         <WalletContext.Provider value={{
//             account,
//             connectWallet,
//             disconnectWallet,
//             isBuyCSPDisabled
//         }}>
//             {children}
//         </WalletContext.Provider>
//     );
// };

// // Custom hook to use wallet context
// export const useWallet = () => useContext(WalletContext);
