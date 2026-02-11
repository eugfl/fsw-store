/**
 * Valida as variáveis de ambiente necessárias para a aplicação
 * @throws Error se alguma variável obrigatória estiver faltando
 */
export function validateEnv() {
    const requiredEnvVars = [
        "DATABASE_URL",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "NEXTAUTH_SECRET",
        "STRIPE_SECRET_KEY",
        "NEXT_PUBLIC_STRIPE_PUBLIC_KEY",
    ];

    const missingVars = requiredEnvVars.filter(
        (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
        throw new Error(
            `Variáveis de ambiente faltando: ${missingVars.join(", ")}`
        );
    }

    // Validar formato das chaves Stripe
    if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_")) {
        throw new Error("STRIPE_SECRET_KEY deve começar com 'sk_'");
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY?.startsWith("pk_")) {
        throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY deve começar com 'pk_'");
    }

    console.log("✅ Variáveis de ambiente validadas com sucesso");
}
