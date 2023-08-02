

import { DataTable } from "./data-table";
import { columns } from "./column";
import dbConnect from "@/lib/dbConnect";
import User, { UserProps } from "@/models/Users";


async function getData(): Promise<UserProps[]> {
  try {
    await dbConnect();
    const users = await User.find({});

    const UserData: any = users.map((user) => {
      return {
          userId: user.userId,
          email: user.email,
          address: user.address,
          photo: user.photo,
          username: user.username,
          role: user.role
      };
    });

    return UserData;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
}
const AdminUsers = async () => {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminUsers;
