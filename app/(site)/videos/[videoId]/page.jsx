"use client";
import VideoDash from '@/app/components/comp/VideoDash';

const page = ({ params }) => {

  return (
    <>
      <VideoDash params={params}/>
    </>
  );
};

export default page;
