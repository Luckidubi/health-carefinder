import dbConnect from "@/lib/dbConnect";
import Library from "@/models/Library";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  const {
    user_id,
    place_id,
    hospital_name,
    hospital_address,
    latitude,
    longitude,
    country,
    state,
    city,
    road,
    postcode,
  } = await req.json();

  await dbConnect();
  try {
    // Check if the Library already exists
    const library = await Library.findOne({
      $or: [{ hospital_address: hospital_address }, { place_id: place_id }],
    });

    if (!library) {
      const savedLibrary = await Library.create({
        user_id: user_id,
        place_id: place_id,
        hospital_name: hospital_name,
        hospital_address: hospital_address,
        latitude: latitude,
        longitude: longitude,
        country: country,
        state: state,
        city: city,
        road: road,
        postcode: postcode,
      });

      console.log("saved to Library", savedLibrary);
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
};
