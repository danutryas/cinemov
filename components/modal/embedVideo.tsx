import { useModal } from "@/lib/hooks/useModal";
import Button from "../button/button";
import { useCallback, useEffect } from "react";

type EmbedVideoProps = {
  src: string;
};

const EmbedVideo = ({ src }: EmbedVideoProps) => {
  const { isActiveModal } = useModal();

  return (
    <div
      className={`${
        isActiveModal ? "fixed" : "hidden"
      } h-[90vh] w-10/12 z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center`}
    >
      <div className="w-full h-full text-white p-2 flex  gap-2 ">
        <iframe
          width="100%"
          height="100%"
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};
export default EmbedVideo;
