import { access } from "fs";
import Image from "next/image";

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
        className={`rounded-full border-1.5 block ${
          active ? "border-yellow-500" : "border-zinc-600"
        }`}
      />
    </div>
  );
};
