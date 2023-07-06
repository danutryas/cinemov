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

  const getTransactionsById = useCallback(async (transactionId: string) => {
    let data = db
      .collection("transaction")
      .doc(transactionId)
      .get()
      .then((res) => {
        return { ...res.data(), id: res.id };
      });
    data.then((res: any) => {
      setTransactions(res);
    });
  }, []);

  const updateTransaction = useCallback(async (transaction: Transaction) => {
    db.collection("transaction").doc(transaction.id).update(transaction);
  }, []);

  const addTransaction = useCallback(async (transaction: Transaction) => {
    await db
      .collection("transaction")
      .add(transaction)
      .then((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    if (session.data) {
      getTransactions(session.data.user);
    }
  }, [session]);

  return {
    transactions,
    getTransactionsById,
    updateTransaction,
    addTransaction,
  };
}
