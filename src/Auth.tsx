import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState("");

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage("¡Registro exitoso! Revisa tu email para confirmar.");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
        } catch (error: any) {
            setMessage(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container glass-panel" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
            <h2>{isSignUp ? "Registrarse" : "Iniciar Sesión"}</h2>
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: 'white' }}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: 'white' }}
                />
                <button type="submit" className="primary" disabled={loading}>
                    {loading ? "Cargando..." : isSignUp ? "Registrarse" : "Ingresar"}
                </button>
            </form>
            {message && <p style={{ marginTop: '1rem', color: isSignUp ? '#10b981' : '#ef4444' }}>{message}</p>}
            <button
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ marginTop: '1rem', background: 'none', color: '#646cff', textDecoration: 'underline', padding: 0 }}
            >
                {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Registrate"}
            </button>
        </div>
    );
}
