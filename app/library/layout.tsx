import LoadingSpinner from "@/components/LoadingSpinner";
import SearchInput from "@/components/SearchInput";
import Sidebar from "@/components/Sidebar";
import UserAvatar from "@/components/UserAvatar";

import { AuthGuard } from "@/lib/firebase/auth/auth";
import { StorageWrapper } from "@/lib/firebase/storage/Storage";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="py-12 max-width relative ">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-12 lg:grid-cols-12">
          <div className="sidebar hidden lg:block col-span-4 lg:col-span-3">
            <Sidebar />
          </div>
          <div className="col-span-4 md:col-span-10 lg:col-span-9 max-w-[600px] xl:max-w-[700px] px-4 overflow-auto">
            <SearchInput />
            <AuthGuard fallback={<LoadingSpinner />}>
              <StorageWrapper>{children}</StorageWrapper>
            </AuthGuard>
          </div>
          <div className="col-span-2 md:col-span-2 hidden md:block">
            <UserAvatar className=" w-20 h-20 absolute top-5 right-12 xl:right-36" />
          </div>
        </div>
      </section>
    </>
  );
}
