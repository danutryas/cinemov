import { Movie, UserData } from "@/types/interface";

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
