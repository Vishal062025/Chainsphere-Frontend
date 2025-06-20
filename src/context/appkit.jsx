"use client";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bsc, bscTestnet } from "@reown/appkit/networks";

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
console.log({projectId});
// 2. Create a metadata object
const metadata = {
    name: "Chainsphere",
    description: "The world is on the brink of an artificial intelligence revolution, and Chainsphere is at the forefront. Our vision is to create a decentralized, AI-powered ecosystem that transforms industries, enhances efficiency, and drives automation across multiple sectors.",
    url: "https://chainsphere.tech", // origin must match your domain & subdomain
    icons: ["https://chainsphere.tech/images/logo.svg"],
};

// 3. Create the AppKit instance
createAppKit({
    adapters: [new EthersAdapter()],
    metadata,
    networks: [bscTestnet],
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