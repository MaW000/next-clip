"use client";
import React from "react";
import Button from "./button";
import TextField from "../form/TextField";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const baseStyles = {
  col: "mt-20 flex  flex-col justify-center lg:space-x-5 ml-5 md:ml-7 lg:ml-0 lg:flex-row",
  row: "mt-10 flex h-[46px] flex-row justify-center w-[1900px] space-x-5",
};
const variantStyles = {
  col: "flex flex-row gap-3 mt-2 lg:mt-0",
  row: "flex flex-row gap-3",
};
const SearchVod = ({ className, variant, variantStyle, ...props }) => {
  className = clsx(baseStyles[variant], className);
  const miniClass = clsx(variantStyles[variantStyle]);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  function handleUrl() {
    var matches = url.match(/\d+/g);
    console.log(matches)
    if (matches === null) {
      setError("Please enter a valid VideoID");
    }
    console.log(matches)
    if(matches[0].length === 10) {
      router.push(`/videos/${matches[0]}`)
    }
  }
  console.log(router)
  return (
    <div className={className} {...props}>
      <TextField
        className={`flex w-[90%] flex-col text-start lg:w-[40%] ${error && 'border-b-amber-600 border-b-2'}`}
        id="url"
        name="url"
        type="url"
        label="TWITCH VOD URL"
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.twitch.tv/videos/xxxxxxx"
      />
      {error && (
        <div className="text-amber-600 text-lg font-thin font-sans
         absolute bottom-[-2rem] left-[32rem]">
          {error}
       
        </div>
      )}
      <div className={miniClass}>
        {/* <Link href={`/videos/${url}`}> */}
        <Button
          className="mt-3 "
          variant="solid"
          color="purple"
          onClick={handleUrl}
        >
          Submit
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SearchVod;
