import { testimonials } from "@/constants";
import { TestimonialCardProps } from "@/types";
import Image from "next/image";

const TestimonialCard = ({value, rating, photo, name}: TestimonialCardProps) => {

    return (
      <>
        <div className="flex flex-col items-center justify-center gap-3 space-x-3 text-center shadow-lg text-slate-500 shadow-slate-200  bg-gray-200 rounded-xl md:w-[300px] lg:w-[345px] w-[300px] h-[275px]">
          <p className="w-56 h-[97px] text-black text-[10.5px] font-medium leading-relaxed tracking-wide text-justify mb-12">
            {value}
          </p>
          <div className="flex flex-col gap-3 w-[70%] items-start justify-start mt-3">
            <Image
              src={rating}
              alt="rating"
              width={63}
              height={9}
              className="object-contain"
            />
            <div className="flex flex-center gap-2">
              <Image
                src={photo}
                alt="photo"
                width={43}
                height={43}
                className="object-contain"
              />
              <p className="text-center text-black text-[10px] font-bold leading-none">
                {name}
              </p>
            </div>
          </div>
        </div>
      </>
    );
}
const Testimonials = () => {
  return (
    <section className="padding-x padding-y max-width">
      <div className="flex flex-col flex-center gap-3">
        <div className="flex items-center justify-center">
          <div className="w-[40px] md:w-[59.03px] -rotate-90 border-2 border-blue-300" />
          <span className="text-neutral-500 text-[25px] md:text-[35px] font-medium leading-10">
            Testimonials
          </span>
        </div>
        <div className="text-blue-900 text-[28px] md:text-[50px] font-medium leading-10 pt-4 md:py-5">
          What Our Users Say
          <br />
        </div>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-10 md:pt-14 justify-items-center">
         {
            testimonials.map((item)=>(
                <TestimonialCard
                key={item.name}
                value={item.value}
                rating={item.rating}
                photo={item.photo}
                name={item.name}
                />
            ))
         }
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
