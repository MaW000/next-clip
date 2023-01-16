import React from "react";

const TitleDescription = () => {
  return (
    <div className="flex select-none flex-col space-y-5">
      <h1
        // onClick={clickLogo}
        className="text-8xl font-semibold text-purple-400 hover:cursor-pointer"
      >
        PogInChat
      </h1>
      <p className="font-medium text-white">
        Upload a URL from a twitch vod and find your most hype moments.
      </p>
    </div>
  );
};

export default TitleDescription;
