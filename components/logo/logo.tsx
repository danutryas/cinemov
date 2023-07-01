import Image from "next/image";
import { LogoCinemov } from "../componentTypes";

const LogoCinemov = (props: LogoCinemov) => {
  return (
    <>
      <div className="flex flex-row items-center gap-3">
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
          <p className="font-logo text-logo text-5xl font-normal">cinemov</p>
        ) : null}
      </div>
    </>
  );
};
export default LogoCinemov;
