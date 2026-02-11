"use server";

import { CartProduct } from "@/providers/cart";
import { createCheckoutSchema } from "@/lib/validations/checkout";
import Stripe from "stripe";

/**
 * Cria uma sessão de checkout no Stripe
 * @param products - Lista de produtos do carrinho
 * @param orderId - ID do pedido criado
 * @returns Sessão de checkout do Stripe
 * @throws Error se a validação falhar ou houver erro no Stripe
 */
export const createCheckout = async (
  products: CartProduct[],
  orderId: string,
) => {
  try {
    // Validar variáveis de ambiente
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY não configurada");
    }

    if (!process.env.HOST_URL) {
      throw new Error("HOST_URL não configurada");
    }

    // Validar entrada
    const validatedData = createCheckoutSchema.parse({
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.quantity,
        totalPrice: p.totalPrice,
      })),
      orderId,
    });

    // Inicializar Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    // Criar sessão de checkout
    const checkout = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: process.env.HOST_URL,
      cancel_url: process.env.HOST_URL,
      metadata: {
        orderId: validatedData.orderId,
      },
      line_items: validatedData.products.map((product) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            description: products.find((p) => p.id === product.id)?.description || "",
            images: products.find((p) => p.id === product.id)?.imageUrls || [],
          },
          unit_amount: Math.round(product.totalPrice * 100),
        },
        quantity: product.quantity,
      })),
    });

    return checkout;
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);

    if (error instanceof Error) {
      throw new Error(`Erro ao criar checkout: ${error.message}`);
    }

    throw new Error("Erro desconhecido ao criar checkout");
  }
};

