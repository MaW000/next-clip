"use client";
import Script from "next/script";
import useWindowDimensions from "@/app/components/hooks/WindowSize";
const VideoPlayer = (params) => {
  const { width, height } = useWindowDimensions();
  const options = {
    width: width / 1.44269,
    height: height / 1.14269,
    video: params.videoId,
    time: "0h0m1s",
  };
  function seek(){

  }
 
  return (
    <>
      {width && (
        <div className={params.className}>
           <Script
            type="text/javascript"
            src="https://player.twitch.tv/js/embed/v1.js"
            onLoad={() => {
              let player = new Twitch.Player("player", options);
              player.setVolume(0.5);
            }}
            
      />
     
          <div id="player" className="rounded-lg"></div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
