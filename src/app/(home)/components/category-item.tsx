import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icons";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge
        variant="outline"
        className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 py-3 transition-all hover:scale-105 hover:from-primary/20 hover:to-primary/10 hover:shadow-md"
      >
        <div className="text-primary">
          {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        </div>
        <span className="text-xs font-bold">{category.name}</span>
      </Badge>
    </Link>
  );
};

export default CategoryItem;
