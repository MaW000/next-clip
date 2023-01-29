"use client";
import React from "react";
import Script from "next/script";
import SearchVod from "@/app/components/ui/SearchVod";
import VideoPlayer from "@/app/components/ui/VideoPlayer";
import VideoData from "@/app/components/ui/VideoData";

const page = ({ params }) => {
  const options = {
    width: 1500 / 1.44269,
    height: 800 / 1.14269,
    video: params.videoId,
    time: "0h0m1s",
  };
  
  return (
    <div className="grid grid-cols-12">
      


      <div className="col-start-1 col-end-10 row-span-full rounded-lg">
        <VideoPlayer videoId={params.videoId} className='ml-10 rounded-lg'/>
      </div>
    {/*  ml-[-2.5rem] w-[480px] rounded-md bg-slate-700 */}
      <div className="col-start-10 col-end-13 row-span-full bg-slate-700 ml-[-2.5rem] mr-10 rounded-lg">
        <VideoData videoId={params.videoId} className="" />
      </div>
    </div>
  );
};

export default page;
