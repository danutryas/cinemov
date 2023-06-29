import { useEffect, useState } from "react";
import { getBalance, getUser } from "../firebase/db";
import { useSession } from "next-auth/react";
import { DocumentData } from "firebase/firestore";
import { set } from "react-hook-form";

// get user data

export default function useUser() {
  const [user, setUser] = useState<DocumentData | undefined>(undefined);
  const session = useSession() as any;
  const getUserBalance = getBalance(session?.data?.user?.id);

  useEffect(() => {
    if (session.data) {
      setUser(session.data.user);
      if (getUserBalance) {
        getUserBalance.then((res) => {
          if (res) {
            setUser((prev) => {
              return {
                ...prev,
                balance: res.amount,
              };
            });
          } else {
            setUser((prev) => {
              return {
                ...prev,
                balance: 0,
              };
            });
          }
        });
      }
    }
  }, [session]);
  return { user };
}
