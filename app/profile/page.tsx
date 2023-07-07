import ProfileForm from '@/components/ProfileForm';

const page = () => {
  return (
    <div className="flex flex-col py-8 flex-center">
      <h2 className="text-blue-900 text-[28px] font-bold leading-10 uppercase">
        Profile Details
      </h2>
      <div className='lg:w-full w-[300px] py-3'>

      <ProfileForm/>
      </div>
    </div>
  );
}

export default page