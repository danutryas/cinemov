// import { useEffect, useState } from "react";
// import { getBalance, getMovie, getUser } from "../firebase/db";
// import { useSession } from "next-auth/react";
// import { DocumentData } from "firebase/firestore";
// import { set } from "react-hook-form";
// import { Movie, Showtime } from "@/types/interface";
// import {
//   getMoviePlayByMovieId,
//   getMovieById,
// } from "../firebase/methods/dbGet";

// type MoviePlay = {
//   movieId: string;
//   showtimeId: string;
// };
// type ResultMoviePlay = {
//   movie: Movie;
//   showtime: Showtime[];
// };
// const defaultMovie: Movie = {
//   age_rating: 0,
//   description: "",
//   poster_url: "",
//   release_date: "",
//   ticket_price: 0,
//   title: "",
//   trailer_url: "",
// };
// const defaultShowtime: Showtime = {
//   studio: 0,
//   time: "",
// };

// const defaultMoviePlay: ResultMoviePlay = {
//   movie: defaultMovie,
//   showtime: [],
// };
// // get user data

// export default function useMoviePlay() {
//   const session = useSession() as any;
//   const [moviePlay, setMoviePlay] = useState<ResultMoviePlay>(defaultMoviePlay);
//   const movie = getMovieById("a1CKrsLiSWaKhzJc5jaY");
//   const showtimes = getMoviePlayByMovieId("a1CKrsLiSWaKhzJc5jaY");
//   //   const showtime = getShowtimeById("I2KvapdPKtCl2HfF3g0c");
//   const checkObjectInArray = (obj: Object, arr: Showtime[]) => {
//     return arr.some((item) => {
//       return JSON.stringify(item) === JSON.stringify(obj);
//     });
//   };

//   useEffect(() => {
//     movie.then((res: any) => {
//       setMoviePlay((prev: ResultMoviePlay) => ({
//         ...prev,
//         movie: res,
//       }));
//     });
//   }, [movie]);
//   //   useEffect(() => {
//   //     if (showtimes) {
//   //       showtimes.then((res: any) => {
//   //         res.map((showtime: MoviePlay) => {
//   //           const data = getShowtimeById(showtime.showtimeId);
//   //           if (data) {
//   //             data.then((res: any) => {
//   //               if (!checkObjectInArray(res, moviePlay.showtime)) {
//   //                 setMoviePlay((prev: ResultMoviePlay) => ({
//   //                   ...prev,
//   //                   showtime: [...prev.showtime, res],
//   //                 }));
//   //               }
//   //               //   console.log(res);
//   //             });
//   //           }
//   //         });
//   //       });
//   //     }
//   //   }, [showtimes]);

//   return { moviePlay };
// }
