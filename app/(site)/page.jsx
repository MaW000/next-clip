"use client";
import SearchVod from "../components/ui/SearchVod";
import TitleDescription from "../components/ui/TitleDescription";
import VodThumbnails from '@/app/components/ui/VodThumbnails'
export default function Home() {
  return (
    <section className={`items-centerfont-sans flex flex-col`}>
      <TitleDescription />
      <VodThumbnails />
      <SearchVod variant="col" variantStyle="col" className={"relative"} />
    </section>
  );
}
