import { WithOutToken } from "@/types/interface";
import { db } from "./firebase.config";

export const getUser = async (uid: string) => {
  const data = await db
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
  return data;
};

export const createUser = (uid: string, user: WithOutToken) => {
  return db.collection("users").doc(uid).set(user, { merge: true });
};

export const getAccount = (uid: string | undefined | null) => {
  const data = db
    .collection("accounts")
    .where("userId", "==", uid)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  return data;
};
export const getBalance = (uid: string) => {
  const data = db
    .collection("balance")
    .doc(uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });

  return data;
};
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
export const getMovie = () => {
  let data = db
    .collection("movies")
    .get()
    .then((res) => {
      return res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    });
  return data;
};
