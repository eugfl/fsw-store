"use client";

import Image, { ImageProps } from "next/image";
import { TagIcon, MousePointerClickIcon, HeadphonesIcon } from "lucide-react";
import { useState } from "react";
import BannerPlaceholder from "./banner-placeholder";

interface PromoBannerProps extends ImageProps {
  placeholderType?: "hero" | "mouses" | "headphones";
}

const PromoBanner = ({ alt, placeholderType = "hero", ...props }: PromoBannerProps) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Different placeholders based on banner type
    switch (placeholderType) {
      case "mouses":
        return (
          <BannerPlaceholder
            title="Mouses em Promoção"
            icon={MousePointerClickIcon}
            gradient="from-primary/25 via-accent/15 to-primary/10"
          />
        );
      case "headphones":
        return (
          <BannerPlaceholder
            title="Fones com Desconto"
            icon={HeadphonesIcon}
            gradient="from-accent/20 via-primary/15 to-accent/10"
          />
        );
      default:
        return (
          <BannerPlaceholder
            title="Ofertas Especiais"
            icon={TagIcon}
            gradient="from-primary/30 via-primary/15 to-accent/20"
          />
        );
    }
  }

  return (
    <Image
      height={0}
      width={0}
      className="h-auto w-full object-cover"
      sizes="100vw"
      alt={alt}
      style={{ maxHeight: "200px" }}
      onError={() => setImageError(true)}
      {...props}
    />
  );
};

export default PromoBanner;
