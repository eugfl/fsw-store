import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      height={0}
      width={0}
      className="h-auto w-full object-cover"
      sizes="100vw"
      alt={alt}
      style={{ maxHeight: "200px" }}
      {...props}
    />
  );
};

export default PromoBanner;
