import { defaultTicketData } from "@/lib/defaultValue";
import useMoviePlay from "@/lib/hooks/useMoviePlay";
import useMovies from "@/lib/hooks/useMovies";
import useShowtime from "@/lib/hooks/useShowtime";
import { Ticket, TicketData, Transaction } from "@/types/interface";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import Button from "../button/button";
import useTransaction from "@/lib/hooks/useTransactions";
import ConfirmDelete from "../modal/confirmDelete";
import ConfirmSave from "../modal/confirmSave";
import useUser from "@/lib/hooks/useUser";
import useTicket from "@/lib/hooks/useTicket";

type TicketBuilderProps = {
  ticketCol: Ticket;
  transaction?: Transaction;
};

const TicketBuilder = ({ ticketCol, transaction }: TicketBuilderProps) => {
  const { getMoviePlayDetails, updateMoviePlay } = useMoviePlay();
  const { getMovieById } = useMovies();
  const { getShowtimeById } = useShowtime();
  const { updateTransaction } = useTransaction();
  const { user, updateBalance } = useUser();
  const { deleteTicket } = useTicket();

  const [ticket, setTicket] = useState<TicketData>(defaultTicketData);
  const [isModalCancelActive, setIsModalCancelActive] =
    useState<boolean>(false);
  const [isModalConfirmActive, setIsModalConfirmActive] =
    useState<boolean>(false);

  const renderDate = () => {
    const currDate = new Date();
    const showtimeNum = Number(ticket.showtime.time.split(":")[0]);
    if (currDate.getHours() < showtimeNum) {
      return `${currDate.getDate()}-${getMonthName(
        currDate.getUTCMonth()
      )}-${currDate.getFullYear()}`;
    } else {
      return `${currDate.getDate() + 1}-${getMonthName(
        currDate.getUTCMonth()
      )}-${currDate.getFullYear()}`;
    }
  };

  const onConfirmTicket = () => {
    // ticket.moviePlay.Seats = ticket.moviePlay.Seats.map((seat) => {
    //   if (ticketCol.seatNumber.toString().includes(seat.seatNumber)) {
    //     seat.status = "Filled";
    //   }
    //   return seat;
    // });
    console.log(ticket.moviePlay.Seats);
    // updateTransaction({
    //   ...transaction,
    //   status: "success",
    // });
    // updateBalance(
    //   transaction?.userId as string,
    //   user.amount - (transaction?.amount as number)
    // );
    // updateMoviePlay(ticketCol.moviePlayId, ticket.moviePlay);
  };
  const onCancelTicket = () => {
    ticket.moviePlay.Seats = ticket.moviePlay.Seats.map((seat) => {
      if (ticketCol.seatNumber.toString().includes(seat.seatNumber)) {
        seat.status = "Available";
      }
      return seat;
    });
    updateTransaction({
      ...transaction,
      status: "canceled",
    });
    deleteTicket(ticketCol.id as string);
    updateMoviePlay(ticketCol.moviePlayId, ticket.moviePlay);
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
    <>
      <div className="flex flex-col gap-2 w-full bg-gray-400 h-fit rounded-md px-4 pt-2 pb-4">
        <div className="flex justify-between items-end gap-8">
          <p className="text-xl font-bold truncate w-9/12">
            {ticket.movie.title}
          </p>
          <p className="text-md font-bold text-gray-600 text-right">E-TICKET</p>
        </div>
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
              value={ticketCol.id as string}
              height={60}
              width={0.9}
              background="transparent"
              margin={0}
              fontSize={14}
            />
          </div>
        </div>
        {transaction && transaction.status === "pending" ? (
          <div className="flex gap-2 mt-2">
            <Button onClick={() => setIsModalConfirmActive(true)}>
              Confirm Ticket
            </Button>
            <Button onClick={() => setIsModalCancelActive(true)}>
              Cancel Ticket
            </Button>
          </div>
        ) : null}
      </div>

      <ConfirmDelete
        showModal={isModalCancelActive}
        setShowModal={setIsModalCancelActive}
        msg="Cancel"
        onSubmit={onCancelTicket}
      />
      <ConfirmSave
        showModal={isModalConfirmActive}
        setShowModal={setIsModalConfirmActive}
        onSubmit={onConfirmTicket}
      />
    </>
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
