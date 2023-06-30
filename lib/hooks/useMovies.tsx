import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Movie } from "@/types/interface";
import { db } from "../firebase/firebase.config";

export const defaultMovie: Movie = {
  id: "",
  age_rating: 0,
  description: "",
  poster_url: "",
  release_date: "",
  ticket_price: 0,
  title: "",
  trailer_url: "",
};
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
