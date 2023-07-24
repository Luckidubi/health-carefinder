import dbConnect from "@/lib/dbConnect";
import Hospital from "@/models/Hospital";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    const hospitalDetail = await Hospital.findOne({
      place_id: params.id,
    }).populate("place_id");
    console.log(hospitalDetail);
    if (!hospitalDetail) {
      return new Response("No hospital found", { status: 404 });
    }
    return new Response(JSON.stringify(hospitalDetail), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch hospital profile", { status: 500 });
  }
};
