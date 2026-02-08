import type { Category } from "../../types";
import { ProductCard } from "./ProductCard";
import "./CategorySection.css";

interface Props {
  category: Category;
}

export function CategorySection({ category }: Props) {
  const products = category.products ?? [];
  if (products.length === 0) return null;

  return (
    <section className="category-section" id={`category-${category.id}`}>
      <div className="category-section__header">
        <h2 className="category-section__title">{category.name}</h2>
        <span className="category-section__count">
          {products.length}
        </span>
      </div>
      <div className="category-section__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
