import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();
    const users = await User.find({});

    console.log("users", users);

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
};
