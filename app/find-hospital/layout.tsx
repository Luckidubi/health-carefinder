import LoadingSpinner from "@/components/LoadingSpinner";
import SearchInput from "@/components/SearchInput";
import { AuthGuard } from "@/lib/firebase/auth/auth";

export default function FindHospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-14 flex flex-col max-width h-screen">
        <AuthGuard fallback={<LoadingSpinner />}>
          <div className="self-center min-w-[280px] w-[60%] max-w-[664px]">
            <SearchInput />
          </div>
          {children}
        </AuthGuard>
      </section>
    </>
  );
}
