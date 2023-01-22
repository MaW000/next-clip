import VodInputs from "@/app/components/form/VodInputs";
import CommentData from "@/app/components/ui/CommentData";
import React from "react";
import { useEffect, useState } from "react";
const VideoData = ({ videoId, className }) => {
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
  function handleData(data) {
    fetch(`/api/video/comments/${videoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <div className={className}>
      {status === "saved" ? (
        <VodInputs status={status} handleData={handleData} />
      ) : (
        <h1>Fetching comments...</h1>
      )}
      <CommentData id={videoId} />
    </div>
  );
};

export default VideoData;
