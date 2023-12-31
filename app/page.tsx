import About from "@/components/About";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SearchInput from "@/components/SearchInput";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <div
        id="discover"
         className="padding-x flex flex-col flex-center py-10 bg-gray-200"
      >
        <h3 className=" text-center text-blue-900 text-[25px] font-medium leading-9 pb-4">
          Find a nearby hospital
        </h3>
        <div className="lg:w-[688px] w-3/4 h-16 rounded-[25px]">
          <SearchInput />
        </div>
      </div>
      <div id="about" className="padding-x padding-y bg-white max-width">
        <About />
      </div>
      <div id="services" className="pt-20">
        <Services />
      </div>
      <HowItWorks />
      <div className="py-20">
        <Testimonials />
      </div>
    </main>
  );
}
