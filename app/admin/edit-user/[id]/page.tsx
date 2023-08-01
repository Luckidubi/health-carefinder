import UserForm from "@/components/admin/UserForm";

const EditUser = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(typeof id);
  return (
    <div className="flex flex-col py-8 flex-center">
      <h2 className="text-blue-900 text-[28px] font-bold leading-10 uppercase">
       Update Profile Details
      </h2>
      <div className="lg:w-full  py-3">
        <UserForm id={id} />
      </div>
    </div>
  );
};

export default EditUser;
