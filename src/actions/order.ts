"use server";

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";
import { createOrderSchema } from "@/lib/validations/checkout";

/**
 * Cria um novo pedido no banco de dados
 * @param cartProducts - Produtos do carrinho
 * @param userId - ID do usuário autenticado
 * @returns Pedido criado
 * @throws Error se a validação falhar ou houver erro no banco
 */
export const createOrder = async (
  cartProducts: CartProduct[],
  userId: string,
) => {
  try {
    // Validar entrada
    const validatedData = createOrderSchema.parse({
      cartProducts: cartProducts.map((p) => ({
        id: p.id,
        quantity: p.quantity,
        basePrice: Number(p.basePrice),
        discountPercentage: p.discountPercentage,
      })),
      userId,
    });

    // Verificar se todos os produtos existem
    const productIds = validatedData.cartProducts.map((p) => p.id);
    const existingProducts = await prismaClient.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });

    if (existingProducts.length !== productIds.length) {
      throw new Error("Um ou mais produtos não foram encontrados");
    }

    // Criar pedido
    const order = await prismaClient.order.create({
      data: {
        userId: validatedData.userId,
        status: "WAITING_FOR_PAYMENT",
        orderProducts: {
          createMany: {
            data: validatedData.cartProducts.map((product) => ({
              basePrice: product.basePrice,
              discountPercentage: product.discountPercentage,
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error("[ORDER_ERROR]", error);

    if (error instanceof Error) {
      throw new Error(`Erro ao criar pedido: ${error.message}`);
    }

    throw new Error("Erro desconhecido ao criar pedido");
  }
};

