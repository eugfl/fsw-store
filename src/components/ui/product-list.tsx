import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
interface ProductListProps {
  products: Product[];
}
const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="relative">
      <div className="flex w-full gap-4 overflow-x-auto px-5 pb-3 lg:px-8 scrollbar-thin">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
            className="w-[170px] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
