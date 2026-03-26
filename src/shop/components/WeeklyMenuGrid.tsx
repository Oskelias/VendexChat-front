import { useState, useMemo } from 'react'
import { Plus, Minus, Calendar, Info, CheckCircle2 } from 'lucide-react'
import type { Product, Category } from '../../types'
import { useCartState } from '../state/useCartStore'
import { formatPrice } from '../../utils/format'

interface WeeklyMenuGridProps {
    categories: Category[]
    primaryColor: string
    onItemClick?: (product: Product) => void
    currency?: string
}

const DAYS = [
    { id: 'Lunes', label: 'Lunes' },
    { id: 'Martes', label: 'Martes' },
    { id: 'Miércoles', label: 'Miércoles' },
    { id: 'Jueves', label: 'Jueves' },
    { id: 'Viernes', label: 'Viernes' },
]

export function WeeklyMenuGrid({ categories, primaryColor, currency = 'ARS' }: WeeklyMenuGridProps) {
    const { addItem, updateQuantity, getItemQuantity } = useCartState()
    const [activeDay, setActiveDay] = useState(DAYS[0].id)

    const allProducts = useMemo(() => categories.flatMap(cat => cat.products || []), [categories])

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Day Selector Tabs */}
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4">
                {DAYS.map((day) => {
                    const isActive = activeDay === day.id
                    const dayItemsCount = allProducts.reduce((sum, p) => sum + getItemQuantity(p.id, day.id), 0)

                    return (
                        <button
                            key={day.id}
                            onClick={() => setActiveDay(day.id)}
                            className={`flex flex-col items-center min-w-[80px] px-4 py-3 rounded-2xl transition-all border-2 ${isActive
                                ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200'
                                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest">{day.label}</span>
                            {dayItemsCount > 0 && (
                                <span className={`mt-1 text-[9px] font-black px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {dayItemsCount}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Warning / Info */}
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2rem] flex gap-4 items-start">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Planificador Semanal Corporativo</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Seleccioná los platos para cada día de la semana. Tus pedidos se agruparán automáticamente por fecha de entrega.
                    </p>
                </div>
            </div>

            {/* Product List for Active Day */}
            <div className="space-y-12">
                {categories.map((cat) => (
                    <section key={cat.id}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">{cat.name}</h2>
                            <div className="h-[1px] flex-1 bg-slate-100" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(cat.products || []).map((p) => {
                                const qty = getItemQuantity(p.id, activeDay)

                                return (
                                    <div
                                        key={p.id}
                                        onClick={() => onItemClick?.(p)}
                                        className={`group relative bg-white border-2 rounded-[2rem] p-5 transition-all flex items-center gap-4 cursor-pointer ${qty > 0 ? 'border-slate-900 shadow-xl shadow-slate-100' : 'border-slate-50 hover:border-slate-200'
                                            }`}
                                    >
                                        {p.image_url && (
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                                                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xs font-black text-slate-900 truncate uppercase mt-1">{p.name}</h3>
                                            <p className="text-xs font-black text-slate-400 mt-0.5">{formatPrice(p.price, currency)}</p>
                                        </div>

                                        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl">
                                            {qty > 0 ? (
                                                <>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, qty - 1, activeDay); }}
                                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-xl text-slate-400 hover:text-rose-500 transition-colors shadow-sm"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-xs font-black text-slate-900 w-4 text-center">{qty}</span>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, qty + 1, activeDay); }}
                                                        className="w-8 h-8 flex items-center justify-center bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); addItem(p, activeDay); }}
                                                    className="px-4 py-2 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 hover:border-slate-900 transition-all flex items-center gap-2"
                                                >
                                                    <Plus className="w-3 h-3" /> Agregar
                                                </button>
                                            )}
                                        </div>

                                        {qty > 0 && (
                                            <div className="absolute -top-2 -right-2 bg-slate-900 text-white p-1 rounded-full shadow-lg">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
