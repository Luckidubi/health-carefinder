import LoadingSpinner from "@/components/LoadingSpinner";

import { AuthGuard } from "@/lib/firebase/auth/auth";

export default function FindHospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-14 flex flex-col max-width ">
        <AuthGuard fallback={<LoadingSpinner />}>{children}</AuthGuard>
      </section>
    </>
  );
}
