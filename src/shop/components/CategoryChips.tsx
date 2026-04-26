import { Menu } from "lucide-react";

interface Category {
    id: string | number;
    name: string;
}

interface CategoryChipsProps {
    categories: Category[];
    activeId: string | number | null;
    onSelect: (id: string | number | null) => void;
    onMenuClick: () => void;
}

export function CategoryChips({ categories, activeId, onSelect, onMenuClick }: CategoryChipsProps) {
    const sorted = [...categories].sort((a, b) => a.name.localeCompare(b.name));
    const showMenu = sorted.length > 6;
    const displayCategories = showMenu ? sorted.slice(0, 5) : sorted;

    return (
        <div className="bg-white border-b border-slate-100 overflow-x-auto no-scrollbar flex items-center shadow-sm">
            <div className="flex px-4 mx-auto divide-x divide-slate-100 max-w-[1440px] w-full md:justify-center">
                {showMenu && (
                    <button
                        onClick={onMenuClick}
                        className="flex flex-col items-center justify-center px-6 py-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all text-slate-400 hover:text-primary-dynamic hover:bg-slate-50/50 group"
                    >
                        <div className="flex items-center gap-2">
                            <Menu size={14} className="group-hover:scale-110 transition-transform" />
                            <span>Menu</span>
                        </div>
                    </button>
                )}

                {displayCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`whitespace-nowrap px-6 py-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all relative ${activeId === cat.id
                            ? "text-primary-dynamic bg-slate-50"
                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
                            }`}
                    >
                        {cat.name}
                        {activeId === cat.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-dynamic rounded-t-full shadow-[0_-2px_8px_var(--primary-color)] opacity-30" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

