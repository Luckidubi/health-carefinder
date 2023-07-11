import Image from "next/image";

const LoadingSpinner = () => {

  return (
    <div className="w-full relative flex-center h-screen ">
      <Image
        src="/my-loader (1).svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
      <div className="after-content absolute inset-0"></div>
    </div>
  );
};

export default LoadingSpinner;
