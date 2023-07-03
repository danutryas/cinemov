import { type } from "os";

export type WithOutToken = {
  email: string | null;
  name: string | null;
  photoURL: string | undefined;
  provider: string | undefined;
  id: string;
};

export type Movie = {
  id: string;
  age_rating: number;
  description: string;
  poster_url: string;
  release_date: string;
  ticket_price: number;
  title: string;
  trailer_url: string;
};
export type Account = {
  access_token: string;
  expires_at: number;
  id_token: string;
  provider: string;
  providerAccountId: string;
  scope: string;
  token_type: string;
  type: string;
  userId: string;
};
// export type User = {};
export type Transaction = {
  amount: number;
  description: string;
  type: string;
  userId: string;
};
export type Showtime = {
  studio: number;
  time: string;
  id: string;
};
export type MoviePlay = {
  movieId: string;
  showtimeId: string;
  availableSeat: number;
  Seats: {
    seatNumber: string;
    status: string;
  }[];
};
export type Booked = {
  moviePlayId: string;
};
export type Balance = {
  amount: number;
};
export interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}
export interface UserData extends Balance {
  name: string;
  email: string;
  image: string;
  id: string;
}
export interface Ticket {
  id: string;
  moviePlayId: string;
  seatNumber: number[] | [];
  userId: string;
}
export interface TicketData {
  movie: Movie;
  showtime: Showtime;
  moviePlay: MoviePlay;
}

export interface IScheduleMovieCard {
  movie: Movie;
  showtime: Showtime[];
}
