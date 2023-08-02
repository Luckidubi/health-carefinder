import HospitalForm from "@/components/admin/HospitalForm";

const CreateHospitalPage = () => {
  return (
    <section>
      <h1 className="text-2xl text-center font-semibold py-4 text-blue-900 uppercase">
        Create Hospital
      </h1>
      <HospitalForm />
    </section>
  );
};

export default CreateHospitalPage;
