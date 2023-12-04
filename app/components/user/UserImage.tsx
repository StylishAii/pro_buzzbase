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
      <Image src={src} width={width} height={height} alt={alt} />
    </div>
  );
};
