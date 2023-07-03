import ShowtimeButton from "@/components/button/showtimeButton";
import ScheduleMovieCard from "@/components/card/scheduleMovieCard";
import useMovies from "@/lib/hooks/useMovies";
import useShowtime from "@/lib/hooks/useShowtime";
import { Movie, Showtime } from "@/types/interface";
import Image from "next/image";

const ScheduleMovie = () => {
  const { movies } = useMovies();
  const firstMovies = movies ? movies.slice(0, movies.length / 2 + 1) : [];
  const secondMovies = movies ? movies.slice(movies.length / 2 + 1) : [];
  const { showtime } = useShowtime();
  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className="flex flex-col gap-6 items-center">
        <div className="relative w-fit pb-1">
          <h2 className="text-2xl font-semibold text-center py-1 after:h-1 after:rounded after:absolute after:w-2/3 after:bg-black after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            TODAY
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-y-6 gap-x-6">
          {firstMovies
            ? firstMovies.map((movie, index) => (
                <ScheduleMovieCard
                  key={index}
                  movie={movie}
                  showtime={showtime}
                />
              ))
            : null}
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <div className="relative w-fit pb-1">
          <h2 className="text-2xl font-semibold text-center py-1 after:h-1 after:rounded after:absolute after:w-2/3 after:bg-black after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            TOMORROW
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-y-6 gap-x-6">
          {secondMovies
            ? secondMovies.map((movie, index) => (
                <ScheduleMovieCard
                  key={index}
                  movie={movie}
                  showtime={showtime}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default ScheduleMovie;
