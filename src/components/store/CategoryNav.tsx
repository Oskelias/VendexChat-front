import type { Category } from "../../types";
import "./CategoryNav.css";

interface Props {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
  vertical?: boolean;
}

export function CategoryNav({ categories, activeId, onSelect, vertical = false }: Props) {
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

  if (vertical) {
    return (
      <div className="category-sidebar">
        <button
          className={`category-sidebar__item${activeId === null ? " category-sidebar__item--active" : ""}`}
          onClick={() => handleClick(null)}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-sidebar__item${activeId === cat.id ? " category-sidebar__item--active" : ""}`}
            onClick={() => handleClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    );
  }

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
