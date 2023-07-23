"use client";
import HospitalCard from "@/components/HospitalCard";
import SearchInput from "@/components/SearchInput";
import ShowMore from "@/components/ShowMore";
import StateComboBox from "@/components/StateComboBox";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";

import {
  HospitalItemProps,
  exportToCSV,
  extractLocationData,
  fetchHospitals,
} from "@/lib/utils";
import { HospitalProps } from "@/models/Hospital";
import { LucideFileDown } from "lucide-react";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
const Page = () => {
  const [allHospitals, setAllHospitals] = useState<HospitalProps[]>([]);
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [selectedState, setSelectedState] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [extractedLocationData, setExtractedLocationData] = useState<
    HospitalItemProps[]
  >([]);
  const [limit, setLimit] = useState<number>(10);
  const { toast } = useToast();

  const getHospitals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchHospitals(
        latitude as number,
        longitude as number,
        limit as number
      );
      setAllHospitals(data);
      setExtractedLocationData(extractLocationData(data));
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, limit]);

  const saveHospital = useCallback(async () => {
    try {
      const res = await fetch(`/api/hospitals/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(extractedLocationData),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, [extractedLocationData]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      const successCallback = ({ coords }: GeolocationPosition) => {
        const { latitude, longitude } = coords;
        setLatitude(latitude);
        setLongitude(longitude);
      };

      const errorCallback = (error: GeolocationPositionError) => {
        console.error(error.message);
      };

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      throw new Error("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    const fetchHospitalData = async () => {
      if (latitude !== undefined && longitude !== undefined) {
        await getHospitals();
      }
    };

    fetchHospitalData();
  }, [latitude, longitude, getHospitals, limit]);

  useEffect(() => {
    const saveHospitalData = async () => {
      if (extractedLocationData.length > 0) {
        await saveHospital();
      }
    };
    saveHospitalData();
  }, [extractedLocationData, saveHospital]);

  const handleExport = async (extractedLocationData: HospitalItemProps[]) => {
    try {
      const res = await fetch(`/api/hospitals/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(extractedLocationData),
      });
      console.log(res);
      if (res.ok) {
        const csvData = await res.text();
        console.log("csv", csvData);
        exportToCSV(csvData);
      }
    } catch (error) {
      toast({
        title: "Failed to export",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  console.log(allHospitals);
  console.log(latitude, longitude);
  console.log(extractedLocationData);

  return (
    <>
      <div className="padding-x pt-6 w-full flex flex-col min-h-screen h-full">
        <div className="w-full flex-between items-center flex-wrap gap-5 pb-12">
          <div className=" min-w-[280px] w-[50%] max-w-[664px] flex flex-col">
            <h2 className="input-header">Find by address or name</h2>
            <SearchInput />
          </div>
          <div className="flex flex-col flex-center">
            <h2 className="input-header">Find by Nearby State</h2>

            <StateComboBox
              onSelect={(
                selectedLatitude,
                selectedLongitude,
                selectedState
              ) => {
                setLatitude(selectedLatitude);
                setLongitude(selectedLongitude);
                setSelectedState(selectedState);
              }}
            />
          </div>
        </div>
        {extractedLocationData.length > 0 ? (
          <div>
            <div className="flex-between">
              <h4 className="pl-12 text-black text-[20px] sm:text-[30px] font-medium leading-10">
                Hospitals Nearby {selectedState}
              </h4>
              <Button
                title="Download Hospitals as CSV file"
                onClick={() => handleExport(extractedLocationData)}
                className="bg-gray-200 text-black hover:bg-gray-900 hover:text-white"
              >
                Export <LucideFileDown />
              </Button>
            </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  w-full gap-6 pt-6 mb-6">
              {extractedLocationData.map((item) => (
                <HospitalCard
                  key={item.osm_id}
                  id={item.place_id}
                  photo="/placeholder.png"
                  name={item.address.name}
                  address={item.address.road}
                />
              ))}
            </div>
            {loading && (
              <div className="mt-16 flex-center w-full">
                <Image
                  src="/my-loader (1).svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > extractedLocationData.length}
              setLimit={setLimit}
            />
          </div>
        ) : (
          <div>
            <h4 className="pl-12 text-black text-[20px] sm:text-[30px] font-medium leading-10">
              No Hospitals Nearby
            </h4>
          </div>
        )}
        {error && <div className="mt-16 flex-center w-full">{error}</div>}
      </div>
    </>
  );
};

export default Page;
