import { Search, MapPin, Instagram, Facebook, ShoppingCart } from "lucide-react";
import AssistantIcon from "../../components/icons/AssistantIcon";
import { getSocialLink } from "../../utils/format";

interface StoreHeaderProps {
    name: string;
    logo?: string;
    banner?: string;
    description?: string;
    address?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    totalItems: number;
    announcement?: string | null;
    onSearch: (q: string) => void;
    onChatClick: () => void;
    onCartClick: () => void;
}

export function StoreHeader({
    name, logo, banner, description, address, whatsapp, instagram, facebook, totalItems, announcement, onSearch, onChatClick, onCartClick
}: StoreHeaderProps) {
    return (
        <header className="bg-white">
            {/* Global Announcement Banner */}
            {announcement && (
                <div className="bg-indigo-600 text-white px-4 py-2.5 text-center relative overflow-hidden group">
                    <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-3 relative z-10">
                        <div className="p-1 bg-white/20 rounded-lg">
                            <AssistantIcon className="w-3.5 h-3.5 animate-pulse" />
                        </div>
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-none drop-shadow-sm">
                            {announcement}
                        </p>
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
            )}
            {/* Top Navigation Bar: Search & Icons */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-50 px-4 py-3 shadow-sm">
                <div className="max-w-[1440px] mx-auto flex items-center gap-3">
                    {/* Search Field */}
                    <div className="relative flex-1 max-w-sm group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-dynamic transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar productos o categorías..."
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary-dynamic/20 focus:border-primary-dynamic focus:bg-white transition-all placeholder:text-slate-400"
                        />
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-1.5">
                        {whatsapp && (
                            <button
                                onClick={onChatClick}
                                className="h-10 px-3 md:px-4 flex items-center gap-2 bg-primary-dynamic text-white rounded-xl transition-all shadow-lg shadow-primary-dynamic/20 hover:scale-105 active:scale-95"
                            >
                                <span className="relative inline-flex w-5 h-5 overflow-hidden rounded-md">
                                    <img src="/iconoVendexchat.png" alt="" className="absolute inset-0 w-full h-full object-cover scale-[1.45]" />
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Asistente IA</span>
                            </button>
                        )}
                        {instagram && (
                            <a href={getSocialLink(instagram, 'instagram')} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                        {facebook && (
                            <a href={getSocialLink(facebook, 'facebook')} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                        )}

                        {/* Cart Button */}
                        <button
                            onClick={onCartClick}
                            className="relative h-10 px-3 md:px-4 flex items-center gap-2 bg-primary-dynamic text-white rounded-xl shadow-lg shadow-primary-dynamic/20 hover:scale-105 active:scale-95 transition-all ml-1"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Pedido</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-primary-dynamic text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Store Information Banner */}
            <div className="relative h-40 md:h-56 bg-slate-200 overflow-hidden">
                {banner ? (
                    <img src={banner} alt={name} className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
                ) : (
                    <div className="w-full h-full bg-primary-dynamic flex items-center justify-center">
                        <span className="text-white font-black text-6xl opacity-20">{name}</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Store Profile Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl p-1 shadow-2xl flex-shrink-0 border-2 border-white overflow-hidden">
                        {logo ? (
                            <img src={logo} alt={name} className="w-full h-full object-cover rounded-[0.8rem]" loading="eager" decoding="async" />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 font-black text-xl uppercase">
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 pb-1">
                        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none drop-shadow-md">
                            {name}
                        </h1>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-white/90 uppercase tracking-widest mt-2 overflow-hidden whitespace-nowrap">
                            <MapPin className="w-3 h-3 text-primary-dynamic flex-shrink-0" />
                            <span className="truncate">{address || 'Envío a Domicilio'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Description */}
            <div className="max-w-[1440px] mx-auto px-4 pt-6 pb-2 hidden md:block">
                {description && (
                    <p className="text-sm text-slate-500 font-medium max-w-2xl border-l-4 border-primary-dynamic pl-4 py-1 italic">
                        {description}
                    </p>
                )}
            </div>
        </header>
    );
}
