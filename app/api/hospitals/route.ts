import dbConnect from "@/lib/dbConnect";
import Hospital from "@/models/Hospital";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, res: NextResponse) => {

    try {
        await dbConnect();
        const hospitals = await Hospital.find({})

        console.log("hospitals", hospitals);

       return new Response(JSON.stringify(hospitals), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }

}