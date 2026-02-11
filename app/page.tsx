import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });

  const displayCount = count ? (count > 999 ? `+${(count / 1000).toFixed(1)}k` : `+${count}`) : "+0";

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <main className="relative pt-4 pb-20 md:pt-16 md:pb-32 flex flex-col items-center justify-start text-center px-4 overflow-hidden min-h-[90vh]">


          {/* Main Content Container */}
          <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/10 border border-primary/10 dark:border-white/10 shadow-sm opacity-0 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary/70 dark:text-white/80">beta version</span>
            </div>
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary dark:text-white mb-8 leading-[1.1] opacity-0 animate-fade-in-up delay-100">
              Virtual Try-On<br />
              <span className="text-primary/50 dark:text-white/50">Reimagined.</span>
            </h1>
            {/* Subheadline */}
            <p className="text-xl text-primary/60 dark:text-white/60 max-w-xl mb-12 font-medium leading-relaxed opacity-0 animate-fade-in-up delay-200">
              Experience the future of fashion. Instant, realistic, and privacy-first.
            </p>
            {/* CTA Area */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center opacity-0 animate-fade-in-up delay-300">
              <Link href="/waitlist" className="group relative px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                Join the waitlist
                <span className="material-icons group-hover:translate-x-1 transition-transform text-xl">arrow_forward</span>
              </Link>
              <div className="flex -space-x-3 items-center ml-4 mt-4 sm:mt-0">
                <img
                  alt="User avatar 1"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  data-alt="User avatar 1"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr39d8H5ddd2SSS-GBg7YpVmf2Nnh4JWU5DAkAVEviE2sFaQVhODnp7M-oPDeNNP3KgsWTIcYh5mmQkHXPHXAapakqGVcEMoyrqG5A91LbM04lOK8PCee0Au5B2I6xWc4rSESb3EMCjwM76qUTs5mkMZGf_iDD1YhkqP_ya0NwuH1gskVIdarcGIK7Naib8c9Gw5AuA-m0u-jSuJHywJ8rJaTB2hx-PvPWY5kSrddGXwvr0No4IZjH5lMsSQxHRAL5PclCpbjurceb"
                />
                <img
                  alt="User avatar 2"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  data-alt="User avatar 2"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBlM6QYCU1EJAafyiC4FFTfoXvug9UeDdMGBE3Mws0XDs5nduzqcPemNo-PBl_LXwH0EKFsfPy6xGhQQ0weYQsuFPMMquyk4mVdyUWUrAhmHXOt6xHGAv4vsc2q9YEAUCEY9zSr3sX_iBDPPrpnrF1PeF0lRNUciiF2CWwza-NkxPi-Fud0hZr-8xoxkpj3i_wG6vu98bOR2_Ob0Rh_B2o14Pw5pX8sGWbAWbYOBiFR1KlYv3WwS_90mi4iaEUFoOWtCUkocru-zhn"
                />
                <img
                  alt="User avatar 3"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  data-alt="User avatar 3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQfTI8sSbExIcwsU3kn-RTLtATsULctFWfQAeA2mBVUVjuevcE_Y1lkDmBb7m9Sm0hvNjEPlHMixko97ZbEVsMS5nPWkB6J11aKCsYNVy0jshtVmKqUdxjEkYR1jE9ao-Qg5z_SaBeEeMIBVJGwl8PBe02jpHgQCD9EECWAL2peWu1_a3B66XcNwtZE_m7YlgpjeYGCDOmzhdFh3BKtodjxxg51jblQXPryxXLP_2l8idDHjm96szPNjJ3rX6MrrPurO02wbBwuMAm"
                />
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-primary dark:text-white">
                  {displayCount}
                </div>
              </div>
            </div>
            {/* Trust Badge */}
            <div className="mt-16 opacity-0 animate-fade-in-up delay-500 grayscale hover:grayscale-0 transition-all duration-500">
              <p className="text-sm font-semibold mb-4 text-primary/40 dark:text-white/40 uppercase tracking-widest">Trusted by creative teams at</p>
              <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center">
                {/* Fake Logos using text/shapes for demo */}
                <div className="flex items-center gap-2">
                  <span className="material-icons text-2xl">eco</span>
                  <span className="font-bold text-xl">leafy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-2xl">bolt</span>
                  <span className="font-bold text-xl">zap</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-2xl">token</span>
                  <span className="font-bold text-xl">block</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-2xl">layers</span>
                  <span className="font-bold text-xl">stack</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Simple Footer for Context */}
        <footer className="border-t border-primary/5 dark:border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-primary/50 dark:text-white/50">© 2023 ClothIQ Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-primary/50 dark:text-white/50 hover:text-primary dark:hover:text-white transition-colors"><span className="material-icons">facebook</span></Link>
              <Link href="#" className="text-primary/50 dark:text-white/50 hover:text-primary dark:hover:text-white transition-colors"><span className="material-icons">thumb_up</span></Link>
              <Link href="#" className="text-primary/50 dark:text-white/50 hover:text-primary dark:hover:text-white transition-colors"><span className="material-icons">share</span></Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
