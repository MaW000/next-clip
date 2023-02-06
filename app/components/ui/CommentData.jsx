import React, { useState } from "react";

const CommentData = ({ data, className, player }) => {
  const [comments, setComments] = useState(null);
  const [selTime, setSelTime] = useState(null);
  console.log(comments);
  return (
    <div
      className={`relative my-5 flex h-[300px] w-[400px] flex-col rounded-md font-sans ${className}`}
    >
      <div className=" absolute top-0 w-full  border-b text-center text-xl  font-medium">
        TOP MOMENTS
      </div>
      {!selTime && (
        <div className="scrollbar mt-10 overflow-hidden overflow-y-scroll">
          <div className="flex flex-row justify-between px-5 ">
            <div className="text-start">
              {data &&
                Object.keys(data).map((time, i) => (
                  <button
                    className="text-blue-400 underline"
                    key={i}
                    onClick={() =>
                      player.seek(parseInt(data[time][0].contentOffsetSeconds))
                    }
                  >
                    {time}
                  </button>
                ))}
            </div>
            <div className="text-start">
              {data &&
                Object.keys(data).map((time, i) => {
                  // console.log(data[time]);
                  return (
                    <div className="flex gap-5" key={i}>
                      <button
                        className="whitespace-nowrap  text-xs"
                        onClick={() => {
                          setComments((prev) => (!prev ? data[time] : null));
                          setSelTime((prev) => (!prev ? time : null));
                        }}
                      >
                        Show Comments
                      </button>
                      {data[time].length}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {selTime && (
        <div className="scrollbar mt-10 w-full overflow-hidden overflow-y-scroll">
          <div className=" flex justify-between px-5">
            <div>
              <div>
                <button>{selTime}</button>
              </div>
            </div>
            <div className="flex gap-5">
              <button
                className="whitespace-nowrap  text-xs"
                onClick={() => {
                  setComments((prev) => (!prev ? data[time] : null));
                  setSelTime((prev) => (!prev ? time : null));
                }}
              >
                Show Comments
              </button>
              {data[selTime].length}
            </div>
          </div>
          <div className="scrollbar overflow-hidden overflow-y-scroll">
            {comments.map((comment, i) => {
              console.log(comment);
              return (
                <div key={i}>
                  <h1 className=" mt-2 overflow-hidden truncate bg-black">
                    {comment.msg}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentData;
