import About from "@/components/About";
import Hero from "@/components/Hero";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="padding-x flex flex-col flex-center bg-gray-200">
        <h3 className=" text-center text-blue-900 text-[25px] font-medium leading-9 pb-4">
          Find a nearby hospital
        </h3>
        <div className="lg:w-[688px] w-3/4 h-16 rounded-[25px] pb-10">
          <SearchInput />
        </div>
      </div>
      <div id="#About" className="padding-x padding-y bg-white max-width">
        <About />
      </div>
    </main>
  );
}
