import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LogoCinemov from "../logo/logo";

const Header = () => {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="bg-white ">
      <div className="container mx-auto px-5 max-w-screen-2xl">
        <nav className="flex justify-between items-center py-4">
          <div className="flex gap-9 items-center">
            <Link href="/">
              <LogoCinemov width={48} height={48} text />
            </Link>
            <div className="flex gap-2">
              <Link
                className="text-lg text-gray-600 hover:text-gray-900 py-2 px-4"
                href="/now-playing"
              >
                NOW PLAYING
              </Link>
              <Link
                className="text-lg text-gray-600 hover:text-gray-900 py-2 px-4"
                href="/schedule"
              >
                SCHEDULE
              </Link>
            </div>
          </div>
          <div className="relative flex justify-end">
            {isLoggedIn ? (
              <>
                <div
                  className="flex cursor-pointer"
                  onClick={() => setProfileOpen(profileOpen ? false : true)}
                >
                  <p className="self-center mr-5 font-semibold text-gray-500">
                    Hi, <span className="text-blue-700"> </span>
                  </p>
                  <Image
                    src="/blank.png"
                    className="w-10 rounded-full"
                    alt="Blank Image"
                    width={40}
                    height={40}
                  />
                </div>
                <section
                  className={`absolute z-10 mt-12 bg-white drop-shadow-lg p-7 rounded-lg ${
                    profileOpen ? "block" : "hidden"
                  }`}
                  style={{ minWidth: "25rem" }}
                >
                  <div className="flex">
                    <Image
                      src="/blank.png"
                      className="w-10 rounded-full h-12 mr-5"
                      alt="Blank Image"
                      width={40}
                      height={40}
                    />
                    <div className="">
                      <p
                        className="self-center font-semibold text-blue-700 cursor-pointer hover:underline hover:underline-offset-2 hover:text-blue-500"
                        onClick={() => router.push("/profile")}
                      >
                        {" "}
                      </p>
                      <p className="self-center font-medium text-sm text-gray-400"></p>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div onClick={() => setIsLoggedIn(false)}>
                    <p className="text-sm flex text-gray-400 cursor-pointer hover:text-red-700">
                      <svg
                        className="w-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        ></path>
                      </svg>
                      Sign Out
                    </p>
                  </div>
                </section>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                  onClick={() => setIsLoggedIn(true)}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
