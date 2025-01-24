"use client";

import { useState, useEffect } from "react";
import { BsPersonExclamation } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";
import { SearchCommand } from "@/components/SearchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartDropDown from "@/components/CartDropDown";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-10 w-full mx-auto px-4 sm:px-6 md:px-16 lg:px-32 fixed text-xl ${
        isScrolled
          ? "bg-white/70 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link href="/" className="text-lg font-bold text-gray-900">
          <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
        </Link>

        {/* Middle: Navigation Links (only for larger screens) */}
        <nav className="hidden md:flex gap-x-12">
          <Link href="/" className="text-gray-800 hover:text-black">
            Home
          </Link>
          <Link href="/shop" className="text-gray-800 hover:text-black">
            Shop
          </Link>
          <Link href="/blog" className="text-gray-800 hover:text-black">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-black">
            Contact
          </Link>
        </nav>

        {/* Right: Icons (visible on all devices) */}
        <div className="flex items-center space-x-5">
          {/* Search */}
          <SearchCommand />

          {/* Account */}
          <Link href="/myaccount" className="text-gray-800 hover:text-black">
            <BsPersonExclamation size={20} />
          </Link>

          {/* Wishlist */}
          <Link href="/shop" className="text-gray-800 hover:text-black">
            <IoMdHeartEmpty size={20} />
          </Link>

          {/* Cart */}
          <Sheet>
            <SheetTrigger>
              <IoCartOutline size={20} className="text-gray-800 hover:text-black" />
            </SheetTrigger>
            <SheetContent>
              <CartDropDown />
            </SheetContent>
          </Sheet>

          {/* Hamburger Menu for Mobile */}
          <Sheet>
            <SheetTrigger>
              <RxHamburgerMenu size={20} className="text-gray-800 hover:text-black" />
            </SheetTrigger>
            <SheetContent className="p-4">
              <nav className="space-y-8 text-lg mt-6">
                <Link href="/" className="font-medium text-gray-900 block">
                  Home
                </Link>
                <Link href="/shop" className="font-medium text-gray-900 block">
                  Shop
                </Link>
                <Link href="/blog" className="font-medium text-gray-900 block">
                  Blog
                </Link>
                <Link href="/contact" className="font-medium text-gray-900 block">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
