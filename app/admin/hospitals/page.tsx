import Hospital, { HospitalProps } from "@/models/Hospital";

import { DataTable } from "./data-table";
import { columns } from "./column";
import dbConnect from "@/lib/dbConnect";


async function getData(): Promise<HospitalProps[]> {
  try {
    await dbConnect();
    const hospitals = await Hospital.find({});

    const hospitalData: any = hospitals.map((hospital) => {
      return {
        name: hospital.name,
        phone: hospital.phone,
        email: hospital.email,
        address: hospital.address,
        state: hospital.state,
        postalcode: hospital.postalcode,
        photo: hospital.photo,
        city: hospital.city,
        country: hospital.country,
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        place_id: hospital.place_id,
        road: hospital.road,
        content: hospital.content,

      };
    });

    return hospitalData;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
}
const AdminHospitals = async () => {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
     
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AdminHospitals;
