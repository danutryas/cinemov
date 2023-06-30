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
    <div className="w-[285px] h-[412px] bg-[#313131] flex rounded-[14px] items-center justify-center text-white relative group hover:scale-105 transition duration-200 ease-in-out z-1">
      <Image
        src={props.imgUrl}
        className="w-full h-full object-cover absolute rounded-2xl group-hover:blur-sm group-hover:opacity-50 p-1 z-1 transition duration-200 ease-in-out cursor-pointer"
        alt="poster"
        onClick={() => router.push(`/schedule/${props.id}`)}
        width={285}
        height={412}
      />
      <div className="w-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out p-3 flex-col gap-2">
        <p className="font-bold text-xl w-full text-center whitespace-normal">
          {props.title}
        </p>
        <Button
          type="alternative"
          onClick={() => setActiveModal(props.trailerUrl)}
          className="z-100"
        >
          Watch Trailer
        </Button>
      </div>
    </div>
  );
};
