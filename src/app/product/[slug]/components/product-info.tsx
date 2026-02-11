"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice, SerializedProduct } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";
import { APP_CONFIG } from "@/config/app.config";

interface ProductInfoProps {
  product: ProductWithTotalPrice | SerializedProduct;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 99; // Quantidade máxima permitida

  const { addProductsToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => (prev >= MAX_QUANTITY ? MAX_QUANTITY : prev + 1));
  };

  const handleAddToCartClick = () => {
    addProductsToCart({
      ...product,
      basePrice: Number(product.basePrice),
      quantity
    });
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold ">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">{APP_CONFIG.ui.description}</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddToCartClick}
      >
        {APP_CONFIG.ui.addToCart}
      </Button>

      <div className="mt-2 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">{APP_CONFIG.shipping.provider}</span>
            </p>
            <p
              className="text-xs
text-[#8162FF]"
            >
              Envio para <span className="font-bold">{APP_CONFIG.shipping.coverage}</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">{APP_CONFIG.ui.freeShipping}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
