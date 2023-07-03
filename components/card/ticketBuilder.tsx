import { defaultTicketData } from "@/lib/defaultValue";
import useMoviePlay from "@/lib/hooks/useMoviePlay";
import useMovies from "@/lib/hooks/useMovies";
import useShowtime from "@/lib/hooks/useShowtime";
import { Ticket, TicketData } from "@/types/interface";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";

type TicketBuilderProps = {
  ticketCol: Ticket;
};

const TicketBuilder = ({ ticketCol }: TicketBuilderProps) => {
  const { getMoviePlayDetails } = useMoviePlay();
  const { getMovieById } = useMovies();
  const { getShowtimeById } = useShowtime();
  const [ticket, setTicket] = useState<TicketData>(defaultTicketData);

  const renderDate = () => {
    const currDate = new Date();
    const showtimeNum = Number(ticket.showtime.time.split(":")[0]);
    if (currDate.getHours() < showtimeNum) {
      return `${currDate.getDate()}-${getMonthName(
        currDate.getUTCMonth()
      )}-${currDate.getFullYear()}`;
    } else {
      return `${
        currDate.getDate() + 1
      }-${currDate.getMonth()}-${currDate.getFullYear()}`;
    }
  };

  useEffect(() => {
    const moviePlay = getMoviePlayDetails(ticketCol.moviePlayId);
    moviePlay.then((res: any) => {
      getShowtimeById(res.showtimeId).then((res) => {
        setTicket((prev: any) => ({ ...prev, showtime: res }));
      });
      getMovieById(res.movieId).then((res) => {
        setTicket((prev: any) => ({ ...prev, movie: res }));
      });
      setTicket((prev: any) => ({ ...prev, moviePlay: res }));
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full bg-gray-400 h-fit rounded-md px-4 pt-2 pb-4">
      <p className="text-xl font-bold truncate">{ticket.movie.title}</p>
      <div className=" grid grid-cols-4">
        <div className="col-span-1">
          <div className="flex flex-col gap-1">
            <p>Date</p>
            <p>Time</p>
            <p>Seat</p>
          </div>
        </div>
        <div className="col-span-1 font-semibold">
          <div className="flex flex-col gap-1">
            <p className="truncate">: {renderDate()}</p>
            <p>: {ticket.showtime.time}</p>
            <div className="flex gap-1">
              :{" "}
              {ticketCol.seatNumber.map((number: number, index: number) => (
                <p
                  key={index}
                  className="bg-black h-8 w-8 rounded-md text-white flex items-center justify-center"
                >
                  {number}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 place-self-end pr-4">
          <Barcode
            value={ticketCol.id}
            height={60}
            width={0.9}
            background="transparent"
            margin={0}
            fontSize={14}
          />
        </div>
      </div>
    </div>
  );
};

function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber);

  // 👇️ using the visitor's default locale
  return date.toLocaleString([], {
    month: "long",
  });
}
export default TicketBuilder;
