"use client";
import { Download, Share2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useHospitalDetail } from "@/hooks";
import LoadingSpinner from "./LoadingSpinner";

import { useRouter } from "next/navigation";

const ViewHospital = ({ id }: { id: string }) => {
  const router = useRouter();

  const { hospitalDetail, isLoading, isError } = useHospitalDetail(
    id as string
  );

  useEffect(() => {
    if (isError) {
      console.log(isError);
      <div className="text-center text-2xl">Hospital not found</div>;
      router.back();
    }
  }, [isError, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!hospitalDetail) {
    return <div className="text-center text-2xl">Hospital not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 xl:gap-20">
      <div className="max-w-[700px] max-h-[700px] flex-1 lg:flex-[1.5]">
        <Image
          src="/Rectangle 57.png"
          alt="hospital image"
          width={318}
          height={401}
          className="object-contain rounded-xl lg:w-[500px] lg:h-[400px]"
        />
      </div>
      <div className=" flex flex-col flex-1 min-w-[280px] max-w-[479px] w-[auto] h-[514px]">
        <div className="overflow-hidden border-none px-3  shadow-md rounded-xl bg-zinc-200 flex flex-col gap-6 flex-center py-6">
          <div className="view-hospital__card-div">{hospitalDetail.name}</div>
          <div className="view-hospital__card-div">
            {`${hospitalDetail.road}, ${hospitalDetail.city}, ${hospitalDetail.state}`}
          </div>
          <div className="view-hospital__card-div">Opening Hours: 24hours</div>
          <div className="view-hospital__card-div">
            Postcode: {hospitalDetail.postalcode}
          </div>
          <div className="view-hospital__card-div">
            {" "}
            Country : {hospitalDetail.country}
          </div>
          <div className="flex flex-between gap-10">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-blue-900 hover:text-white text-blue-900 bg-neutral-100 "
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-blue-900 hover:text-white text-blue-900 bg-neutral-100 "
            >
              <Share2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ViewHospital;
