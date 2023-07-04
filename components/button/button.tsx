import { Children, ReactNode } from "react";
import { twMerge } from "tw-merge";

interface ButtonProps {
  onClick?: Function | VoidFunction;
  type?:
    | "default"
    | "alternative"
    | "dark"
    | "light"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "outlined"
    | "submit";
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button = ({
  type = "default",
  children,
  onClick,
  className,
  fullWidth = false,
}: ButtonProps) => {
  const typeClassName = () => {
    switch (type) {
      case "red":
        return `flex flex-row justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-red-600 dark:hover:bg-red-700  ${className}`;
      case "outlined":
        return ` flex flex-row justify-center items-center gap-2 font-medium rounded-lg text-sm px-4 py-2.5 bg-transparent border-gray-200 border text-gray-500 `;
      case "alternative":
        return `flex flex-row justify-center items-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${className}`;
      default:
        return `flex flex-row justify-center items-center gap-2 text-white bg-[#824179] hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-[#824179] dark:hover:bg-[#733865] focus:outline-none  ${className}`;
    }
  };
  const widthClassName = () => {
    if (fullWidth) {
      return "w-full rounded-md";
    }
    return "";
  };
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={(e) => {
        if (type !== "submit") {
          e.preventDefault();
        }
        if (onClick) {
          onClick();
        }
      }}
      className={twMerge(
        typeClassName() + " " + className + " " + widthClassName()
      )}
    >
      {Children.map(children, (child) => {
        return child;
      })}
    </button>
  );
};
export default Button;
