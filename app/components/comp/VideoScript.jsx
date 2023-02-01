"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import VideoData from "@/app/components/ui/VideoData";
import useWindowDimensions from "@/app/components/hooks/WindowSize";
const VideoScript = (params) => {
  const { width, height } = useWindowDimensions();
  const [player, setPlayer] = useState();
  const options = {
    width: width / 1.44269,
    height: height / 1.14269,
    video: params.videoId,
    time: "0h0m1s",
  };

  return (
    <div className="grid grid-cols-12">
      {width && (
        <Script
          type="text/javascript"
          src="https://player.twitch.tv/js/embed/v1.js"
          onLoad={() => {
            let player = new Twitch.Player("player", options);
            setPlayer(player);
          }}
        />
      )}
      <div id="player" className="ml-10 rounded-lg"></div>
      <VideoData
        player={player}
        videoId={params.videoId}
        className="col-start-10 col-end-13 row-span-full ml-[-2.5rem] mr-10 rounded-lg bg-slate-700"
      />
    </div>
  );
};

export default VideoScript;
