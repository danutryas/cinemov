import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Movie } from "@/types/interface";
import { db } from "../firebase/firebase.config";
import { defaultMovie } from "../defaultValue";

// get user data
export default function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([defaultMovie]);

  const getMovieById = useCallback(async (id: string) => {
    let data = db
      .collection("movies")
      .doc(id)
      .get()
      .then((res) => {
        return res.data();
      });
    return data;
  }, []);

  const getMovies = useCallback(async () => {
    let data = db
      .collection("movies")
      .get()
      .then((res) => {
        return res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });
    data.then((res: any) => {
      setMovies(res);
    });
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  return { movies, getMovieById };
}
