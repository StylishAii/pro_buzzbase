import Image from "next/image";
import myLoader from "@app/utils/myLoader";

type UserImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  active: boolean;
};

export const UserImage = ({
  src,
  width,
  height,
  alt,
  active,
}: UserImageProps) => {
  return (
    <div>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={`rounded-full border-1.5 block aspect-square ${
          active ? "border-yellow-500" : "border-zinc-600"
        }`}
        loader={myLoader}
      />
    </div>
  );
};
