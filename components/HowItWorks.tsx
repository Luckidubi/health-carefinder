import { guides } from "@/constants";
import { ServiceCardProps } from "@/types";
import Image from "next/image";

interface GuideProps{
  guide: ServiceCardProps
}
const Card = ({guide}: GuideProps) =>{

  const {icon, title, value} = guide

  return (
    <>
      <div className="flex flex-col flex-center w-1/4 gap-2 item pb-2">
        <figure>
          <Image src={icon} width={120} height={120} alt="doctor" />
        </figure>
        <h4 className="w-[205px] h-[25px] text-center text-black text-[15px] font-bold leading-snug">
         {title}
        </h4>
        <p className="w-[143px] h-[73px] text-center text-black text-[12px] font-medium leading-none">
          {value}
        </p>
      </div>
    </>
  );
}

const HowItWorks = () => {
  return (
    <section className="padding-x padding-y max-width">
      <div className="bg-guide-bg bg-fixed bg-no-repeat bg-cover h-[screen] flex flex-col flex-center gap-12 pt-20 relative">
        <h3 className="text-blue-900 md:text-[40px] text-[30px]  font-bold leading-10">
          How It Works
        </h3>
        <div className="flex flex-col flex-wrap md:flex-row gap-4 flex-center zigzag">
          {guides.map((guide) => (
            <Card key={guide.title} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks