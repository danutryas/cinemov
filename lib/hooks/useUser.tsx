import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { DocumentData } from "firebase/firestore";
import { set } from "react-hook-form";
import { db } from "../firebase/firebase.config";
import { Balance, User, UserData } from "@/types/interface";
import { defaultUser } from "../defaultValue";

// get user data

export default function useUser() {
  const [user, setUser] = useState<UserData>(defaultUser);
  const session = useSession() as any;
  // const getUserBalance = getBalance(session?.data?.user?.id);
  const createNewBalance = useCallback(async (user: User) => {
    await db
      .collection("balance")
      .doc(user.id)
      .set({ amount: 0 })
      .then((res) => {
        console.log(res);
      });
  }, []);

  const getUserBalance = useCallback(async (user: User) => {
    await db
      .collection("balance")
      .doc(user.id)
      .get()
      .then((snapshot: any) => {
        if (snapshot.data() !== undefined) {
          setUser({
            name: user.name,
            email: user.email,
            image: user.image,
            id: user.id,
            amount: snapshot.data()?.amount,
          });
        } else {
          createNewBalance(user);
        }
      });
  }, []);
  const updateBalance = useCallback(async (userId: string, amount: number) => {
    await db
      .collection("balance")
      .doc(userId)
      .set({ amount })
      .then((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    if (session.data) {
      getUserBalance(session.data.user);
    }
  }, [session]);
  return { user, updateBalance };
}
