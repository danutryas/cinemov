import { WithOutToken } from "@/types/interface";
import { db } from "../firebase.config";

export const createBalance = (uid: string) => {
  if (!uid) return;
  const data = db
    .collection("balance")
    .doc(uid)
    .set({ amount: 0 }, { merge: true })
    .then((res) => {
      return res;
    });
  return data;
};
export const createUser = (uid: string, user: WithOutToken) => {
  return db.collection("users").doc(uid).set(user, { merge: true });
};
