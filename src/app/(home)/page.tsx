import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import { serializeProducts } from "@/helpers/product";

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

  const monitors = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "monitors",
      },
    },
  });

  const headphones = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "headphones",
      },
    },
  });

  const mousepads = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mousepads",
      },
    },
  });

  const speakers = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "speakers",
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
        <ProductList products={serializeProducts(deals)} />
      </div>

      {/* Keyboards Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Teclados</SectionTitle>
        </div>
        <ProductList products={serializeProducts(keyboards)} />
      </div>

      {/* Mouses Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Mouses</SectionTitle>
        </div>
        <ProductList products={serializeProducts(mouses)} />
      </div>

      {/* Monitors Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Monitores</SectionTitle>
        </div>
        <ProductList products={serializeProducts(monitors)} />
      </div>

      {/* Headphones Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Fones</SectionTitle>
        </div>
        <ProductList products={serializeProducts(headphones)} />
      </div>

      {/* Mousepads Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Mousepads</SectionTitle>
        </div>
        <ProductList products={serializeProducts(mousepads)} />
      </div>

      {/* Speakers Section */}
      <div className="space-y-4">
        <div className="px-5 lg:px-8">
          <SectionTitle>Caixas de Som</SectionTitle>
        </div>
        <ProductList products={serializeProducts(speakers)} />
      </div>
    </div>
  );
}
