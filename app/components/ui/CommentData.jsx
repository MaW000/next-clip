import React from 'react'


const CommentData = ({data}) => {
  
  return (
    <div className="flex flex-col bg-custom-midblack w-[350px] h-[300px] my-10 rounded-md font-sans">
    <div className="text-sm font-medium py-3 border-b border-b-custom-greyborder text-center">
      TOP MOMENTS
    </div>
    <div className="overflow-hidden overflow-y-scroll scrollbar">
      <div className="flex flex-row justify-between px-10">
        <div className="text-start">
          {data &&
            Object.keys(data).map((time, i) => (
              <div className="" key={i}>
                {time}
              </div>
            ))}
        </div>
        <div className="text-start">
        {data &&
            Object.keys(data).map((time, i) => { 
              
              return (
              <div className="" key={i}>
                {data[time].length}
              </div>
            )})}
        </div>
      </div>
    </div>
  </div>
  )
}

export default CommentData