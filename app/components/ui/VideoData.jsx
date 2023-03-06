import VodInputs from "@/app/components/form/VodInputs";
import CommentData from "@/app/components/ui/CommentData";
import CommentCards from "@/app/components/ui/CommentCards";
import CommentCard from "./CommentCard";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VideoData = ({ videoId, className, player }) => {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [cards, setCards] = useState(null);
  const [card, setCard] = useState(null);
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
    const endpointa = `/api/results/${videoId}`;
    fetch(endpointa, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setCards(res.data);
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
        const { data, error } = res;
        if (data) {
          setCards((prev) => [...prev, data]);
        } else if (error) {
          console.log(`error ${error}`);
        }
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
      .then((res) => {});
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
        router.push("/");
      });
  }

  function handleClick(cardData) {
    setToggle(!toggle);

    if (card === null) {
      setCard(cardData);
    } else {
      setCard(null);
    }
  }

  return (
    <div
      className={
        "relative col-start-10 col-end-13 row-span-full  ml-[-2.5rem] mr-10  rounded-lg bg-slate-700"
      }
    >
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

      {cards && !toggle && (
        <CommentCards data={cards} handleClick={handleClick} />
      )}
      {card && toggle && (
        <CommentCard card={card} player={player} handleClick={handleClick} />
      )}
      {/* <button
        onClick={() => {
          forceDelete();
        }}
        className="absolute bottom-0 left-0 right-0 row-start-6 mx-auto  my-5 w-56  justify-center rounded-md bg-slate-600 py-2  text-center  text-2xl font-semibold text-slate-400"
      >
        Delete Comments
      </button> */}
    </div>
  );
};

export default VideoData;
