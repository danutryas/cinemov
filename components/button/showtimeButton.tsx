import { useRouter } from "next/router";
import { Children, ReactNode } from "react";
import { twMerge } from "tw-merge";

interface ShowtimeButtonProps {
  children: ReactNode;
  className?: string;
  movieId?: string;
  showtimeId?: string;
}

const ShowtimeButton = ({
  children,
  className,
  movieId,
  showtimeId,
}: ShowtimeButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={(e) => {
        router.push(`/schedule/${movieId}?time=${showtimeId}`);
      }}
      className={twMerge(
        "flex flex-row justify-center items-center gap-2 font-medium rounded-lg text-sm px-8 py-2.5 bg-transparent border-black-200 border-2 text-white bg-gray-500 hover:bg-gray-600 focus:bg-gray-800 " +
          className
      )}
    >
      {Children.map(children, (child) => {
        return child;
      })}
    </button>
  );
};
export default ShowtimeButton;
