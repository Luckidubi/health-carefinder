import dbConnect from "@/lib/dbConnect";
import Hospital from "@/models/Hospital";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  const data = await req.json();
  await dbConnect();
  try {
    // Check if the hospital already exists
    const savedHospitals = [];

    for (const hospital of data) {
      const existingHospital = await Hospital.findOne({
        $or: [
          { address: hospital.display_name },
          { place_id: hospital.place_id },
        ],
      });

      if (!existingHospital) {
        const savedHospital = await Hospital.create({
          name: hospital.name,
          address: hospital.display_name,
          latitude: hospital.lat,
          longitude: hospital.lon,
          place_id: hospital.place_id,
          country: hospital.address.country,
          state: hospital.address.state,
          city: hospital.address.city,
          road: hospital.address.road,
          postalcode: hospital.address.postcode
        });
        savedHospitals.push(savedHospital);
      }
    }

    console.log("Hospitals saved:", savedHospitals);

    return NextResponse.json({ savedHospitals });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
};
