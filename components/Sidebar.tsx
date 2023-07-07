"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col justify-start px-6">
        <span>CareFinder</span>
        <div className="nav-links pt-14">
          <Link
            className={`sidebar-link ${
              pathname === "/profile" ? "bg-gray-200" : ""
            }`}
            href="/profile"
          >
            Profile
          </Link>
          <Link href="/find-hospital">Find Hospital</Link>
          <Link
            className={`${
              pathname === "/library" ? "bg-gray-200 sidebar-link" : ""
            }`}
            href="/library"
          >
            Library
          </Link>
          <Link href="/">Home</Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
