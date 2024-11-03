// src/components/Sidebar.jsx
import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-base-200 shadow-lg p-4 z-50`}>
      <button onClick={toggleSidebar} className="btn btn-ghost mb-4">
        Close
      </button>
      <h2 className="text-2xl font-bold mb-4">Navigation</h2>
      <ul className="menu p-0">
        <li className="mb-2">
          <Link href="/" className="btn btn-ghost w-full text-left">
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/profile" className="btn btn-ghost w-full text-left">
            Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/posts" className="btn btn-ghost w-full text-left">
            Posts
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/profile-creation" className="btn btn-ghost w-full text-left">
            Create Post
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/users" className="btn btn-ghost w-full text-left">
            Users
          </Link>
        </li>
      </ul>
      <SignedOut>
        <div className="mt-4">
          <Link href="/sign-in" className="btn btn-primary w-full mb-2">
            Sign In
          </Link>
          <Link href="/sign-up" className="btn btn-secondary w-full">
            Sign Up
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default Sidebar;