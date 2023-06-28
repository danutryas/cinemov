import { Children, cloneElement, ReactNode, useState } from "react";

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
    | "submit";
  children: ReactNode;
  className?: string;
}

const Button = ({
  type = "default",
  children,
  onClick,
  className,
}: ButtonProps) => {
  const getClassName = () => {
    switch (type) {
      case "red":
        return `flex flex-row justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${className}`;
      case "alternative":
        return `flex flex-row justify-center items-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${className}`;
      default:
        return `flex flex-row justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`;
    }
  };

  return (
    <button
      type={type === "submit" ? "submit" : "reset"}
      onClick={(e) => {
        if (type !== "submit") {
          e.preventDefault();
        }
        if (onClick) {
          onClick();
        }
      }}
      // className={twMerge(getClassName() + " " + className)}
      className={`${getClassName()} ${className}`}
    >
      {Children.map(children, (child) => {
        return child;
      })}
    </button>
  );
};
export default Button;
