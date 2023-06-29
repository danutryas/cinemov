import { useEffect, useState } from "react";
import { getBalance, getMovie, getUser } from "../firebase/db";
import { useSession } from "next-auth/react";
import { DocumentData } from "firebase/firestore";
import { set } from "react-hook-form";

// get user data
export default function useMovies() {
  const session = useSession() as any;
  const [movies, setMovies] = useState<any>(undefined);
  const dbMovie = getMovie();

  useEffect(() => {
    dbMovie.then((res) => {
      setMovies(res);
    });
  }, [session]);

  return { movies };
}
