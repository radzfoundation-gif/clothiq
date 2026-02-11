"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: "signin" | "signup";
}

import { createClient } from "@/utils/supabase/client";

export default function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
    const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const supabase = createClient();

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setMode(initialMode);
            setMessage(null);
            setEmail("");
            setPassword("");
        } else {
            setTimeout(() => setIsVisible(false), 300); // Wait for animation
        }
    }, [isOpen, initialMode]);

    if (!isVisible && !isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (mode === "signin") {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage({ type: "success", text: "Logged in successfully!" });
                setTimeout(onClose, 1000);
            } else if (mode === "signup") {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;
                setMessage({ type: "success", text: "Check your email to confirm your account!" });
            } else if (mode === "forgot") {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${location.origin}/auth/callback?next=/update-password`,
                });
                if (error) throw error;
                setMessage({ type: "success", text: "Password reset link sent to your email!" });
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "An error occurred." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-md bg-white/90 dark:bg-[#1c1c1c]/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl transform transition-all duration-500 border border-white/20 overflow-hidden ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"}`}
            >
                {/* Subtle Noise Texture */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-overlay"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                    }}
                />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 text-primary/30 hover:text-primary dark:text-white/30 dark:hover:text-white transition-colors"
                >
                    <span className="material-icons">close</span>
                </button>

                <div className="relative z-10 mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 dark:bg-white/5 mb-4 animate-bounce-slow">
                        <span className="material-icons text-primary dark:text-white text-2xl">diamond</span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary dark:text-white mb-2 tracking-tight">
                        {mode === "signin" && "Welcome back"}
                        {mode === "signup" && "Create an account"}
                        {mode === "forgot" && "Reset password"}
                    </h2>
                    <p className="text-sm text-primary/60 dark:text-white/60">
                        {mode === "signin" && "Enter your details to access your account"}
                        {mode === "signup" && "Start your virtual try-on journey today"}
                        {mode === "forgot" && "We'll send you a link to reset it"}
                    </p>
                </div>

                {message && (
                    <div className={`relative z-10 mb-6 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-xs font-bold text-primary/60 dark:text-white/60 mb-1.5 ml-1 uppercase tracking-wider transition-colors group-focus-within:text-primary">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-primary/10 dark:border-white/10 focus:border-primary/40 focus:bg-white dark:focus:bg-black/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-primary/20"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {mode !== "forgot" && (
                            <div className="group">
                                <div className="flex justify-between items-center mb-1.5 ml-1">
                                    <label className="block text-xs font-bold text-primary/60 dark:text-white/60 uppercase tracking-wider transition-colors group-focus-within:text-primary">Password</label>
                                    {mode === "signin" && (
                                        <button
                                            type="button"
                                            onClick={() => { setMode("forgot"); setMessage(null); }}
                                            className="text-xs font-semibold text-primary/50 hover:text-primary transition-colors hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-primary/10 dark:border-white/10 focus:border-primary/40 focus:bg-white dark:focus:bg-black/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-primary/20"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/15 hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {mode === "signin" && "Sign In"}
                                {mode === "signup" && "Create Account"}
                                {mode === "forgot" && "Send Reset Link"}
                            </>
                        )}
                    </button>
                </form>

                <div className="relative z-10 mt-8 text-center text-sm text-primary/50 dark:text-white/50">
                    {mode === "signin" ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                onClick={() => { setMode("signup"); setMessage(null); }}
                                className="font-semibold text-primary dark:text-white hover:underline decoration-2 underline-offset-4 transition-all"
                            >
                                Sign up free
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => { setMode("signin"); setMessage(null); }}
                                className="font-semibold text-primary dark:text-white hover:underline decoration-2 underline-offset-4 transition-all"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
