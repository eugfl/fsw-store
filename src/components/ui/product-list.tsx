import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice, SerializedProduct, serializeProduct } from "@/helpers/product";
import { Product } from "@prisma/client";
interface ProductListProps {
  products: Product[] | SerializedProduct[];
}
const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="relative">
      <div className="flex w-full gap-4 overflow-x-auto px-5 pb-3 lg:px-8 scrollbar-thin">
        {products.map((product) => {
          // Se já é SerializedProduct, usa direto, senão serializa
          const serializedProduct = 'totalPrice' in product
            ? product
            : serializeProduct(product as Product);

          return (
            <ProductItem
              key={product.id}
              product={serializedProduct}
              className="w-[170px] flex-shrink-0"
            />
          );
        })}
      </div>
    </div>
  );
};
export default ProductList;
