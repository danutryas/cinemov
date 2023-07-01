import { useRef, useState } from "react";
import Button from "../button/button";
import { HiArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import useMovies from "@/lib/hooks/useMovies";
import { useModal } from "@/lib/hooks/useModal";
import { useRouter } from "next/router";

const HomeBanner = () => {
  const router = useRouter();
  const [showMovie, setShowMovie] = useState(0);
  const swiperRef = useRef<any>(null);
  const { movies } = useMovies();
  const { setActiveModal } = useModal();

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
          {movies &&
            movies.map((movie: any, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={movie ? movie.poster_url : "/blank.png"} // add blank poster
                  width={288}
                  height={432}
                  alt="poster"
                  className="rounded"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="basis-3/5 h-[432px]">
        <div className="flex flex-col gap-6 w-2/3 h-full justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="max-w-xl text-xl font-bold leading-none  text-gray-400 ">
                Cinema Movie
              </h4>
              <h1 className="max-w-xl text-4xl font-bold leading-none text-white min-h-[72px]">
                {movies[showMovie].title}
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-normal text-gray-300 dark:text-gray-400 ellipsis-5-line">
              {movies[showMovie].description}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 w-2/3 mt-6">
              <Button
                fullWidth
                type="alternative"
                onClick={() => setActiveModal(movies[showMovie].trailer_url)}
              >
                Watch Trailer
              </Button>
              <Button
                fullWidth
                type="default"
                onClick={() => router.push(`/schedule/${movies[showMovie].id}`)}
              >
                Get Ticket
                <HiArrowNarrowRight size={18} />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={prevSlide}
                className="rounded-full p-2 items-center justify-center"
              >
                <MdNavigateBefore size={24} />
              </Button>
              <Button
                onClick={nextSlide}
                className="rounded-full p-2 items-center justify-center"
              >
                <MdNavigateNext size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeBanner;
