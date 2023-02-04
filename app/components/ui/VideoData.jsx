import VodInputs from "@/app/components/form/VodInputs";
import CommentData from "@/app/components/ui/CommentData";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VideoData = ({ videoId, className, player }) => {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  const router = useRouter();
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
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        setData(data);
      });
  }
  function forceFetch() {
    fetch(`/api/video/${videoId}/force`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div className={className}>
      {status === "saved" && (
        <VodInputs status={status} handleData={handleData} />
      )}

      {status === "saving" && (
        <div>
          <h1 className="mx-10 my-5 text-xl font-semibold text-slate-900">
            Fetching comments this will take a while refresh in a few minutes...
          </h1>
        </div>
      )}

      {status === "fetching" && (
        <div className="my-2 mx-5 rounded-lg bg-slate-600 py-2">
          <div className=" mx-10 rounded-2xl bg-slate-900">
            <h1 className="mx-10 my-5 py-2 text-xl font-semibold text-slate-600">
              Fetching comments this will take a while...
            </h1>
          </div>

          <button
            onClick={() => {
              console.log("1");
              router.reload();
            }}
            className="mx-10 my-5 text-center text-2xl font-semibold text-slate-900"
          >
            Refresh the page if your video did not start playing
          </button>
        </div>
      )}
      <div className="m-12 flex justify-center rounded-lg bg-slate-800">
        {data && (
          <CommentData
            data={data}
            player={player}
            className={"items-center justify-center text-center align-middle"}
          />
        )}
      </div>
    </div>
  );
};

export default VideoData;
