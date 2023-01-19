"use client";
import Script from "next/script";
import {useState} from 'react'
const VideoPlayer = ({ options }) => {

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
