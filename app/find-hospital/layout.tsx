import SearchInput from "@/components/SearchInput";

export default function FindHospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-14 flex flex-col max-width">
      <div className="self-center min-w-[280px] w-[60%] max-w-[664px]">
        <SearchInput />
      </div>
      {children}
    </section>
  );
}
