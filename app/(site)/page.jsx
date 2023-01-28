'use client'
import SearchVod from "../components/ui/SearchVod";
import TitleDescription from "../components/ui/TitleDescription";

export default function Home() {

  return (
    <section
      className={`items-centerfont-sans flex flex-col`}
    >
      <TitleDescription />
      <SearchVod variant='col' variantStyle='col' className={'relative'} />
    </section>
  );
}
