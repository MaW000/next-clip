import React from "react";

const CommentData = ({ data, className, player }) => {
  
  return (
    <div
      className={`my-5 flex h-[300px] w-[350px] flex-col rounded-md font-sans ${className}`}
    >
      <div className=" w-full border-b   text-center text-xl  font-medium">
        TOP MOMENTS
      </div>
      <div className="scrollbar mt-1 overflow-hidden overflow-y-scroll">
        <div className="flex flex-row justify-between px-10">
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
                return (
                  <div className="" key={i}>
                    {data[time].length}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentData;
