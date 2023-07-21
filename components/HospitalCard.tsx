import { HospitalCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const HospitalCard = ({ photo, address, name, id }: HospitalCardProps) => {
  return (
    <>
      <div className="overflow-hidden rounded-xl bg-white text-slate-500  shadow-slate-200">
        <figure>
          <Image
            src={photo}
            alt="card image"
            width={223}
            height={201}
            className="w-full object-contain rounded-xl"
             



          />
        </figure>

        <div className="p-6 text-center min-w-[170px] min-h-[118px] h-auto max-h-48 max-w-sm w-auto">
          <header className="mb-2">
            <h3 className="text-black text-[15px] font-medium leading-snug">
              {name}
            </h3>
            <p className="text-sm text-slate-400"> {address}</p>
          </header>
          <span className="text-blue-900 text-[14px] font-semibold leading-none hover:cursor-pointer">
            <Link href={`/find-hospital/${id}`}> See more </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default HospitalCard;
