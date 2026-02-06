import type { Category } from "../../types";
import { ProductCard } from "./ProductCard";
import "./CategorySection.css";

interface Props {
  category: Category;
}

export function CategorySection({ category }: Props) {
  if (category.products.length === 0) return null;

  return (
    <section className="category-section" id={`category-${category.id}`}>
      <h2 className="category-section__title">{category.name}</h2>
      <div className="category-section__grid">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
