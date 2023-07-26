import LoadingSpinner from "@/components/LoadingSpinner";

import { AuthGuard } from "@/lib/firebase/auth/auth";
import { StorageWrapper } from "@/lib/firebase/storage/Storage";

export default function FindHospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-14 flex flex-col max-width ">
        <AuthGuard fallback={<LoadingSpinner />}>
          <StorageWrapper>{children}</StorageWrapper>
        </AuthGuard>
      </section>
    </>
  );
}
