"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bsc } from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Create a metadata object
const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
    adapters: [new EthersAdapter()],
    metadata,
    networks: [bsc],
    projectId,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
});

export function AppKit({children}) {
    return (
        <>
            {children}
            
        </>
    );
}