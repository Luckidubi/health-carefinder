import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const dataToExport = [];
  for (const hospital of data) {
    const jsonData = {
      Name: hospital.address.name,
      Address: hospital.display_name,
      Latitude: hospital.lat,
      Longitude: hospital.lon,
      Country: hospital.address.country,
      State: hospital.address.state,
      City: hospital.address.city,
      Road: hospital.address.road,
      Postcode: hospital.address.postcode,
    };
    dataToExport.push(jsonData);
  }
  console.log(dataToExport);
  return NextResponse.json(dataToExport);
};
