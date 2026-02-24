import { MapPin, Phone, Instagram, Facebook, Clock, Thermometer, Box, Calendar } from "lucide-react";
import { getSocialLink } from "../../utils/format";

interface StoreInfoSectionsProps {
    description?: string | null;
    address?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    schedule?: any | null;
    storeName: string;
    metadata?: any;
    footerMessage?: string | null;
}

export function StoreInfoSections({ description, address, whatsapp, instagram, facebook, schedule, storeName, metadata, footerMessage }: StoreInfoSectionsProps) {
    // Lógica para resumir horarios
    const getSummarizedSchedule = () => {
        if (!schedule) return "Consultar horarios";

        const daysShort = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

        const getHoursStr = (dayKey: string) => {
            const dayData = schedule[dayKey];
            if (!dayData || !dayData.open) return "Cerrado";
            const interval = dayData.intervals?.[0];
            if (!interval) return "Cerrado";
            if (interval.start === "00:00" && interval.end === "23:59") return "24hs";
            return `${interval.start} a ${interval.end}hs`;
        };

        const groups: { days: number[], hours: string }[] = [];
        for (let i = 0; i < 7; i++) {
            const hours = getHoursStr(daysShort[i]);
            if (groups.length > 0 && groups[groups.length - 1].hours === hours) {
                groups[groups.length - 1].days.push(i);
            } else {
                groups.push({ days: [i], hours });
            }
        }

        return groups.map(group => {
            const startDay = dayNames[group.days[0]];
            const endDay = dayNames[group.days[group.days.length - 1]];
            const dayRange = group.days.length > 1 ? `${startDay} a ${endDay}` : startDay;
            return `${dayRange} ${group.hours}`;
        }).join(", ");
    };

    return (
        <section className="bg-slate-50 border-t border-slate-100">
            {/* Banner de Horario de Atención con Color de Marca y Degradado Sutil */}
            <div className="bg-primary-dynamic relative overflow-hidden py-6 px-4">
                {/* Capa de degradado sobre el color de marca */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
                    <h3 className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Horario de Atención</h3>
                    <div className="flex items-center gap-2.5 text-white">
                        <Clock className="w-4 h-4 flex-shrink-0 opacity-80" />
                        <span className="text-lg md:text-xl font-bold tracking-tight">
                            {getSummarizedSchedule()}
                        </span>
                    </div>
                </div>
                {/* Icono de Reloj Gigante de Fondo */}
                <Clock className="absolute top-1/2 -left-8 -translate-y-1/2 w-40 h-40 text-white/5 -rotate-12" />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
                {/* Nosotros & Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Nosotros</h2>
                            <div className="w-10 h-1 bg-primary-dynamic rounded-full" />
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed text-base italic border-l-4 border-slate-100 pl-4">
                            {description || `Bienvenidos a ${storeName}. Nos apasiona ofrecerte los mejores productos con la mejor calidad y atención.`}
                        </p>

                        {/* Secondary Description (Dynamic) */}
                        {metadata?.description_secondary && (
                            <p className="text-slate-400 font-semibold leading-relaxed text-sm pl-4">
                                {metadata.description_secondary}
                            </p>
                        )}

                        {/* Service Icons (Dynamic or Fallback) */}
                        <div className="flex gap-3 pt-2">
                            {(metadata?.highlights || [
                                { icon: 'Thermometer', label: 'Congelados' },
                                { icon: 'Calendar', label: 'Pack Semanal' },
                                { icon: 'Box', label: 'Hermético' }
                            ]).map((highlight: any, idx: number) => {
                                const IconComponent = (highlight.icon === 'Thermometer' ? Thermometer :
                                    highlight.icon === 'Calendar' ? Calendar :
                                        highlight.icon === 'Box' ? Box :
                                            highlight.icon === 'Clock' ? Clock :
                                                highlight.icon === 'MapPin' ? MapPin :
                                                    highlight.icon === 'Phone' ? Phone : Box);

                                return (
                                    <div key={idx} className="flex-1 flex flex-col items-center p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-center space-y-1">
                                        <IconComponent className="w-5 h-5 text-primary-dynamic" />
                                        <span className="text-[9px] font-black uppercase text-slate-400">{highlight.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Donde Encontrarnos</h3>
                            <div className="space-y-2.5">
                                {address && (
                                    <div className="flex items-start gap-2.5 text-sm">
                                        <MapPin className="w-4 h-4 text-primary-dynamic mt-0.5 flex-shrink-0" />
                                        <span className="font-bold text-slate-700">{address}</span>
                                    </div>
                                )}
                                {whatsapp && (
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Phone className="w-4 h-4 text-primary-dynamic flex-shrink-0" />
                                        <span className="font-bold text-slate-700">{whatsapp}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-50">
                            {instagram && (
                                <a href={getSocialLink(instagram, 'instagram')} target="_blank" rel="noreferrer" className="w-9 h-9 bg-slate-50 flex items-center justify-center rounded-lg text-slate-400 hover:text-pink-500 transition-colors">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            )}
                            {facebook && (
                                <a href={getSocialLink(facebook, 'facebook')} target="_blank" rel="noreferrer" className="w-9 h-9 bg-slate-50 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                                    <Facebook className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Nuestra Historia / Long Description */}
                {metadata?.description_long && (
                    <div className="pt-10 border-t border-slate-100">
                        <div className="space-y-4 max-w-2xl mx-auto text-center">
                            <div className="space-y-1 flex flex-col items-center">
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Nuestra Historia</h2>
                                <div className="w-8 h-1 bg-primary-dynamic rounded-full" />
                            </div>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm whitespace-pre-wrap">
                                {metadata.description_long}
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer Copyright */}
                <div className="pt-8 border-t border-slate-200 text-center flex flex-col items-center gap-4">
                    {footerMessage && (
                        <p className="text-sm font-bold text-slate-500 italic max-w-lg">
                            {footerMessage}
                        </p>
                    )}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">© {new Date().getFullYear()} VENDExChat.</p>
                        <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all text-slate-400 hover:text-slate-600">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Potenciado por</span>
                            <span className="text-xs font-black tracking-tighter italic">@InteliarStack</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
