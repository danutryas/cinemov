import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DocumentData } from "firebase/firestore";
import { set } from "react-hook-form";
import join from "../firebase/methods/join";
import { getMovie, getUser } from "../firebase/db";
import {
  getBooked,
  getMovieById,
  getMoviePlay,
  getShowtimeById,
} from "../firebase/methods/dbGet";
import destructPromise from "../destructPromise";
import useUser from "./useUser";

// get user data

export default function useBooked() {
  const [userBooked, setUserBooked] = useState<any>([]);
  const session = useSession() as any;
  const booked = getBooked(session?.data?.user?.id);

  //   const movie = getMovie();
  //   const joined = join();
  useEffect(() => {
    if (booked) {
      booked.then((res) => {
        const bookedData = res;
        bookedData.map((data: any, index) => {
          const moviePlay = getMoviePlay(data.moviePlay);
          moviePlay.then((res: any) => {
            const movie = getMovieById(res.movieId);
            movie.then((res) => {
              setUserBooked((prev: any) => [{ ...prev[index], movie: res }]);
            });
            const showTime = getShowtimeById(res.showtimeId);
            showTime.then((res) => {
              setUserBooked((prev: any) => [{ ...prev[index], showTime: res }]);
            });
          });
        });
      });
    }
  }, [session]);
  useEffect(() => {
    console.log(userBooked);
  }, [userBooked]);

  return {};
}
