/**
 * Configuração centralizada da aplicação
 * 
 * Este arquivo contém todas as constantes de configuração do projeto,
 * facilitando customização e manutenção.
 */

export const APP_CONFIG = {
    // Informações da aplicação
    name: 'TechHub',
    tagline: 'Sua loja de tecnologia',
    description: 'Plataforma moderna de e-commerce para produtos de tecnologia',

    // Branding
    branding: {
        primaryColor: '#8B5CF6', // Purple-500
        accentColor: '#10B981', // Green-500
    },

    // Configurações de envio
    shipping: {
        provider: 'Entrega Expressa',
        freeShippingThreshold: 0, // R$ 0 = frete grátis sempre
        defaultShippingCost: 0,
        estimatedDeliveryDays: '5-7',
        coverage: 'todo o Brasil',
    },

    // Features habilitadas/desabilitadas
    features: {
        enableReviews: false,
        enableWishlist: false,
        enableCompare: false,
        enableNotifications: false,
        enableNewsletter: false,
    },

    // Textos da interface
    ui: {
        // Header
        menu: 'Menu',
        cart: 'Carrinho',

        // Auth
        login: 'Fazer Login',
        logout: 'Fazer Logout',
        welcomeMessage: 'Bem-vindo!',

        // Navigation
        home: 'Início',
        catalog: 'Catálogo',
        deals: 'Ofertas',
        orders: 'Meus Pedidos',

        // Cart
        emptyCart: 'Carrinho vazio. Vamos às compras?',
        addToCart: 'Adicionar ao carrinho',
        finishPurchase: 'Finalizar compra',

        // Product
        description: 'Descrição',
        recommended: 'Produtos Recomendados',

        // Pricing
        subtotal: 'Subtotal',
        discount: 'Desconto',
        shipping: 'Entrega',
        total: 'Total',
        freeShipping: 'GRÁTIS',
    },

    // Links de redes sociais (para footer futuro)
    social: {
        github: '',
        linkedin: '',
        twitter: '',
    },

    // Contato
    contact: {
        email: 'contato@techhub.com',
        phone: '',
    },
} as const;

// Type helper para autocomplete
export type AppConfig = typeof APP_CONFIG;
