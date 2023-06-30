import { db } from "../firebase.config";

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
export const getTransaction = (uid: string) => {
  let data = db
    .collection("transaction")
    .where("userId", "==", uid)
    .get()
    .then((res) => {
      return res.docs.map((doc) => {
        return doc.data();
      });
    });
  return data;
};
export const getShowtime = () => {
  let data = db
    .collection("showtime")
    .get()
    .then((res) => {
      return res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    });
  return data;
};
export const getBooked = (uid: string) => {
  if (uid === undefined) return;
  let data = db
    .collection("booked")
    .where("userId", "==", uid)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  return data;
};
export const getMoviePlay = (id: string) => {
  let data = db
    .collection("movie-play")
    .doc(id)
    .get()
    .then((res) => {
      return res.data();
    });
  return data;
};
export const getMovieById = (id: string) => {
  let data = db
    .collection("movies")
    .doc(id)
    .get()
    .then((res) => {
      return res.data();
    });
  return data;
};
export const getShowtimeById = (id: string) => {
  let data = db
    .collection("showtime")
    .doc(id)
    .get()
    .then((res) => {
      return res.data();
    });
  return data;
};
export const getMoviePlayByMovieId = (id: string) => {
  let data = db
    .collection("movie-play")
    .where("movieId", "==", id)
    .get()
    .then((res) => {
      return res.docs.map((doc) => {
        return doc.data();
      });
    });
  return data;
};
