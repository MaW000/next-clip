import React from "react";

const CommentData = ({ data, className, player }) => {
  function handleSeek(second) {
    console.log(second);
    player.seek(parseInt(second));
  }
  return (
    <div
      className={`bg-custom-midblack my-10 flex h-[300px] w-[350px] flex-col rounded-md font-sans ${className}`}
    >
      <div className="border-b-custom-greyborder border-b py-3 text-center text-sm font-medium">
        TOP MOMENTS
      </div>
      <div className="scrollbar overflow-hidden overflow-y-scroll">
        <div className="flex flex-row justify-between px-10">
          <div className="text-start">
            {data &&
              Object.keys(data).map((time, i) => (
                <button
                  className=""
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
