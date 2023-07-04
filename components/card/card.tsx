import { useRouter } from "next/router";
import Button from "../button/button";
import { useModal } from "@/lib/hooks/useModal";
import Image from "next/image";

type MovieCardProps = {
  title: string;
  imgUrl: string;
  id: string;
  trailerUrl: string;
};

export const MovieCard = (props: MovieCardProps) => {
  const router = useRouter();
  const { setActiveModal } = useModal();
  return (
    <div className="w-[285px] h-fit lg:h-[412px] bg-[#313131] flex flex-col justify-start  rounded-[14px] items-center lg:justify-center text-white relative group lg:hover:scale-105 transition duration-200 ease-in-out z-1">
      <Image
        src={props.imgUrl}
        className="w-full h-fit lg:h-full object-cover block lg:absolute rounded-2xl lg:group-hover:blur-sm lg:group-hover:opacity-50 p-1 z-1 transition duration-200 ease-in-out"
        alt="poster"
        width={285}
        height={412}
      />
      <div className="w-full flex items-center justify-center z-10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition duration-200 ease-in-out px-2 pt-1 pb-4 flex-col gap-3">
        <p className="font-bold text-lg lg:text-xl w-full text-center whitespace-normal llipsis-2-line h-14 items-center flex justify-center">
          {props.title}
        </p>
        <div className="flex gap-2 justify-between w-full px-2 lg:flex-col ">
          <Button
            type="alternative"
            onClick={() => setActiveModal(props.trailerUrl)}
            className="z-100 basis-1/2"
            fullWidth
          >
            Watch Trailer
          </Button>
          <Button
            type="alternative"
            onClick={() => router.push(`/schedule/${props.id}`)}
            className="z-100 basis-1/2"
            fullWidth
          >
            Get Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};
