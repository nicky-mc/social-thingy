// src/components/Navbar.jsx
"use client";
import React, { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg p-4 text-white">
        <div className="flex-1">
          <Link href="/" className="text-2xl font-bold">
            Social Thingy
          </Link>
        </div>
        <div className="flex-none">
          <button onClick={toggleSidebar} className="btn btn-ghost mr-2">
            Menu
          </button>
          <SignedOut>
            <Link href="/sign-in" className="btn btn-primary mr-2">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn btn-secondary">
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;