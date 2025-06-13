import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
} from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer" className="bg-neutral-950 z-40 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-50 mb-16">
          {/* <!-- Company Info --> */}
          <div className="space-y-6">
            <Image
              height={43}
              width={32}
              loading="lazy"
              className="h-8 transition-opacity duration-300 opacity-100"
              src="/images/logo.svg"
              alt="Chainsphere Logo"
            />
            <p className="text-gray-400">
              Decentralized, AI-powered ecosystem that transforms industries,
              enhances efficiency, and drives automation
            </p>
            <div className="flex space-x-4">
              <div className="flex space-x-4">
                <Link
                  href="https://x.com/Chainsphere_?t=GvX-EJORfhsiOgMaW-0wsQ&s=09"
                  target="_blank"
                  className="text-[#FF9500] hover:text-white transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />

                </Link>
                <Link
                  href="/"
                  className="text-[#FF9500] hover:text-white transition-colors"
                >
                                      <FaLinkedin className="w-5 h-5" />

                </Link>
                <Link
                  href="/"
                  className="text-[#FF9500] hover:text-white transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61575010522887&mibextid=ZbWKwL"
                  target="_blank"
                  className="text-[#FF9500] hover:text-white transition-colors"
                >
                                    <FaFacebook className="w-5 h-5" />

                </Link>
                <Link
                  href="https://www.instagram.com/chain_sphere?igsh=aW54cThyczViYm1z"
                  target="_blank"
                  className="text-[#FF9500] hover:text-white transition-colors"
                >
                  {/* <Instagram className="w-5 h-5" /> */}
                  <FaInstagram className="w-5 h-5" />

                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Quick Links --> */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 flex flex-col">
              <Link
                href="/assets/docs/NebulaStrideWhitepaper.pdf"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                rel="noopener noreferrer"
              >
                Whitepaper
              </Link>
              <Link
                href="#features"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="#home"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              {/* <Link className='text-gray-400 hover:text-white transition-colors' href="/refer" replace>Refer & Earn</Link>  */}
            </ul>
          </div>

          {/* <!-- Resources --> */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 flex flex-col">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Documentation
              </Link>
              {/* <li><a href="/" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li> */}
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </Link>
            </ul>
          </div>

          {/* <!-- Newsletter --> */}
        </div>

        {/* <!-- Bottom --> */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Chainsphere. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
