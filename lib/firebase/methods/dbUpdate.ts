import { db } from "../firebase.config";

export const updateBalance = (uid: string, amount: number) => {
  if (!uid) return;
  const data = db
    .collection("balance")
    .doc(uid)
    .update({ amount: amount })
    .then((res) => {
      return res;
    });
  return data;
};
