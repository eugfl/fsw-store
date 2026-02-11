import { z } from "zod";

/**
 * Schema de validação para criação de checkout no Stripe
 */
export const createCheckoutSchema = z.object({
    products: z
        .array(
            z.object({
                id: z.string().uuid("ID do produto deve ser um UUID válido"),
                name: z.string().min(1, "Nome do produto é obrigatório"),
                quantity: z.number().int().positive("Quantidade deve ser positiva"),
                totalPrice: z.number().positive("Preço total deve ser positivo"),
            })
        )
        .min(1, "Pelo menos um produto é necessário"),
    orderId: z.string().uuid("ID do pedido deve ser um UUID válido"),
});

/**
 * Schema de validação para criação de pedido
 */
export const createOrderSchema = z.object({
    cartProducts: z
        .array(
            z.object({
                id: z.string().uuid("ID do produto deve ser um UUID válido"),
                quantity: z
                    .number()
                    .int()
                    .positive("Quantidade deve ser positiva")
                    .max(99, "Quantidade máxima é 99"),
                basePrice: z.number().positive("Preço base deve ser positivo"),
                discountPercentage: z
                    .number()
                    .int()
                    .min(0, "Desconto não pode ser negativo")
                    .max(100, "Desconto não pode ser maior que 100%"),
            })
        )
        .min(1, "Carrinho não pode estar vazio"),
    userId: z.string().min(1, "ID do usuário é obrigatório"),
});

/**
 * Schema de validação para variáveis de ambiente
 */
export const envSchema = z.object({
    DATABASE_URL: z.string().url("DATABASE_URL deve ser uma URL válida"),
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID é obrigatório"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET é obrigatório"),
    NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET é obrigatório"),
    STRIPE_SECRET_KEY: z.string().startsWith("sk_", "STRIPE_SECRET_KEY inválida"),
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z
        .string()
        .startsWith("pk_", "STRIPE_PUBLIC_KEY inválida"),
    HOST_URL: z.string().url("HOST_URL deve ser uma URL válida").optional(),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type EnvConfig = z.infer<typeof envSchema>;
