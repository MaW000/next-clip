import React, { useState } from "react";
import SearchVod from "@/app/components/ui/SearchVod";
import VideoPlayer from "@/app/components/ui/VideoPlayer";
import VideoData from "@/app/components/ui/VideoData";
import useWindowDimensions from "../hooks/WindowSize";


const VideoDash = ({ params }) => {
   
    const {width, height } = useWindowDimensions()
  const options = {
    width: width / 1.44269,
    height: height / 1.14269,
    video: params.videoId,
    time: "0h0m1s",
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-1 col-end-3 row-span-full ml-5">
        <SearchVod />
      </div>

      <div className="col-start-2 col-end-10 row-span-full">
        {width && <VideoPlayer videoId={params.videoId} options={options} />}
      </div>
      <div className="col-start-10 col-end-12 row-span-full ml-20 w-[350px] rounded-md bg-slate-700">
        <VideoData videoId={params.videoId} className="" />
      </div>
    </div>
  );
};

export default VideoDash;
