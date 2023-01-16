"use client";
import React from "react";
import Link from "next/link";
import Button from "./button";
import TextField from "../form/TextField";
const SearchVod = () => {
  return (
    <div className="mt-10 flex h-[46px] w-[10%] lg:w-[30%] flex-row space-x-5">
      <TextField
        className="flex w-[60%] flex-col text-start"
        id="url"
        name="url"
        type="url"
        label="TWITCH VOD URL"
        placeholder="https://www.twitch.tv/videos/xxxxxxx"
      />
      <div className="flex flex-row gap-3">
        <TextField
          className="flex w-[35%] flex-col text-start"
          id="start"
          name="start"
          type="text"
          label="START TIME"
          placeholder="https://www.twitch.tv/videos/xxxxxxx"
        />
        <div className="mt-4">:</div>
        <TextField
          className="flex w-[35%] flex-col text-start"
          id="end"
          name="end"
          type="text"
          label="END TIME"
          placeholder="https://www.twitch.tv/videos/xxxxxxx"
        />
  
        <Button className="mt-3 ml-3 px-2" variant="solid" color="purple" href={`/videos/1`}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SearchVod;
