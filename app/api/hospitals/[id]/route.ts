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

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const {
    name,
    address,
    email,
    phone,
    state,
    city,
    place_id,
    photo,
    postalcode,
    country,
    latitude,
    longitude,
    road,
    content,
  } = await req.json();
  try {
    await dbConnect();
    console.log(params);
    const existingHospital = await Hospital.findOne({ place_id: params.id });

    console.log(existingHospital);
    if (!existingHospital) {
      return new Response("No hospital found", { status: 404 });
    }
    existingHospital.name = name;
    existingHospital.address = address;
    existingHospital.email = email;
    existingHospital.phone = phone;
    existingHospital.state = state;
    existingHospital.city = city;
    existingHospital.place_id = place_id;
    existingHospital.photo = photo;
    existingHospital.postalcode = postalcode;
    existingHospital.country = country;
    existingHospital.latitude = latitude;
    existingHospital.longitude = longitude;
    existingHospital.road = road;
    existingHospital.content = content;

    await existingHospital.save();

    return new Response(JSON.stringify(existingHospital), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update hospital", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: any) => {
  try {
    await dbConnect();
    console.log("paramsid", params);

    await Hospital.deleteOne({ place_id: params.id });
    return new Response("Hospital deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Hospital", { status: 500 });
  }
};
