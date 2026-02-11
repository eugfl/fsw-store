"use client";

import { ProductWithTotalPrice, SerializedProduct } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

/**
 * Produto no carrinho com quantidade
 * Aceita tanto ProductWithTotalPrice (Decimal) quanto SerializedProduct (number)
 */
export interface CartProduct extends Omit<ProductWithTotalPrice | SerializedProduct, 'quantity'> {
  quantity: number;
  basePrice: number;
  totalPrice: number;
}

/**
 * Interface do contexto do carrinho
 */
interface ICartContext {
  /** Lista de produtos no carrinho */
  products: CartProduct[];
  /** Total com descontos aplicados */
  total: number;
  /** Subtotal sem descontos */
  subtotal: number;
  /** Total de desconto aplicado */
  totalDiscount: number;
  /** Adiciona produto ao carrinho ou incrementa quantidade se já existir */
  addProductsToCart: (product: CartProduct) => void;
  /** Diminui quantidade de um produto (remove se quantidade = 1) */
  decreaseProductQuantity: (productId: string) => void;
  /** Aumenta quantidade de um produto */
  increaseProductQuantity: (productId: string) => void;
  /** Remove produto do carrinho */
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  addProductsToCart: () => { },
  decreaseProductQuantity: () => { },
  increaseProductQuantity: () => { },
  removeProductFromCart: () => { },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@fsw-store/cart-products") || "[]"),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products));
  }, [products]);

  // Total sem descontos
  const subtotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [products]);

  // Total com descontos
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = subtotal - total;

  /**
   * Adiciona produto ao carrinho
   * Se o produto já existir, incrementa a quantidade
   * @param product - Produto a ser adicionado
   */
  const addProductsToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
      return;
    }

    // Adiciona novo produto ao carrinho
    setProducts((prev) => [...prev, product]);
  };

  /**
   * Diminui quantidade de um produto
   * Remove do carrinho se quantidade chegar a 0
   * @param productId - ID do produto
   */
  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  /**
   * Aumenta quantidade de um produto
   * @param productId - ID do produto
   */
  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  /**
   * Remove produto do carrinho
   * @param productId - ID do produto
   */
  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductsToCart,
        total,
        subtotal,
        totalDiscount,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
