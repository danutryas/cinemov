import Image from "next/image";
import { IAvatar } from "../componentTypes";

const Avatar = ({ imgSrc, height = 40, width = 40 }: IAvatar) => {
  return (
    <>
      <Image
        src={imgSrc ? imgSrc : "/blank.png"}
        className="w-10 rounded-full"
        alt="Blank Image"
        width={width}
        height={height}
      />
    </>
  );
};
export default Avatar;
