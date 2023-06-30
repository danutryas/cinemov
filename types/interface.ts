export type Movie = {
  age_rating: number;
  desciption: string;
  poster_url: string;
  release_date: string;
  ticket_price: number;
  title: string;
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
};
export type MoviePlay = {
  movieId: string;
  showtimeId: string;
};
export type Booked = {
  moviePlayId: string;
};
export type Balance = {
  amount: number;
};
