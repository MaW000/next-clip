import React from "react";
import { useEffect, useState } from "react";
const VideoData = ({ videoId }) => {
  const [status, setStatus] = useState();
  useEffect(() => {
    const endpoint = `/api/video/${videoId}`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status);
        setStatus(res.status);
      });
  }, [videoId]);

  return <div>{status}</div>;
};

export default VideoData;
