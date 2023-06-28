import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import Image from "next/image";
import { LuClapperboard } from "react-icons/lu";
import { LogoCinemov } from "../componentTypes";

const LogoCinemov = (props: LogoCinemov) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        {/* <MovieCreationIcon sx={{ color: "#83578F" }} /> */}
        {/* <LuClapperboard color="#83578F" size={36} /> */}
        <div className="-mt-1">
          <Image
            src={"/clapperboard.svg"}
            width={props.width}
            height={props.height}
            alt="cinemov"
            color="#83578F"
          />
        </div>
        {props.text ? (
          <p className="font-logo text-logo text-3xl font-normal">cinemov</p>
        ) : null}
      </div>
    </>
  );
};
export default LogoCinemov;
