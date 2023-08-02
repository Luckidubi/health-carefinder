"use client";
import { Download, Share2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useHospitalDetail } from "@/hooks";
import LoadingSpinner from "./LoadingSpinner";

import dynamic from "next/dynamic";
import { useToast } from "./ui/use-toast";
import { useSigninCheck } from "reactfire";
import { useState } from "react";
import { handleShare } from "@/lib/utils";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const ViewHospital = ({ id }: { id: string }) => {
  const { hospitalDetail, isLoading, isError } = useHospitalDetail(
    id as string
  );
  const [loading, setLoading] = useState(false);
  const { data: signinResult } = useSigninCheck();
  const user = signinResult?.user;
  const { toast } = useToast();

  if (
    hospitalDetail?.latitude === undefined ||
    hospitalDetail?.longitude === undefined
  ) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-center text-2xl">Error loading hospital</div>;
  }

  if (!hospitalDetail) {
    return <div className="text-center text-2xl">Hospital not found</div>;
  }

  const handleSaveToLibrary = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/library/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.uid,
          place_id: hospitalDetail.place_id,
          hospital_name: hospitalDetail.name,
          hospital_address: hospitalDetail.address,
          latitude: hospitalDetail.latitude,
          longitude: hospitalDetail.longitude,
          country: hospitalDetail.country,
          state: hospitalDetail.state,
          city: hospitalDetail.city,
          road: hospitalDetail.road,
          postcode: hospitalDetail.postalcode,
        }),
      });
      if (res.ok) {
        toast({
          title: "Saved to library",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to save to library",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8 xl:gap-20">
        <div className="max-w-[700px] max-h-[700px] flex-1 lg:flex-[1.5]">
          <Image
            src={hospitalDetail.photo || "/Rectangle 57.png"}
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
              {`${hospitalDetail.road || ""} ${hospitalDetail.city || ""}, ${
                hospitalDetail.state || ""
              }`}
            </div>
            <div className="view-hospital__card-div">
              Opening Hours: 24hours
            </div>
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
                onClick={handleSaveToLibrary}
                disabled={loading}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-blue-900 hover:text-white text-blue-900 bg-neutral-100 "
                onClick={() => handleShare(hospitalDetail.place_id)}
              >
                <Share2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* Map section */}
      <div id="map" className="w-full px-4 py-6 mt-6 h-[300px]">
        <Map
          lat={parseFloat(hospitalDetail.latitude)}
          lng={parseFloat(hospitalDetail.longitude)}
          name={hospitalDetail.name}
        />
      </div>
    </div>
  );
};

export default ViewHospital;
