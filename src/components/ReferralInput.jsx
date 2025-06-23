"use client";

import React, { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import clsx from "clsx";
import { FRONTEND_URL } from "@/config/config";

const ReferralInput = ({
  value,
  buttonLabel = "Copy",
  wrapperClassName = "",
  inputClassName = "",
  buttonClassName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const referralUrl = `${FRONTEND_URL}/register?referralCode=${value}`;
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center border border-orange-500 rounded-md overflow-hidden max-w-full",
        wrapperClassName
      )}
    >
      <input
        type="text"
        readOnly
        value={value}
        className={clsx(
          "flex-grow px-4 md:py-4 py-2 text-sm md:text-base truncate outline-none",
          inputClassName
        )}
      />
      <button
        onClick={handleCopy}
        className={clsx(
          "flex items-center gap-1 px-3 py-[14px] md:py-[18px] bg-orange-500 hover:bg-orange-600 text-white text-sm transition-all",
          buttonClassName
        )}
      >
        {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
        <span className="hidden sm:inline">
          {copied ? "Copied" : buttonLabel}
        </span>
      </button>
    </div>
  );
};

export default ReferralInput;
