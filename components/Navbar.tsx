"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "./AuthModal";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const openAuth = (mode: "signin" | "signup") => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setIsMenuOpen(false);
        router.refresh();
    };

    return (
        <>
            <nav className="w-full px-6 py-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto relative z-50">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="material-icons text-primary dark:text-white text-2xl">diamond</span>
                    <span className="text-xl font-bold tracking-tight text-primary dark:text-white">ClothIQ</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 bg-white/50 dark:bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-primary/5 dark:border-white/10 shadow-sm">
                    <Link
                        href="/how-it-works"
                        className={`text-sm font-medium transition-colors ${pathname === '/how-it-works' ? 'text-primary dark:text-white' : 'text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white'}`}
                    >
                        How it works
                    </Link>
                    <Link
                        href="/pricing"
                        className={`text-sm font-medium transition-colors ${pathname === '/pricing' ? 'text-primary dark:text-white' : 'text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white'}`}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/experience"
                        className={`text-sm font-medium transition-colors ${pathname === '/experience' ? 'text-primary dark:text-white' : 'text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white'}`}
                    >
                        Try It Now
                    </Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-primary/10 bg-white/50 hover:bg-white transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gray-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                                    {user.email?.[0]}
                                </div>
                                <span className="text-sm font-medium text-primary dark:text-white hidden sm:block max-w-[100px] truncate">
                                    {user.email?.split('@')[0]}
                                </span>
                                <span className="material-icons text-primary/50 text-lg">expand_more</span>
                            </button>

                            {isMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1c1c1c] rounded-xl shadow-xl border border-primary/5 dark:border-white/10 py-1 z-20 overflow-hidden animate-fade-in-up">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5">
                                            <p className="text-xs text-primary/50 dark:text-white/50">Signed in as</p>
                                            <p className="text-sm font-bold text-primary dark:text-white truncate">{user.email}</p>
                                        </div>
                                        <Link href="/experience" className="block px-4 py-2.5 text-sm text-primary/70 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white transition-colors">
                                            Try It Now
                                        </Link>
                                        <Link href="/profile" className="block px-4 py-2.5 text-sm text-primary/70 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white transition-colors">
                                            Your Profile
                                        </Link>
                                        <Link href="/settings" className="block px-4 py-2.5 text-sm text-primary/70 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white transition-colors">
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-100 dark:border-white/5 my-1" />
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/experience"
                                className="hidden sm:block text-sm font-bold text-primary/70 hover:text-primary transition-colors px-4"
                            >
                                Beta Access
                            </Link>
                            <button
                                onClick={() => openAuth("signin")}
                                className="px-8 py-3 rounded-full bg-primary text-white dark:bg-white dark:text-primary font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialMode={authMode}
            />
        </>
    );
}
