import { Download,  Share2Icon,  } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const ViewHospital = () => {
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
        <div className="overflow-hidden shadow-md rounded-xl bg-zinc-200 flex flex-col gap-6 flex-center py-4">
          <div className="view-hospital__card-div">Eve Foundation Hospital</div>
          <div className="view-hospital__card-div">
            32, Admiralty way, lekki phase1
          </div>
          <div className="view-hospital__card-div">
            Evefoundation1@gmail.com
          </div>
          <div className="view-hospital__card-div">Opening Hours: 24hours</div>
          <div className="view-hospital__card-div">+23490378427843</div>
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
        <div>

        </div>
      </div>
    </div>
  );
};

export default ViewHospital;
