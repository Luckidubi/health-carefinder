import { HospitalItemProps } from "@/lib/utils";
import { HospitalProps } from "@/models/Hospital";
import { useEffect, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";

const fetcher: Fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR(`/api/users/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useSearchHospitals(searchValue: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_LOCATION_SEARCH_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_API_KEY}&q=${searchValue}&tag=amenity:hospital&countrycodes=ng&dedupe=1`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      refreshInterval: 0,
    }
  );

  return {
    data,
    isLoading,
    error,
  };
}

const createHospital = async (extractedLocationData: HospitalItemProps[]) => {
  try {
    const res = await fetch(`/api/hospitals/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(extractedLocationData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error("error message", errorData.message);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("Error creating hospital:", error.message);
    throw error;
  }
};

export const useCreateHospital = () => {
  const { data, error, isValidating } = useSWR(null, createHospital, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onSuccess: () => {
      // Invalidate the SWR cache after a successful mutation
      mutate("/api/hospitals/new");
    },
  });

  const isLoading = isValidating;

  const addHospital = async (extractedLocationData: HospitalItemProps[]) => {
    try {
      await createHospital(extractedLocationData);
    } catch (error) {
      console.error("Error adding hospital:", error);
      throw error;
    }
  };

  return {
    addHospital,
    isLoading,
    error,
    data,
  };
};

export const useDebouncedValue = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};

async function fetchHospitalDetail(hospitalId: string): Promise<HospitalProps> {
  const response = await fetch(`/api/hospitals/${hospitalId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch hospital details");
  }

  const data = await response.json();
  return data;
}

export const useHospitalDetail = (id: string) => {
  const { data, error } = useSWR(id, fetchHospitalDetail);

  return {
    hospitalDetail: data,
    isLoading: !error && !data,
    isError: error,
  };
};
