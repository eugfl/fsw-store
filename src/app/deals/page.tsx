import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { serializeProduct } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";
import { APP_CONFIG } from "@/config/app.config";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="flex flex-col gap-5 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <PercentIcon size={16} />
        {APP_CONFIG.ui.deals}
      </Badge>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={serializeProduct(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
