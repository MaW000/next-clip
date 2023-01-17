"use client";
import Script from "next/script";

const VideoPlayer = ({ videoId }) => {
  var options = {
    width: 1330,
    height: 748,
    video: videoId,
    time: '0h0m1s'
  };
  return (
    <>
      <Script
        type="text/javascript"
        src="https://player.twitch.tv/js/embed/v1.js"
        onLoad={() => {
          var player = new Twitch.Player("player", options);
          player.setVolume(0.5);
        }}
      />
      <div id="player"></div>
    </>
  );
};

export default VideoPlayer;
