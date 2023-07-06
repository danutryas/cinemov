import Button from "@/components/button/button";
import ShowtimeButton from "@/components/button/showtimeButton";
import PaymentModal from "@/components/modal/paymentModal";
import {
  defaultMovie,
  defaultMoviePlay,
  defaultShowtime,
  defaultTicket,
} from "@/lib/defaultValue";
import { useModal } from "@/lib/hooks/useModal";
import useMoviePlay from "@/lib/hooks/useMoviePlay";
import useMovies from "@/lib/hooks/useMovies";
import useShowtime from "@/lib/hooks/useShowtime";
import useTicket from "@/lib/hooks/useTicket";
import useUser from "@/lib/hooks/useUser";
import { Movie, MoviePlay, Showtime, Ticket } from "@/types/interface";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const DetailMovie = () => {
  const router = useRouter();
  const { getMovieById } = useMovies();
  const { getMoviePlay } = useMoviePlay();
  const { showtime, getShowtimeById } = useShowtime();
  const { sendTicket } = useTicket();
  const { user } = useUser();

  const inputSeatRef = useRef<HTMLInputElement>(null);

  const [movie, setMovie] = useState<Movie>(defaultMovie);
  const [isLoading, setIsLoading] = useState(false);
  const [showtimeId, setShowtimeId] = useState<string>("");
  const [totalSeat, setTotalSeat] = useState<number>(0);
  const [moviePlay, setMoviePlay] = useState<MoviePlay>(defaultMoviePlay);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [seatNumbers, setSeatNumbers] = useState<number[]>([1, 2, 3]);
  const [activeShowtime, setActiveShowtime] = useState<Showtime | null>(null);
  const [ticket, setTicket] = useState<Ticket>(defaultTicket);

  useEffect(() => {
    setIsLoading(true);
    if (router.query.time) {
      setShowtimeId(router.query.time as string);
      getShowtimeById(router.query.time as string).then((res: any) => {
        setActiveShowtime(res);
      });
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

  const addQueryParams = (key: string, id: string, showtime: Showtime) => {
    if (router.query[key] === id) {
      delete router.query[key];
      router.push(router);
      setShowtimeId("");
      setActiveShowtime(null);
    } else {
      router.query[key] = id;
      router.push(router);
      setShowtimeId(id);
      getMoviePlay(movie.id, id).then((res: any) => {
        setMoviePlay(res[0]);
      });
      setActiveShowtime(showtime);
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

  const onSubmit = () => {
    moviePlay.Seats = moviePlay.Seats.map((seat) => {
      if (seatNumbers.toString().includes(seat.seatNumber)) {
        seat.status = "Booked";
      }
      return seat;
    });
    sendTicket(
      {
        moviePlayId: moviePlay.id,
        userId: user.id,
        seatNumber: seatNumbers,
        transactionId: "",
      },
      moviePlay,
      {
        amount: movie.ticket_price,
        description: "Buy Ticket",
        method: "",
        phoneNumber: "",
        status: "pending",
        type: "withdraw",
        userId: user.id,
      }
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 relative mt-16 h-screen gap-3 px-8">
        <div className="col-span-12 md:col-span-4 justify-center md:justify-end flex bottom-0 left-0 right-0 ">
          <div className="h-fit w-[320px] p-4 bg-gray-200 rounded-lg sticky top-2 justify-center flex flex-col gap-3">
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
        <div className="col-span-12 md:col-span-7 md:col-start-5  h-auto flex flex-col gap-4 mb-10">
          <CardBuilder title="Movie Details"></CardBuilder>
          <CardBuilder title="Get Ticket">
            <div className="grid grid-cols-2 md:flex justify-center items-center gap-2 text-center">
              {showtime
                ? showtime.map((item: Showtime) => (
                    <div className="w-full justify-center flex " key={item.id}>
                      <div className="w-fit">
                        <ShowtimeButton
                          onClick={() => addQueryParams("time", item.id, item)}
                          isActived={showtimeId === item.id}
                          className="px-[30px]"
                        >
                          {item.time}
                        </ShowtimeButton>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </CardBuilder>
          {router.query.time ? (
            <>
              <CardBuilder title="How many seat to booked">
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <input
                    ref={inputSeatRef}
                    name="seat"
                    type="number"
                    placeholder="0"
                    className="w-full sm:w-72 py-1 px-3 rounded-sm"
                    required
                  />
                  <Button
                    onClick={() =>
                      setTotalSeat(Number(inputSeatRef.current?.value))
                    }
                  >
                    Next
                  </Button>
                </div>
              </CardBuilder>
              <CardBuilder title="Choose the seat">
                {totalSeat > 0 ? (
                  <>{/* activate click */}</>
                ) : (
                  // just show
                  <>
                    <div className="grid grid-cols-8 w-full gap-y-4 justify-items-center ">
                      {moviePlay
                        ? moviePlay.Seats.map((mp, index: number) => (
                            <div
                              key={index}
                              className={`bg-gray-300 w-6 h-6 sm:h-11 sm:w-11 flex justify-center items-center rounded-md self-center ${seatColor(
                                mp.status
                              )}`}
                              onClick={() => console.log(mp.status)}
                            >
                              <p className="text-sm sm:text-lg font-medium sm:font-semibold">
                                {mp.seatNumber}
                              </p>
                            </div>
                          ))
                        : null}
                    </div>
                    <div className="bg-gray-300 h-11 flex justify-center items-center rounded-md w-full">
                      <p className="text-lg font-semibold">Screen</p>
                    </div>
                    <div className="">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-black rounded-[2px]"></div>
                          <p>Choosed</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-black rounded-[2px]"></div>
                          <p>Available</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-black rounded-[2px]"></div>
                          <p>Booked</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-black rounded-[2px]"></div>
                          <p>Not available</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardBuilder>
              <Button className="mt-2" onClick={() => setIsModalActive(true)}>
                Book Now
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <PaymentModal
        setShowModal={setIsModalActive}
        showModal={isModalActive}
        onSubmit={onSubmit}
        movie={movie}
        showtime={activeShowtime}
        seatNumbers={seatNumbers}
      />
    </>
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
