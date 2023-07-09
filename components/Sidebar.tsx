"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col justify-start px-6">
        <span className="text-blue-900 text-[30px] font-bold leading-10 pl-5">
          CareFinder
        </span>
        <div className="nav-links pt-14">
          <Link
            className={`sidebar-link ${
              pathname === "/profile" ? "bg-gray-200" : ""
            }`}
            href="/profile"
          >
            Profile
          </Link>
          
          <Link
            className={`${
              pathname === "/library" ? "bg-gray-200 sidebar-link" : ""
            }`}
            href="/library"
          >
            Library
          </Link>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
