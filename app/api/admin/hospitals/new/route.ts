import dbConnect from "@/lib/dbConnect";
import Hospital from "@/models/Hospital";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  const data = await req.json();
  console.log(data);
  await dbConnect();
  try {
    const existingHospital = await Hospital.findOne({
      $or: [{ name: data.name }, { place_id: data.place_id }],
    });
    if (!existingHospital) {
      const newHospital = await Hospital.create({
        ...data,
      });
      console.log("newHospital", newHospital);
      return NextResponse.json({ savedHospitals: newHospital });
    } else {
      return NextResponse.json({ status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
};
