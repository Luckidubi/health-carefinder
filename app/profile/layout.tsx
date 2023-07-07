import SearchInput from "@/components/SearchInput";
import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 max-width relative">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="sidebar hidden lg:block col-span-4 lg:col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-4 md:col-span-6 max-w-[600px] px-4">
          <SearchInput />

          {children}
        </div>
        <div className="col-span-4 lg:col-span-3 hidden md:block">
          <Avatar className="w-20 h-20 absolute top-5 right-12 xl:right-36">
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </section>
  );
}
