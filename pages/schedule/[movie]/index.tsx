import { defaultMovie } from "@/lib/defaultValue";
import { db } from "@/lib/firebase/firebase.config";
import useMovies from "@/lib/hooks/useMovies";
import { Movie } from "@/types/interface";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const DetailMovie = () => {
  const { getMovieById } = useMovies();
  const [movie, setMovie] = useState<Movie>(defaultMovie);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovieById(router.query.movie as string)
      .then((res: any) => {
        setMovie(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);
  return <></>;
};

export default DetailMovie;
