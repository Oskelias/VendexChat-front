import { Megaphone, X } from "lucide-react";
import { useState } from "react";

interface GlobalAnnouncementProps {
    announcement?: string | null;
}

export function GlobalAnnouncement({ announcement }: GlobalAnnouncementProps) {
    const [visible, setVisible] = useState(true);

    if (!announcement || !visible) return null;

    return (
        <div className="bg-indigo-600 text-white py-2.5 px-4 relative z-[60] overflow-hidden">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 animate-in slide-in-from-top duration-500">
                <Megaphone className="w-4 h-4 shrink-0 opacity-90" />
                <p className="text-xs font-bold text-center pr-6">
                    {announcement}
                </p>
                <button
                    onClick={() => setVisible(false)}
                    className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        </div>
    );
}
