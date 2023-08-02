import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full text-slate-500">
      {/*      <!-- Main footer --> */}
      <div className="border-t border-slate-200 bg-gray-200 pt-16 pb-12 text-sm padding-x">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-4"
              aria-labelledby="footer-product-3-sub"
            >
              <h3
                className="mb-6 text-blue-900 text-[20px] md:text-[30px] font-medium leading-6 md:leading-10"
                id="footer-product-3-sub"
              >
                Address
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <p className=" text-[16px] md:text-[20px] font-medium leading-8 md-leading-10">
                    42, Sunrise Avenue, <br />
                    New Haven, Enugu
                    <br />
                    +2347089951617
                  </p>
                </li>
              </ul>
            </nav>
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-4"
              aria-labelledby="footer-about-3-sub"
            >
              <h3
                className="mb-6 text-blue-900 text-[20px] md:text-[30px] font-medium leading-6 md:leading-10"
                id="footer-about-3-sub"
              >
                About us
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <Link
                    href="/"
                    className="transition-colors duration-300 hover:text-blue-900 focus:text-blue-600"
                  >
                    About us
                  </Link>
                </li>

                <li className="mb-2 leading-6">
                  <Link
                    href="#"
                    className="transition-colors duration-300 hover:text-blue-900 focus:text-blue-600"
                  >
                    Blog
                  </Link>
                </li>
                
              </ul>
            </nav>
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-4"
              aria-labelledby="footer-get-in-touch-3-sub"
            >
              <h3 className="mb-6 text-blue-900 text-[20px] md:text-[30px] font-medium leading-6 md:leading-10">
                Quick Links
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <Link
                    href="/profile"
                    className="transition-colors duration-300 hover:text-blue-900 focus:text-blue-600"
                  >
                    My Account
                  </Link>
                </li>
                <li className="mb-2 leading-6">
                  <Link
                    href="/library"
                    className="transition-colors duration-300 hover:text-blue-900 focus:text-blue-600"
                  >
                    Library
                  </Link>
                </li>

              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/*      <!-- Sub Footer --> */}
      <div className="border-t border-gray-300 bg-gray-200 py-4 text-sm padding-x">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 items-center gap-6 md:grid-cols-8 lg:grid-cols-12">
            <Link href="/" className="flex items-center">
              <Image
                src="/hospital.svg"
                alt="Hospital"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="text-blue-900 hidden sm:flex text-[28px] font-bold">
                CareFinder
              </span>
            </Link>
            <nav
              className="col-span-3 md:col-span-4 lg:col-span-6"
              aria-labelledby="subfooter-links"
            >
              <h3 className="sr-only" id="subfooter-links">
                Get in touch
              </h3>
              <ul className="flex flex-wrap items-center justify-end gap-2 lg:gap-4">
                <li className="leading-6">
                  <a
                    href=""
                    className="transition-colors duration-300 hover:text-blue-900 focus:text-blue-600"
                  >
                    T&C
                  </a>
                </li>
                <li className="leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-blue-900 focus:text-blue-600"
                  >
                    Privacy
                  </a>
                </li>
                <li className="leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-blue-900 focus:text-blue-600"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer