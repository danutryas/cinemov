import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LogoCinemov from "../logo/logo";
import Button from "../button/button";
import Avatar from "../avatar/Avatar";
import { ExitIcon } from "@/lib/assets/icons";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { log } from "console";
import ConfirmDelete from "../modal/confirmDelete";
import { app } from "@/lib/firebase/firebase.config";
// import { getAccount, getBalance } from "@/lib/firebase/db";
import useUser from "@/lib/hooks/useUser";

interface ProfileSection {
  isOpen: boolean;
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        amount?: number | null | undefined;
      }
    | undefined;
}

const ProfileSection = ({ isOpen, user }: ProfileSection) => {
  const [confirmLogoutModal, setConfirmLogoutModal] = useState(false);

  return (
    <>
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
              {user ? user.name : "user.name"}
            </p>
            <p className="self-center font-medium text-sm text-gray-400">
              {user ? user.email : "user.email"}
            </p>
          </div>
        </section>
        <hr className="my-3" />
        <section className="flex justify-between items-center">
          <p className="font-medium text-gray-700">
            {user?.amount
              ? Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(user.amount)
              : "Rp0"}
          </p>
          <Button>Deposit</Button>
        </section>
        <hr className="mb-5 mt-3" />
        <section onClick={() => setConfirmLogoutModal(true)}>
          <p className="text-sm flex text-gray-400 cursor-pointer hover:text-red-700">
            <ExitIcon className="w-5 mr-2" />
            Sign Out
          </p>
        </section>
      </section>

      <ConfirmDelete
        showModal={confirmLogoutModal}
        setShowModal={setConfirmLogoutModal}
        onSubmit={signOut}
      />
    </>
  );
};

const Header = () => {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="bg-white border-b-2 ">
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
            {user ? (
              <>
                <div
                  className="flex cursor-pointer"
                  onClick={() => setProfileOpen((isOpen) => !isOpen)}
                >
                  <Avatar imgSrc={null} />
                </div>
                <ProfileSection isOpen={profileOpen} user={user} />
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  onClick={() => router.push("/auth/login")}
                >
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
