import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const VodThumbnails = ({}) => {
  const [videos, setVideos] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const endpoint = `/api/video/data`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setVideos(res.data);
      });
  }, []);

  return (
    <div
      className={`mx-auto mt-10 flex gap-4 rounded-lg bg-slate-500 p-5 ${
        videos.length > 1 ? "" : "hidden"
      }`}
    >
      {videos.length > 1 &&
        videos.map((video, i) => {
          console.log(video);
          return (
            <div
              key={i}
              className={
                "relative w-36 cursor-pointer rounded-md border-4 border-slate-900 bg-slate-700 p-2 drop-shadow-lg"
              }
              onClick={() => router.push(`/video/${video.videoId}`)}
            >
              <div className={"relative"}>
                <Image
                  src={video.thumbnail}
                  height="90"
                  width={"160"}
                  alt="thumbnail"
                />
                <h1 className="absolute top-0 right-0 rounded-bl-md bg-black px-2 text-center font-mono text-xs font-semibold leading-4 text-white">
                  {video.views}
                </h1>
                <h1 className="absolute bottom-0 right-0 rounded-tl-md bg-black px-2 text-center font-sans text-xs font-semibold leading-4 text-white">
                  {video.streamer}
                </h1>
              </div>
              <h1 className="truncate pt-1 text-xs font-extrabold text-gray-400">
                {video.title}
              </h1>
            </div>
          );
        })}
    </div>
  );
};

export default VodThumbnails;
