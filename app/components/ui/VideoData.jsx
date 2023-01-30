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
        console.log(res)
        setStatus(res.status);
      });
  }, [videoId]);
  //sends the paramaters your filtering for and returns filterd data
  function handleData(data) {
    const dat = {
      keyword: 'lol',
      num: 2,
  }
    fetch(`/api/video/comments/${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        const { data } = res;
        setData(data);
      });
  }
  console.log
  return (
    <div className={className}>
      {status ? (
        <VodInputs status={status} handleData={handleData} />
      ) : (
        <h1>Fetching comments...</h1>
      )}
      {data && <CommentData data={data} />}
    </div>
  );
};

export default VideoData;
