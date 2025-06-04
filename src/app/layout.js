import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/Use_Context/authContext";
import Footer from "@/components/Footer";
import {AppKit} from "@/context/appkit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chainsphere",
  description: "ICO for Chainsphere",
  icons: {
    icon: "/favicon.svg", // or '/your-custom-logo.svg'
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      {/* <WalletProvider> */}
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
           <AppKit>
             <Navbar />
            {children}
            </AppKit>
            {/* <main className="mt-16">{children}</main> */}
            <Toaster />
            <Footer />
          </body>
        </html>
      {/* </WalletProvider> */}


    </AuthContextProvider>
  );
}
