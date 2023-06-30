import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { DocumentData } from "firebase/firestore";
import { set } from "react-hook-form";
import { db } from "../firebase/firebase.config";
import { Balance, User, UserData } from "@/types/interface";

// get user data
const defaultUser: UserData = {
  name: "",
  email: "",
  image: "",
  id: "",
  amount: 0,
};

export default function useUser() {
  const [user, setUser] = useState<UserData>(defaultUser);
  const session = useSession() as any;
  // const getUserBalance = getBalance(session?.data?.user?.id);
  const getUserBalance = useCallback(async (user: User) => {
    await db
      .collection("balance")
      .doc(user.id)
      .get()
      .then((snapshot) => {
        setUser({
          name: user.name,
          email: user.email,
          image: user.image,
          id: user.id,
          amount: snapshot.data()?.amount,
        });
      });
  }, []);
  useEffect(() => {
    if (session.data) {
      getUserBalance(session.data.user);
    }
  }, [session]);
  return { user };
}
