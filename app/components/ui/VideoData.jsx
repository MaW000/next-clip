import VodInputs from "@/app/components/form/VodInputs";
import CommentData from "@/app/components/ui/CommentData";
import React from "react";
import { useEffect, useState } from "react";
const VideoData = ({ videoId, className }) => {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  //tells the server to download and save comments to db
  useEffect(() => {
    const endpoint = `/api/video/${videoId}`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then((res) => {
    
        setStatus(res.status);
      });
  }, [videoId]);
  //sends the paramaters your filtering for and returns filterd data
  function handleData(data) {
    fetch(`/api/video/comments/${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((res) => {
  
        const { data } = res;
        setData(data);
      });
  }

  return (
    <div className={className}>
      {status === 'saved' ? (
        <VodInputs status={status} handleData={handleData} />
      ) : (
        <h1 className="mx-10 text-xl font-semibold text-slate-900 my-5">Fetching comments this will take a while refresh in a few minutes...</h1>
      )} 
      {data && <CommentData data={data} />}
    </div>
  );
};

export default VideoData;
