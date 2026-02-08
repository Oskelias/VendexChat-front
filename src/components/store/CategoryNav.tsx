import type { Category } from "../../types";
import "./CategoryNav.css";

interface Props {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryNav({ categories, activeId, onSelect }: Props) {
  const handleClick = (id: string | null) => {
    onSelect(id);
    if (id === null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(`category-${id}`);
      if (el) {
        const navHeight = 60;
        const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="category-nav">
      <div className="category-nav__inner">
        <button
          className={`category-nav__pill${activeId === null ? " category-nav__pill--active" : ""}`}
          onClick={() => handleClick(null)}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-nav__pill${activeId === cat.id ? " category-nav__pill--active" : ""}`}
            onClick={() => handleClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
