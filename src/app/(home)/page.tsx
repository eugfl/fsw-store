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
    <div className="flex flex-col gap-6 py-6">
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
      />

      <div className="px-5 lg:px-8">
        <Categories />
      </div>

      <div className="space-y-3">
        <div className="px-5 lg:px-8">
          <SectionTitle>Ofertas</SectionTitle>
        </div>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div className="space-y-3">
        <div className="px-5 lg:px-8">
          <SectionTitle>Teclados</SectionTitle>
        </div>
        <ProductList products={keyboards} />
      </div>

      <div>
        <PromoBanner
          src="/banner-home-03.png"
          alt="Até 20% de desconto em fones!"
        />
      </div>

      <div className="space-y-3">
        <div className="px-5 lg:px-8">
          <SectionTitle>Mouses</SectionTitle>
        </div>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
