import { Movie } from "@/types/interface";
import { useEffect, useRef, useState } from "react";
import Button from "../button/button";
import { HiArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";

const movies = [
  {
    id: 0,
    title: "Fast X",
    description:
      "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
    release_date: "2023-05-17",
    poster_url:
      "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    age_rating: 15,
    ticket_price: 53000,
  },

  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
  {
    id: 1,
    title: "John Wick: Chapter 4",
    description:
      "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
    release_date: "2023-03-22",
    poster_url:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    age_rating: 10,
    ticket_price: 60000,
  },
];
// id: 0,
// title: "Fast X",
// description:
//   "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
// release_date: "2023-05-17",
// poster_url:
//   "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
// age_rating: 15,
// ticket_price: 53000,

const HomeBanner = () => {
  const [showMovie, setShowMovie] = useState(0);
  const swiperRef = useRef<any>(null);
  const nextSlide = () => {
    if (showMovie + 1 < movies.length) {
      setShowMovie((prev) => prev + 1);
      swiperRef.current.swiper.slideNext();
    } else if (showMovie + 1 === movies.length) {
      setShowMovie(0);
      swiperRef.current.swiper.slideTo(0, 150 * showMovie);
    }
  };
  const prevSlide = () => {
    if (showMovie > 0) {
      setShowMovie((prev) => prev - 1);
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <div className="p-[2px] bg-white rounded w-[288px] ">
        <Swiper
          height={432}
          width={288}
          slidesPerView={1}
          spaceBetween={50}
          navigation={false}
          allowTouchMove={false}
          slideToClickedSlide={true}
          ref={swiperRef}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <Image
                src={movie.poster_url}
                width={288}
                height={432}
                alt="poster"
                className="rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="basis-3/5 mt-7 h-[400px]">
        <div className="flex flex-col gap-6 w-2/3 h-full justify-between">
          <h4 className="max-w-xl text-2xl font-bold leading-none  text-gray-200 ">
            Now Showing
          </h4>
          <h1 className="max-w-xl text-4xl font-bold leading-none text-white ">
            {movies[showMovie].title}
          </h1>
          <p className="max-w-xl text-lg leading-normal text-gray-500 dark:text-gray-400">
            {movies[showMovie].description}
          </p>
          <div className="">
            <div className="flex gap-2 w-2/3 mt-6">
              <Button fullWidth type="alternative">
                Watch Trailer
              </Button>
              <Button fullWidth type="default">
                Get Ticket
                <HiArrowNarrowRight size={18} />
              </Button>
            </div>
            <div className="swiper-button-prev" onClick={prevSlide}>
              prev
            </div>
            <div className="swiper-button-next" onClick={nextSlide}>
              next
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeBanner;
