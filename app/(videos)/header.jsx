"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "../components/auth/SignInButton";
import Link from "next/link";
import useWindowDimensions from "@/app/components/hooks/WindowSize";
const Header = () => {
  const { width, height } = useWindowDimensions();
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const w = Math.floor(width / 1.44269) + "px";
  function handleUrl(input) {
    var matches = url.match(/\d+/g);
    if (matches === null) {
      setError("Please enter a valid VideoID");
    } else if (matches[0].length === 10) {
      router.replace(`/video/${matches[0]}`);
    }
  }
  console.log(w);
  return (
    <header className="bg-[#242424] py-6 ">
      <nav className="center flex items-center text-sm font-medium uppercase tracking-wider text-stone-500">
        {width && (
          <div className={`ml-10 w-[69.4%]`}>
            <Link
              href="/"
              className=" inline-block rounded-l-lg bg-slate-600  px-1 py-2 text-xl font-semibold text-purple-400 underline underline-offset-8"
            >
              PoginChat
            </Link>
            <input
              className="w-[80%] rounded-r-lg py-2 indent-2 text-xl"
              placeholder="Vod url / Id"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={handleUrl}
              className="float-right rounded-lg bg-slate-600 py-2 px-4 text-xl"
            >
              Search
            </button>
          </div>
        )}
        <ul className="ml-auto">
          <li className="mr-10">
            <LoginButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
