"use client";

import { SignOut } from "@/lib/firebase/auth/auth";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth, useSigninCheck } from "reactfire";

import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import { useUser } from "@/hooks";

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const pathname = usePathname();
  const { status, data: signinResult } = useSigninCheck();
   const id = signinResult?.user?.uid;
   const { user }: any = useUser(id || "");
  const auth = useAuth();

  const handleScroll = () => {
    const nextSection = document.getElementById("about");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const AdminMenu = () => {

    return (
      <>
        <li role="none" className="flex items-stretch ">
          <Link
            className="navbar-links"
            href="/admin"
          >
            <span>Dashboard</span>
          </Link>
        </li>
        <li role="none" className="flex items-stretch ">
          <Link
            className="navbar-links"
            href="/admin/create-hospital"
          >
            <span>Create Hospital</span>
          </Link>
        </li>
        <li role="none" className="flex items-stretch lg:hidden">
          <Link
            className="navbar-links"
            href="/admin/hospitals"
          >
            <span>Hospitals</span>
          </Link>
        </li>
        <li role="none" className="flex items-stretch lg:hidden">
          <Link
            className="navbar-links"
            href="/admin/users"
          >
            <span>Users</span>
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      {/*<!-- Header --> */}
      <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 lg:border-slate-200 lg:backdrop-blur-sm ">
        <div className="relative mx-auto max-w-[1440px] px-6 py-2 xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}

            <Link href="/" className="flex items-center">
              <Image
                src="/hospital.svg"
                alt="Hospital"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-blue-900 hidden sm:flex text-[30px] font-bold">
                CareFinder
              </span>
            </Link>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- Navigation links --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link
                  className="navbar-links"
                  href="/"
                >
                  <span>Home</span>
                </Link>
              </li>
              <li
                role="none"
                className={`items-stretch ${
                  pathname === "/" ? "flex" : "hidden"
                }`}
              >
                <Link
                  className="navbar-links"
                  href=""
                  onClick={handleScroll}
                >
                  <span>About</span>
                </Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link
                  className="navbar-links"
                  href="/find-hospital"
                >
                  Find Hospital
                </Link>
              </li>
              <li role="none" className="flex items-stretch lg:hidden">
                <Link
                  className="navbar-links"
                  href="/library"
                >
                  <span>Library</span>
                </Link>
              </li>
              {
                user?.role === "admin" && <AdminMenu />
              }

              {!signinResult?.signedIn && (
                <li role="none" className="flex items-stretch sm:hidden">
                  <Button
                    className="bg-blue-900 hover:bg-blue-500 text-white"
                    asChild
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                </li>
              )}
              {signinResult?.signedIn && (
                <li role="none" className="flex items-stretch sm:hidden">
                  <Button
                    className="bg-blue-900 hover:bg-blue-500 text-white"
                    onClick={() => SignOut(auth)}
                  >
                    Sign Out
                  </Button>
                </li>
              )}
            </ul>

            <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
              {/*        <!-- Avatar --> */}
              {!signinResult?.signedIn ? (
                <Button
                  className="bg-blue-900 hover:bg-blue-500 text-white"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
              ) : (
                <div className="flex flex-between gap-2">
                  <Link
                    href="/profile"
                    className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                  >
                    <UserAvatar />
                  </Link>
                  <Button
                    className="bg-blue-900 hover:bg-blue-500 text-white hidden md:block"
                    onClick={() => SignOut(auth)}
                  >
                    Sign out
                  </Button>
                </div>
              )}
              {/*        <!-- End Avatar --> */}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
