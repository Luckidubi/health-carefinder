import LoadingSpinner from "@/components/LoadingSpinner";
import Login from "@/components/Login";

import SearchInput from "@/components/SearchInput";
import UserAvatar from "@/components/UserAvatar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Badge } from "@/components/ui/badge";

import { AdminWrapper, AuthGuard } from "@/lib/firebase/auth/auth";
import { StorageWrapper } from "@/lib/firebase/storage/Storage";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminWrapper fallback={<Login />}>
        <AuthGuard fallback={<LoadingSpinner />}>
          <StorageWrapper>
            <section className="py-12 max-width relative overflow-x-hidden">
              <div className="grid grid-cols-4 gap-6 md:grid-cols-12 lg:grid-cols-12">
                <div className="sidebar hidden lg:block col-span-4 lg:col-span-3">
                  <AdminSidebar />
                </div>
                <div className="col-span-4 md:col-span-10 lg:col-span-9 max-w-[600px] xl:max-w-[700px] px-4 overflow-auto">
                  <SearchInput />
                  {children}
                </div>
                <div className="col-span-2 md:col-span-2 hidden md:block ">
                  <div className="flex-col flex-between absolute top-5 right-12 xl:right-36">
                    <UserAvatar className="w-20 h-20 pb-2  " />
                    <Badge>ADMIN</Badge>
                  </div>{" "}
                </div>
              </div>
            </section>
          </StorageWrapper>
        </AuthGuard>
      </AdminWrapper>
    </>
  );
}
