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
}

export function StoreInfoSections({ description, address, whatsapp, instagram, facebook, schedule, storeName }: StoreInfoSectionsProps) {
    // Formatear horario si existe
    const renderSchedule = () => {
        if (!schedule) return null;
        try {
            // Asumiendo que schedule es un objeto { lunes: "09:00 - 18:00", ... }
            return (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                    {Object.entries(schedule).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                            <span className="capitalize text-slate-400">{day}:</span>
                            <span>{String(hours)}</span>
                        </div>
                    ))}
                </div>
            );
        } catch (e) {
            return <p className="text-xs text-slate-500 italic">Horarios de atención flexibles.</p>;
        }
    };

    return (
        <section className="bg-slate-50 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">

                {/* Nosotro / Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Nosotros</h2>
                            <div className="w-12 h-1.5 bg-primary-dynamic rounded-full" />
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed text-lg">
                            {description || `Bienvenidos a ${storeName}. Nos apasiona ofrecerte los mejores productos con la mejor calidad y atención.`}
                        </p>

                        {/* Service Icons (Generic highlights) */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
                                <Thermometer className="w-6 h-6 text-primary-dynamic" />
                                <span className="text-[10px] font-black uppercase text-slate-400">Congelados</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
                                <Calendar className="w-6 h-6 text-primary-dynamic" />
                                <span className="text-[10px] font-black uppercase text-slate-400">Pack Semanal</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
                                <Box className="w-6 h-6 text-primary-dynamic" />
                                <span className="text-[10px] font-black uppercase text-slate-400">Hermético</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Contacto</h3>
                            <div className="space-y-3">
                                {address && (
                                    <div className="flex items-start gap-3 text-sm">
                                        <MapPin className="w-4 h-4 text-primary-dynamic mt-0.5" />
                                        <span className="font-bold text-slate-700">{address}</span>
                                    </div>
                                )}
                                {whatsapp && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="w-4 h-4 text-primary-dynamic" />
                                        <span className="font-bold text-slate-700">{whatsapp}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-50">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Horarios</h3>
                            <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-primary-dynamic mt-0.5" />
                                <div className="flex-1">
                                    {renderSchedule() || <span className="text-sm font-bold text-slate-700 italic">Consultar horarios</span>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-slate-50">
                            {instagram && (
                                <a href={getSocialLink(instagram, 'instagram')} target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400 hover:text-pink-500 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {facebook && (
                                <a href={getSocialLink(facebook, 'facebook')} target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-500 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="pt-12 border-t border-slate-200 text-center flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-bold text-slate-400">© {new Date().getFullYear()} {storeName}. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Potenciado por</span>
                        <span className="text-sm font-black text-primary-dynamic tracking-tighter">VENDEXCHAT</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
