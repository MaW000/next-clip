"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "../components/auth/SignInButton";

const Header = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  function handleUrl() {
    var matches = url.match(/\d+/g);

    if (matches === null) {
      setError("Please enter a valid VideoID");
    } else if (matches[0].length === 10) {
      router.replace(`/video/${matches[0]}`);
    }
  }

  return (
    <header className="bg-[#242424] py-6 px-5">
      <nav className="center flex items-center text-sm font-medium uppercase tracking-wider text-stone-500">
        <div className="w-11/12 ">
          <button
            onClick={() => router.push("/")}
            className="ml-5 rounded-l-lg bg-slate-600 px-1 py-2 text-xl font-semibold text-purple-400"
          >
            PoginChat
          </button>
          <input
            className="rounded-r-lg-lg w-[70%] py-2 indent-2 text-xl"
            placeholder="Vod url / Id"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleUrl}
            className="ml-16 rounded-lg bg-slate-600 py-2 px-4 text-xl"
          >
            Search
          </button>
        </div>
        <ul className="ml-auto">
          <li>
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
