"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function WaitlistPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const honeypot = formData.get('hp_name'); // Check honeypot

            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, honeypot }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (data.message) {
                if (data.message === "You are already on the list!") {
                    setMessage({ type: "error", text: "This email is already on the waitlist." });
                    // Do not setSubmitted(true) so the user sees the warning on the form
                } else {
                    setSubmitted(true);
                }
            }
        } catch (error: any) {
            console.error("Error joining waitlist:", error);
            setMessage({ type: "error", text: error.message || "Something went wrong. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white relative flex flex-col">
            {/* Noise Texture */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "#ffffff",
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Navbar (Simplified) */}
            <nav className="w-full px-6 py-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto relative z-50">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="material-icons text-primary dark:text-white text-2xl">diamond</span>
                    <span className="text-xl font-bold tracking-tight text-primary dark:text-white">ClothIQ</span>
                </Link>
            </nav>

            {/* Content */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10 -mt-20">
                <div className="max-w-md w-full">
                    <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/10 border border-primary/10 dark:border-white/10 shadow-sm opacity-0 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 dark:text-white/80">Early Access</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary dark:text-white mb-6 opacity-0 animate-fade-in-up delay-100">
                        Join the movement.
                    </h1>

                    <p className="text-lg text-primary/60 dark:text-white/60 mb-10 opacity-0 animate-fade-in-up delay-200">
                        Be the first to experience the future of virtual fashion. Limited spots available for our beta.
                    </p>

                    {submitted ? (
                        <div className="bg-green-50 text-green-800 p-6 rounded-2xl border border-green-100 animate-fade-in-up opacity-0 delay-300 fill-forwards">
                            <span className="material-icons text-4xl mb-2">check_circle</span>
                            <p className="font-semibold text-lg">
                                {message?.text === "You are already on the list!" ? "You're already on the list!" : "You're on the list!"}
                            </p>
                            <p className="text-sm opacity-80">We'll notify you when your spot is ready.</p>
                            <Link href="/" className="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-green-900">
                                Back to home
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 opacity-0 animate-fade-in-up delay-300">
                            {message && (
                                <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {message.text}
                                </div>
                            )}
                            <div className="relative">
                                {/* Honeypot - Hidden from real users */}
                                <input
                                    type="text"
                                    name="hp_name"
                                    style={{ display: 'none' }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full px-6 py-4 rounded-xl bg-white border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/5 outline-none transition-all placeholder:text-primary/30"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Join Waitlist
                                        <span className="material-icons text-xl">arrow_forward</span>
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-primary/40 mt-2">
                                No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-8 text-center text-sm text-primary/30 relative z-10">
                © 2023 ClothIQ Inc.
            </footer>
        </div>
    );
}
