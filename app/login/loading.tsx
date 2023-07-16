import Image from "next/image";

const Loading = () => {
  return (
    //make it take screen height

    <div className="w-full relative flex-center h-screen ">
      <Image
        src="/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
      <div className="after-content absolute inset-0"></div>
    </div>
  );
};

export default Loading;
