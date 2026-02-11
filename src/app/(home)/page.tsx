import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Hero Banner */}
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
        placeholderType="hero"
      />

      {/* Categories */}
      <div className="px-5 lg:px-8">
        <Categories />
      </div>

      {/* Banner Grid - Kabum Style */}
      <div className="grid grid-cols-1 gap-4 px-5 md:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-lg">
          <PromoBanner
            src="/banner-home-02.png"
            alt="Até 55% de desconto em mouses!"
            placeholderType="mouses"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <PromoBanner
            src="/banner-home-03.png"
            alt="Até 20% de desconto em fones!"
            placeholderType="headphones"
          />
        </div>
      </div>

      {/* Deals Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Ofertas</SectionTitle>
        </div>
        <ProductList products={deals} />
      </div>

      {/* Keyboards Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Teclados</SectionTitle>
        </div>
        <ProductList products={keyboards} />
      </div>

      {/* Mouses Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Mouses</SectionTitle>
        </div>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
