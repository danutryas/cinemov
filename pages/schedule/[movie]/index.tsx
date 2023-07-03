import Button from "@/components/button/button";
import { defaultMovie, defaultMoviePlay } from "@/lib/defaultValue";
import useMoviePlay from "@/lib/hooks/useMoviePlay";
import useMovies from "@/lib/hooks/useMovies";
import useShowtime from "@/lib/hooks/useShowtime";
import { Movie, MoviePlay, Showtime } from "@/types/interface";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const DetailMovie = () => {
  const { getMovieById } = useMovies();
  const [movie, setMovie] = useState<Movie>(defaultMovie);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { showtime } = useShowtime();
  const [showtimeId, setShowtimeId] = useState<string>("");
  const [totalSeat, setTotalSeat] = useState<number | null>(0);
  const { getMoviePlay } = useMoviePlay();
  const [moviePlay, setMoviePlay] = useState<MoviePlay>(defaultMoviePlay);

  useEffect(() => {
    setIsLoading(true);
    if (router.query.time) {
      setShowtimeId(router.query.time as string);
      getMoviePlay(movie.id, router.query.time as string).then((res: any) => {
        setMoviePlay(res[0]);
      });
    }
    getMovieById(router.query.movie as string)
      .then((res: any) => {
        setMovie(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  const addQueryParams = (key: string, id: string) => {
    if (router.query[key] === id) {
      delete router.query[key];
      router.push(router);
      setShowtimeId("");
    } else {
      router.query[key] = id;
      router.push(router);
      setShowtimeId(id);
      getMoviePlay(movie.id, id).then((res: any) => {
        setMoviePlay(res[0]);
      });
    }
  };
  const seatColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-blue-300";
      case "Choosed":
        return "bg-green-500";
      case "Filled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="grid grid-cols-12 relative mt-16 h-screen gap-5">
      <div className="col-span-5 justify-end flex  bottom-0 left-0 right-0">
        <div className="h-[500px] w-[320px] py-6 px-4 bg-gray-200 rounded-lg sticky top-2 justify-center flex flex-col gap-3">
          <Image
            src={movie ? movie.poster_url : "/blank.jpg"}
            className="rounded-md"
            alt="movie poster"
            height={480}
            width={320}
          />
          <h1 className="text-center text-xl font-semibold">
            {movie ? movie.title : ""}
          </h1>
        </div>
      </div>
      <div className="col-span-5 h-[200vh] col-start-6 flex flex-col gap-4">
        <CardBuilder title="Movie Details"></CardBuilder>
        <CardBuilder title="Get Ticket">
          <div className="flex justify-center gap-4">
            {showtime
              ? showtime.map((item: Showtime) => (
                  <div
                    className={`bg-gray-300 px-3 py-1 rounded-md cursor-pointer ${
                      showtimeId === item.id ? "bg-green-500" : ""
                    }`}
                    key={item.id}
                    onClick={() => addQueryParams("time", item.id)}
                  >
                    {item.time}
                  </div>
                ))
              : null}
          </div>
        </CardBuilder>
        {router.query.time ? (
          <>
            <CardBuilder title="How many seat to booked">
              <div className="flex justify-center gap-4">
                <input
                  name="seat"
                  type="number"
                  placeholder="0"
                  className="w-20"
                  required
                />
              </div>
            </CardBuilder>
            <CardBuilder title="Choose the seat">
              <div className="grid grid-cols-8 w-full gap-y-4 justify-items-center ">
                {moviePlay
                  ? moviePlay.Seats.map((mp, index: number) => (
                      <div
                        key={index}
                        className={`bg-gray-300 w-11 h-11 flex justify-center items-center rounded-md self-center ${seatColor(
                          mp.status
                        )}`}
                        onClick={() => console.log(mp.status)}
                      >
                        <p className="text-lg font-semibold">{mp.seatNumber}</p>
                      </div>
                    ))
                  : null}
              </div>
              <div className="bg-gray-300 h-11 flex justify-center items-center rounded-md w-full">
                <p className="text-lg font-semibold">Screen</p>
              </div>
              {/* {totalSeat !== null ? (
              ) : null} */}
            </CardBuilder>
            <Button>Book Now</Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default DetailMovie;

const CardBuilder = ({ children, title }: any) => {
  return (
    <div className="py-4 px-4 bg-gray-200 rounded-lg text-black flex justify-center align-center flex-col gap-4">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      {children}
    </div>
  );
};
