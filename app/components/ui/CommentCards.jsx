import React, { useState } from "react";

const CommentData = ({ data, className, player, handleClick }) => {
  const [comments, setComments] = useState(null);
  const [selTime, setSelTime] = useState(null);

  return (
    <div className="mx-2 mt-5 flex flex-col gap-2">
      {data &&
        data.map((card) => {
          return (
            <div
              key={card.id}
              className="flex gap-2 rounded-lg bg-slate-600 p-5"
            >
              <div className="card">
                <h1
                  className={`card-head ${
                    card.keyword.length > 3
                      ? "-ml-3 text-xl font-bold"
                      : "text-3xl"
                  }`}
                >
                  {card.keyword}
                </h1>
                <h1 className={`card-sub `}>Keyword</h1>
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
                <h1
                  className={`card-head ${card.length > 9 ? "-ml-2" : "ml-0"}`}
                >
                  {card.length}s
                </h1>
                <h1 className="card-sub">Length</h1>
              </div>
              <button
                onClick={() => handleClick(card)}
                className="ml-auto  rounded-xl bg-slate-900 p-4 font-sans font-bold text-fuchsia-300  "
              >
                Next.Clip
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default CommentData;
