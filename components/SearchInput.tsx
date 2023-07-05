import Image from "next/image";

const SearchInput = () => {
  return (
    <div className="relative max-w-[664px] ">
      <input
        className="py-2 pr-8 pl-10  w-full h-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 text-center tracking-wide text-stone-500 text-[14px] font-medium leading-snug"
        type="text"
        placeholder="Search hospital"
      />

      <Image
        src="/search.svg"
        alt="search"
        width={24}
        height={24}
        className="absolute top-3 right-3 "
      />
      <Image
        src="/location.svg"
        alt="location icon"
        width={24}
        height={24}
        className="absolute top-3 left-3 "
      />
    </div>
  );
};

export default SearchInput;
