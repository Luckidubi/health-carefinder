import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const dataToExport = [];
    for (const library of data) {
      const jsonData = {
        Name: library.hospital_name,
        Address: library.hospital_address,
        Latitude: library.latitude,
        Longitude: library.longitude,
        City: library.city,
        Road: library.road,
        State: library.state,
        Country: library.country,
        Postcode: library.postcode,
      };

      dataToExport.push(jsonData);
    }
    console.log(dataToExport);
    return NextResponse.json(dataToExport);
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch library", { status: 500 });
  }
};
