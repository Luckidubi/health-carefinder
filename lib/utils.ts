import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface HospitalItemProps {
  display_name: string;

  address: {
    name: string;
    road: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };

  lat: string;
  lon: string;
  place_id: string;
  osm_id: string;
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFallbackLetter = (username: string) => {
  if (!username) {
    return "";
  }

  // Extract the first character from the username
  const firstLetter = username.charAt(0).toUpperCase();

  // Check if the first character is a letter
  if (firstLetter.match(/[A-Za-z]/)) {
    return firstLetter;
  }

  return "";
};

export function extractLocationData(data: any): HospitalItemProps[] {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data.map((item: HospitalItemProps) => {
    const { address, lat, lon, display_name, place_id, osm_id } = item;

    return {
      display_name,
      address,

      lat,
      lon,
      place_id,
      osm_id,
    };
  });
}
export async function fetchHospitals(
  latitude: number,
  longitude: number,
  limit: number
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LOCATION_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_API_KEY}&lat=${latitude}&lon=${longitude}&tag=amenity:hospital&radius=30000&limit=${limit}&format=json`
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
}
