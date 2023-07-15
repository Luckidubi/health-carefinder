import dbConnect from "@/lib/dbConnect";
import User from "@/models/Users";


import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  const { userId, username, email, photo } = await req.json();
  await dbConnect();
  try {
    // Check if the user already exists

    const existingUser = await User.findOne({ $or: [{ userId }, { email }] });

    if (!existingUser) {
      const newUser = await User.create({
        userId: userId,

        email: email,
        username: username.replace(" ", ""),
        photo: photo,
      });

      console.log("newUser", newUser);
    }

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
};
