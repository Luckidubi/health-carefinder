import dbConnect from "@/lib/dbConnect";
import Users from "@/models/Users";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    const userProfile = await Users.findOne({ userId: params.id }).populate(
      "userId"
    );
    console.log(userProfile);

    if (!userProfile) {
      return new Response("No user found", { status: 404 });
    }

    return new Response(JSON.stringify(userProfile), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch user profile", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { fullname, email, address } = await req.json();
  try {
    await dbConnect();
    console.log(params);
    const existingProfile = await Users.findOne({ userId: params.id });

    console.log(existingProfile);
    if (!existingProfile) {
      return new Response("No user found", { status: 404 });
    }
    existingProfile.username = fullname;
    existingProfile.email = email;
    existingProfile.address = address;

    await existingProfile.save();

    return new Response(JSON.stringify(existingProfile), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update user profile", { status: 500 });
  }
};
