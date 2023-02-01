"use client";

import Link from "next/link";
import LoginButton from "@/app/components/auth/GoogleSignInButton";

const Header = () => {
  return (
    <header className="bg-[#242424] py-6 px-5">
      <nav className="center flex items-center text-sm font-medium uppercase tracking-wider text-stone-500">
        <ul className="ml-auto">
          <li>
            <h1>DOGWATERPOOPPBREAH</h1>
          </li>
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
