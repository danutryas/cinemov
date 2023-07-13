import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LogoCinemov from "../logo/logo";
import Button from "../button/button";
import Avatar from "../avatar/Avatar";
import { ExitIcon } from "@/lib/assets/icons";
import { signOut, useSession } from "next-auth/react";
import ConfirmDelete from "../modal/confirmDelete";
import useUser from "@/lib/hooks/useUser";
import formatCurrency from "../format/userBalance";

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
  const router = useRouter();
  return (
    <>
      <section
        className={`absolute z-10 mt-12 bg-white drop-shadow-lg p-7 rounded-lg ${
          isOpen ? "block" : "hidden"
        }`}
        style={{ minWidth: "25rem" }}
      >
        <section className="flex gap-2 items-center">
          <div
            className="cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <Avatar imgSrc={null} />
          </div>
          <div className="">
            <p
              className="self-center font-semibold text-gray-700 cursor-pointer hover:text-gray-900"
              onClick={() => router.push("/profile")}
            >
              {user ? user.name : "user.name"}
            </p>
            <p
              className="self-center font-medium text-sm text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => router.push("/profile")}
            >
              {user ? user.email : "user.email"}
            </p>
          </div>
        </section>
        <hr className="my-3" />
        <section className="flex justify-between items-center">
          <p className="font-medium text-gray-700">
            {formatCurrency(user?.amount)}
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
        msg="Sign Out"
      />
    </>
  );
};

const Header = () => {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUser();
  const session = useSession();

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
            {session?.data ? (
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
