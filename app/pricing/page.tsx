"use client";

import Link from "next/link";

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/forever",
            desc: "Perfect for testing the waters.",
            features: [
                "2 try-ons per day",
                "Standard generation speed",
                "Watermarked results",
                "Community support"
            ],
            cta: "Get Started",
            highlight: false
        },
        {
            name: "Starter",
            price: "$19",
            period: "/month",
            desc: "For fashion enthusiasts.",
            features: [
                "20 try-ons per month",
                "Fast generation speed",
                "No watermarks",
                "Priority support"
            ],
            cta: "Start Trial",
            highlight: true
        },
        {
            name: "Pro",
            price: "$49",
            period: "/month",
            desc: "For content creators & brands.",
            features: [
                "100 try-ons per month",
                "Turbo generation speed",
                "Commercial license",
                "dedicated support"
            ],
            cta: "Go Pro",
            highlight: false
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

                <div className="text-center mb-20 opacity-0 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary dark:text-white mb-6">
                        Simple, transparent pricing.
                    </h1>
                    <p className="text-xl text-primary/60 dark:text-white/60 max-w-2xl mx-auto">
                        Choose the perfect plan for your virtual fitting needs. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col p-8 rounded-3xl border ${plan.highlight ? 'border-primary bg-primary text-white shadow-2xl scale-105 z-10' : 'border-primary/10 bg-white/50 backdrop-blur-sm hover:border-primary/20'} transition-all duration-300 opacity-0 animate-fade-in-up`}
                            style={{ animationDelay: `${(index + 1) * 150}ms` }}
                        >
                            <div className="mb-8">
                                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-primary'}`}>{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-primary'}`}>{plan.price}</span>
                                    <span className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-primary/40'}`}>{plan.period}</span>
                                </div>
                                <p className={`mt-4 text-sm ${plan.highlight ? 'text-white/80' : 'text-primary/60'}`}>{plan.desc}</p>
                            </div>

                            <ul className="flex-grow space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <span className={`material-icons text-lg ${plan.highlight ? 'text-green-400' : 'text-green-600'}`}>check</span>
                                        <span className={plan.highlight ? 'text-white/90' : 'text-primary/80'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/waitlist"
                                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${plan.highlight
                                    ? 'bg-white text-primary hover:bg-white/90'
                                    : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/10'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center opacity-0 animate-fade-in-up delay-700">
                    <p className="text-primary/60 mb-2">Need a custom solution?</p>
                    <Link href="mailto:sales@clothiq.com" className="font-semibold underline underline-offset-4 hover:text-primary">
                        Contact Sales for Business API
                    </Link>
                </div>

            </main>

            {/* Footer */}
            <footer className="w-full py-8 text-center text-sm text-primary/30 relative z-10 border-t border-primary/5">
                © 2023 ClothIQ Inc.
            </footer>
        </div>
    );
}
