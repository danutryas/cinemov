import { useEffect, useState, useCallback } from "react";
import { Transaction, User } from "@/types/interface";
import { db } from "../firebase/firebase.config";
import { defaultTransaction } from "../defaultValue";
import { useSession } from "next-auth/react";

// get user data
export default function useTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const session = useSession() as any;

  const getTransactions = useCallback(async (user: User) => {
    let data = db
      .collection("transaction")
      .where("userId", "==", user.id)
      .get()
      .then((res) => {
        return res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });
    data.then((res: any) => {
      setTransactions(res);
    });
  }, []);

  useEffect(() => {
    if (session.data) {
      getTransactions(session.data.user);
    }
  }, [session]);

  return { transactions };
}
