import React, { useState } from "react";
import CommentList from "./CommentList";

const CommentCard = ({ data, className, player, card, handleClick }) => {
  const [toggle, setToggle] = useState(true);
  const a = [...card.Result].sort((a, b) => (a.count > b.count ? -1 : 1));

  return (
    <div className="mx-2 mt-5 flex flex-col   rounded-lg bg-slate-600">
      <div className="flex gap-2 rounded-t-lg bg-slate-600 p-5">
        <div className="card">
          <h1
            className={`card-head ${
              card.keyword.length > 3 ? "-ml-3 text-xl font-bold" : "text-3xl"
            }`}
          >
            {card.keyword}
          </h1>
          <h1 className="card-sub ">Keyword</h1>
        </div>
        <div className="card">
          <h1 className="card-head">{card.average}</h1>
          <h1 className="card-sub ">Average</h1>
        </div>
        <div className="card">
          <h1 className="card-head">{card.max}</h1>
          <h1 className="card-sub">Max</h1>
        </div>
        <div className="card ">
          <h1 className={`card-head ${card.length > 9 ? "-ml-2" : "ml-0"}`}>
            {card.length}s
          </h1>
          <h1 className="card-sub">Length</h1>
        </div>
        <button
          onClick={() => handleClick()}
          className="ml-auto  rounded-xl bg-slate-900 p-2 font-sans font-bold text-fuchsia-300  "
        >
          Hide Clips
        </button>
      </div>
      <div className="flex justify-around">
        <button
          className="rounded-md bg-slate-900 p-1"
          onClick={() => setToggle(false)}
        >
          Sort by count
        </button>
        <button
          onClick={() => setToggle(true)}
          className="rounded-md bg-slate-900 p-1"
        >
          Sort by time
        </button>
      </div>
      <div className="scrollbar mt-4 max-h-96 overflow-hidden overflow-y-scroll  rounded-b-lg bg-slate-600">
        {toggle ? (
          <CommentList data={card.Result} player={player} />
        ) : (
          <CommentList data={a} player={player} />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
