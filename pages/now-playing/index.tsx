import { Header } from "@/components";

import { MovieCard } from "@/components/card/card";

import { db } from "@/lib/firebase/firebase.config";
import useMovies from "@/lib/hooks/useMovies";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import Head from "next/head";
import { useEffect } from "react";
import Nextauth from "../api/auth/[...nextauth]";

const NowPlaying = () => {
  const { movies } = useMovies();

  return (
    <>
      <Head>
        <title>Now Playing | cinemov</title>
        <meta name="description" content="Generated by Create Next Stack." />
      </Head>
      <div className="grid gap-5 truncate grid-cols-4 p-5">
        {movies.map((movie: any, id: number) => (
          <MovieCard
            key={id}
            imgUrl={movie.poster_url}
            title={movie.title}
            id={movie.id}
            trailerUrl={movie.trailer_url}
          />
        ))}
      </div>
    </>
  );
};
export default NowPlaying;
