import EditHospitalForm from "@/components/admin/EditHospitalForm";


const EditHospital = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="flex flex-col py-8 flex-center">
      <h2 className="text-blue-900 text-[28px] font-bold leading-10 uppercase">
      Update Hospital Details
      </h2>
      <div className="lg:w-full py-3">
        <EditHospitalForm id={id} />
      </div>
    </div>
  );
};

export default EditHospital;
