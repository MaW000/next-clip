"use client";
import VideoPlayer from "@/app/components/ui/VideoPlayer";
import VideoData from "./VideoData";

const page = ({ params }) => {
  
  return (
    <main className="flex justify-center">
      <VideoPlayer videoId={params.videoId} />
      <VideoData videoId={params.videoId}/>
    </main>
  );
};

export default page;