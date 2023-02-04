"use client";
import React, { useEffect, useRef, useState } from "react";

import VideoData from "@/app/components/ui/VideoData";
import VideoScript from "@/app/components/comp/VideoScript";
import Script from "next/script";

const page = ({ params }) => {
  return (
    <div className="">
      <VideoScript videoId={params.videoId} />
    </div>
  );
};

export default page;
