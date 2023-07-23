import dbConnect from "@/lib/dbConnect";
import Library from "@/models/Library";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    console.log("params", params);
    const userLibrary = await Library.find({ user_id: params.id });
    console.log("found", userLibrary);
    if (!userLibrary || userLibrary.length === 0) {
      return new Response("No library found", { status: 404 });
    }

    return NextResponse.json(userLibrary, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch library", { status: 500 });
  }
};
