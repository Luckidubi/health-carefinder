import ViewHospital from "@/components/ViewHospital";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="py-20 max-width">
      <ViewHospital id={id} />
    </div>
  );
};

export default page;
