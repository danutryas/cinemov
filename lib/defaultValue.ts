import {
  Movie,
  MoviePlay,
  Showtime,
  Ticket,
  UserData,
  TicketData,
  Transaction,
} from "@/types/interface";

export const defaultUrl: string = "https://www.youtube.com/embed/";
export const defaultMovie: Movie = {
  id: "",
  age_rating: 0,
  description: "",
  poster_url: "",
  release_date: "",
  ticket_price: 0,
  title: "",
  trailer_url: "",
};
export const defaultUser: UserData = {
  name: "",
  email: "",
  image: "",
  id: "",
  amount: 0,
};
export const defaultShowtime: Showtime = {
  studio: 0,
  time: "",
  id: "",
};
export const defaultMoviePlay: MoviePlay = {
  id: "",
  movieId: "",
  showtimeId: "",
  availableSeat: 0,
  Seats: [
    {
      seatNumber: "",
      status: "",
    },
  ],
};
export const defaultTicket: Ticket = {
  id: "",
  moviePlayId: "",
  seatNumber: [],
  userId: "",
  transactionId: "",
};
export const defaultTicketData: TicketData = {
  movie: defaultMovie,
  showtime: defaultShowtime,
  moviePlay: defaultMoviePlay,
};
export const defaultTransaction: Transaction = {
  amount: 0,
  type: "",
  userId: "",
  method: "",
  description: "",
};
