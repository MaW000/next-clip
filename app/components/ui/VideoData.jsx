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
        // console.log(res);
      });
  }
  function forceDelete() {
    fetch(`/api/video/${videoId}/delete`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        console.log(res);
        router.push("/");
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
        </div>
      )}
      {data && (
        <div className="row-start-3 m-12 flex  justify-center rounded-lg bg-slate-800">
          {data && (
            <CommentData
              data={data}
              player={player}
              className={"items-center justify-center text-center align-middle"}
            />
          )}
        </div>
      )}
      <button
        onClick={() => {
          forceDelete();
        }}
        className="absolute bottom-0 left-0 right-0 row-start-6 mx-auto  my-5 w-56  justify-center rounded-md bg-slate-600 py-2  text-center  text-2xl font-semibold text-slate-400"
      >
        Delete Comments
      </button>
    </div>
  );
};

export default VideoData;
