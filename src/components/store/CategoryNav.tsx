import type { Category } from "../../types";
import "./CategoryNav.css";

interface Props {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function CategoryNav({ categories, activeId, onSelect }: Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <nav className="category-nav">
      <div className="category-nav__list">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-nav__item ${activeId === cat.id ? "category-nav__item--active" : ""}`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
