import { useEffect, useState, useCallback } from "react";
import { Movie, Showtime } from "@/types/interface";
import { db } from "../firebase/firebase.config";
import { defaultShowtime } from "../defaultValue";
import { and, query, where } from "firebase/firestore";

// get user data
export default function useMoviePlay() {
  const getMoviePlay = async (movieId: string, showtimeId: string) => {
    let data = db
      .collection("movie-play")
      .where("movieId", "==", movieId)
      .where("showtimeId", "==", showtimeId)
      .get()
      .then((res) => {
        return res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });
    return data;
  };

  return { getMoviePlay };
}
