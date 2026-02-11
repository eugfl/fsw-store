import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

/**
 * Produto serializado para Client Components
 * Usa number ao invés de Decimal para compatibilidade
 */
export interface SerializedProduct extends Omit<Product, "basePrice"> {
  basePrice: number;
  totalPrice: number;
}

export const computeProductTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    };
  }

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return {
    ...product,
    totalPrice: Number(product.basePrice) - totalDiscount,
  };
};

/**
 * Serializa um produto do Prisma para JSON (Client Components)
 * Converte Decimal para Number para evitar warnings
 */
export function serializeProduct(product: Product): SerializedProduct {
  return {
    ...product,
    basePrice: Number(product.basePrice),
    totalPrice: computeProductTotalPrice(product).totalPrice,
  };
}

/**
 * Serializa uma lista de produtos
 */
export function serializeProducts(products: Product[]): SerializedProduct[] {
  return products.map(serializeProduct);
}


