"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "@/lib/utils";
import { PackageIcon } from "lucide-react";
import { useState } from "react";

interface ProductItemProps {
  product: ProductWithTotalPrice;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "flex min-w-[156px] flex-col gap-4 transition-transform hover:scale-105",
        className
      )}
    >
      <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-accent transition-shadow hover:shadow-md">
        {!imageError ? (
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain transition-transform hover:scale-110"
            alt={product.name}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <PackageIcon className="h-16 w-16 text-primary/40" />
          </div>
        )}

        {product.discountPercentage > 0 && (
          <DiscountBadge className="absolute left-3 top-3">
            {product.discountPercentage}
          </DiscountBadge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>

        <div className="flex items-center gap-2 ">
          {product.discountPercentage > 0 ? (
            <>
              <p className="truncate font-semibold text-primary">
                R$ {product.totalPrice.toFixed(2)}
              </p>
              <p className="truncate text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="truncate text-sm font-semibold">
              R$ {Number(product.basePrice).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default ProductItem;
