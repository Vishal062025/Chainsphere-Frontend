"use client";
import React from "react";

export default function PaymentModal({ isOpen, onClose, onSelectCurrency }) {
  if (!isOpen) return null;

  const currencies = ["ETH", "USDT", "BNB", "BTC"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Choose Payment Option</h2>
        <div className="grid grid-cols-2 gap-4">
          {currencies.map((currency) => (
            <button
              key={currency}
              onClick={() => onSelectCurrency(currency)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
            >
              {currency}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
