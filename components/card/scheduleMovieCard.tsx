import { IScheduleMovieCard } from "@/types/interface";
import Image from "next/image";
import ShowtimeButton from "../button/showtimeButton";

const ScheduleMovieCard = ({ movie, showtime }: IScheduleMovieCard) => {
  return (
    <div className="flex p-4 rounded-md bg-gray-200 w-fit gap-4">
      <div className="">
        <Image
          src={movie ? movie.poster_url : "/blank.png"}
          height={250}
          width={166}
          alt={`${movie.title} poster`}
        />
      </div>
      <div className="flex flex-col px-2 gap-4 justify-between ">
        <div className="relative">
          <h3 className="text-md font-semibold text-center py-1 after:h-[2px] after:rounded after:absolute after:w-1/2 after:bg-black after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            Showtime
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {showtime
            ? showtime.map((showtime, index: number) => (
                <ShowtimeButton
                  movieId={movie.id}
                  showtimeId={showtime.id}
                  key={index}
                >
                  {showtime.time}
                </ShowtimeButton>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default ScheduleMovieCard;
