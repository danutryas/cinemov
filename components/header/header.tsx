import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LogoCinemov from "../logo/logo";
import Button from "../button/button";
import Avatar from "../avatar/Avatar";

interface ProfileSection {
  isOpen: boolean;
  onLogout: () => void;
}

const ProfileSection = ({ isOpen, onLogout }: ProfileSection) => {
  const router = useRouter();
  return (
    <section
      className={`absolute z-10 mt-12 bg-white drop-shadow-lg p-7 rounded-lg ${
        isOpen ? "block" : "hidden"
      }`}
      style={{ minWidth: "25rem" }}
    >
      <section className="flex gap-2 items-center">
        <Avatar imgSrc={null} />
        <div className="">
          <p
            className="self-center font-semibold text-gery-700 "
            // className="self-center font-semibold text-blue-700 cursor-pointer hover:underline hover:underline-offset-2 hover:text-blue-500"
            // onClick={() => router.push("/profile")}
          >
            user.name
          </p>
          <p className="self-center font-medium text-sm text-gray-400">
            user.mail
          </p>
        </div>
      </section>
      <hr className="my-3" />
      <section className="flex justify-between items-center">
        <p className="font-medium text-gray-700">Rp5.000.000</p>
        <Button>Deposit</Button>
      </section>
      <hr className="mb-5 mt-3" />
      <section onClick={onLogout}>
        <p className="text-sm flex text-gray-400 cursor-pointer hover:text-red-700">
          <svg
            className="w-5 mr-2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            ></path>
          </svg>
          Sign Out
        </p>
      </section>
    </section>
  );
};

const Header = () => {
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onLogin = () => {
    setIsLoggedIn(true);
    setProfileOpen(false);
  };
  const onLogout = () => {
    setIsLoggedIn(false);
  };

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
                  onClick={() => setProfileOpen((isOpen) => !isOpen)}
                >
                  <p className="self-center mr-5 font-semibold text-gray-500">
                    Hi, <span className="text-blue-700"> </span>
                  </p>
                  <Avatar imgSrc={null} />
                </div>
                <ProfileSection isOpen={profileOpen} onLogout={onLogout} />
              </>
            ) : (
              <>
                <Button type="submit" onClick={onLogin}>
                  Log In
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
