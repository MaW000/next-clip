import React, { useState } from "react";

const CommentList = ({ data, player }) => {
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(true);

  return data.map((clip, i) => {
    return (
      <div key={i} className="">
        <div className="mx-10 my-5 flex justify-between">
          <button
            className="text-sm text-blue-400 underline"
            onClick={() =>
              player.seek(parseInt(clip.msgs[0].contentOffsetSeconds))
            }
          >
            {clip.timeStamp}
          </button>
          <button
            onClick={() => {
              if (!comments.includes(i)) {
                setComments((prev) => [...prev, i]);
              } else {
                setComments(comments.filter((index) => i !== index));
              }
            }}
            className=" min-w-[8rem]  whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1"
          >
            <h1 className="mx-1 inline-block text-xs text-fuchsia-300 ">
              Show Comments
            </h1>
            <h1 className="mx-1 inline-block text-purple-500">{clip.count}</h1>
          </button>
        </div>
        {comments.includes(i) && (
          <div className="scrollbar mx-16 max-h-32 overflow-hidden overflow-y-scroll bg-slate-700 p-2">
            {data[i].msgs.map((comment, i) => {
              return (
                <div
                  key={i}
                  className=" border-t-2 border-gray-900 last:border-b-2"
                >
                  <h1 className=" my-1 ml-2 overflow-hidden truncate text-xs font-light text-gray-200">
                    {comment.msg}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  });
};

export default CommentList;
