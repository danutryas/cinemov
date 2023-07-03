import { useEffect, useState, useCallback } from "react";
import { Movie, Showtime } from "@/types/interface";
import { db } from "../firebase/firebase.config";
import { defaultShowtime } from "../defaultValue";

// get user data
export default function useShowtime() {
  const [showtime, setShowtime] = useState<Showtime[]>([defaultShowtime]);

  const getShowtimeById = useCallback(async (id: string) => {
    let data = db
      .collection("showtime")
      .doc(id)
      .get()
      .then((res) => {
        return { ...res.data(), id };
      });
    return data;
  }, []);

  const getShowtime = useCallback(async () => {
    let data = db
      .collection("showtime")
      .get()
      .then((res) => {
        return res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });
    data.then((res: any) => {
      setShowtime(res);
    });
  }, []);

  useEffect(() => {
    getShowtime();
  }, []);

  return { showtime, getShowtimeById };
}
