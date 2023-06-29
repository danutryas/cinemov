import { useRouter } from "next/router";

type MovieCardProps = {
  title: string;
  imgUrl: string;
  id: string;
};

export const MovieCard = (props: MovieCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/movie/${props.id}`)}
      className=" cursor-pointer w-[285px] h-[412px] bg-[#313131] flex rounded-[14px] items-center justify-center text-white relative group hover:scale-105 transition duration-200 ease-in-out"
    >
      <img
        src={props.imgUrl}
        alt=""
        className="w-full h-full object-cover absolute rounded-2xl group-hover:blur-sm group-hover:opacity-50  p-[4px] z-1 transition duration-200 ease-in-out"
      />
      <div className="w-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out p-3">
        <p className="font-bold text-xl w-full text-center whitespace-normal">
          {props.title}
        </p>
      </div>
    </div>
  );
};
