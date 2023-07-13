import { useRouter } from "next/router";
import { Children, ReactNode } from "react";
import { twMerge } from "tw-merge";

interface ShowtimeButtonProps {
  children: ReactNode;
  className?: string;
  movieId?: string;
  showtimeId?: string;
  isActived?: boolean;
  onClick?: () => void | null;
}

const ShowtimeButton = ({
  children,
  className,
  movieId,
  showtimeId,
  isActived = false,
  onClick,
}: ShowtimeButtonProps) => {
  const router = useRouter();

  const activatedClass = (active: boolean) => {
    if (active) {
      return "bg-gray-800";
    } else {
      return "bg-gray-500";
    }
  };
  const onClickEvent = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/schedule/${movieId}?time=${showtimeId}`);
    }
  };

  return (
    <button
      type="button"
      onClick={() => onClickEvent()}
      className={twMerge(
        "flex flex-row justify-center items-center gap-2 font-medium rounded-lg text-sm px-8 py-2.5 bg-transparent border-black-200 border-2 text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-800 " +
          className +
          " " +
          activatedClass(isActived)
      )}
    >
      {Children.map(children, (child) => {
        return child;
      })}
    </button>
  );
};
export default ShowtimeButton;
