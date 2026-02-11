"use client";

import Link from "next/link";

export default function HowItWorksPage() {
    const steps = [
        {
            num: "01",
            title: "Upload your fit.",
            desc: "Start by uploading a clear photo of yourself or a model. Best results with simple backgrounds.",
            icon: "upload_file"
        },
        {
            num: "02",
            title: "Choose the garment.",
            desc: "Upload the clothing item you want to try on. We support tops, dresses, and more.",
            icon: "checkroom"
        },
        {
            num: "03",
            title: "AI Magic.",
            desc: "Our advanced diffusion models map the fabric to your body, adjusting for pose and lighting.",
            icon: "auto_awesome"
        },
        {
            num: "04",
            title: "New Look.",
            desc: "Download high-res results instantly. Perfect for e-commerce or social media content.",
            icon: "download"
        }
    ];

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

            {/* Navbar */}
            <nav className="w-full px-6 py-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto relative z-50">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="material-icons text-primary dark:text-white text-2xl">diamond</span>
                    <span className="text-xl font-bold tracking-tight text-primary dark:text-white">ClothIQ</span>
                </Link>
                {/* Desktop Links */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 bg-white/50 dark:bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-primary/5 dark:border-white/10 shadow-sm">
                    <Link href="/how-it-works" className="text-sm font-medium text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors">How it works</Link>
                    <Link href="/pricing" className="text-sm font-medium text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors">Pricing</Link>
                </div>
                <Link href="/waitlist" className="px-6 py-2.5 rounded-full border border-primary/20 dark:border-white/20 text-sm font-semibold hover:bg-primary/5 dark:hover:bg-white/10 transition-colors">
                    Join waitlist
                </Link>
            </nav>

            {/* Content */}
            <main className="flex-grow flex flex-col items-center px-6 py-20 relative z-10 max-w-7xl mx-auto w-full">

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary dark:text-white mb-20 text-center opacity-0 animate-fade-in-up">
                    Simpler than a photoshoot.
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group flex flex-col gap-6 p-8 rounded-3xl border border-primary/5 bg-white/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${(index + 1) * 150}ms` }}
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-mono text-primary/40 border border-primary/10 px-2 py-1 rounded-full">{step.num}</span>
                                <span className="material-icons text-primary/20 group-hover:text-primary transition-colors text-3xl">{step.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-sm text-primary/60 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center opacity-0 animate-fade-in-up delay-700">
                    <p className="text-xl font-medium mb-8 text-primary/80">Ready to transform your workflow?</p>
                    <Link href="/waitlist" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                        Get Started
                        <span className="material-icons text-xl">arrow_forward</span>
                    </Link>
                </div>

            </main>

            {/* Footer */}
            <footer className="w-full py-8 text-center text-sm text-primary/30 relative z-10 border-t border-primary/5">
                © 2023 ClothIQ Inc.
            </footer>
        </div >
    );
}
