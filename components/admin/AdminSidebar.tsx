"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col justify-start px-6">
        <span className="text-blue-900 text-[30px] font-bold leading-10 pl-5">
          CareFinder Admin
        </span>
        <div className="nav-links pt-14">
          <Link
            className={` ${
              pathname === "/admin" ? "bg-gray-200 sidebar-link" : ""
            }`}
            href="/admin"
          >
            Dashboard
          </Link>

          <Link
            className={`${
              pathname === "/admin/create-hospital"
                ? "bg-gray-200 sidebar-link"
                : ""
            }`}
            href="/admin/create-hospital"
          >
            Create Hospital
          </Link>

          <Link
            className={`${
              pathname === "/admin/users"
                ? "bg-gray-200 sidebar-link"
                : ""
            }`}
            href="/admin/users"
          >
            Users
          </Link>

          <Link
            className={`${
              pathname === "/admin/hospitals"
                ? "bg-gray-200 sidebar-link"
                : ""
            }`}
            href="/admin/hospitals"
          >
            Hospitals
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
