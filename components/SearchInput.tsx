import { Input } from "./ui/input"
const SearchInput = () => {
  return (
    <>
      <Input
        type="search"
        placeholder="Federal Medical Center, Ebutte Metta, Lagos State"
        className="rounded-2xl placeholder-slate-500 text-center tracking-wide text-stone-500 text-[15px] font-medium leading-snug"
      />
    </>
  );
}

export default SearchInput