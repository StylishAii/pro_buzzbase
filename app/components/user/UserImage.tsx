import Image from "next/image";

type UserImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const UserImage = ({ src, width, height, alt }: UserImageProps) => {
  return (
    <div>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="rounded-full border-1.5 border-zinc-600 block"
      />
    </div>
  );
};
