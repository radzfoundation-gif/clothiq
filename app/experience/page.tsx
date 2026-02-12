"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ExperiencePage() {
    const [bodyImage, setBodyImage] = useState<string | null>(null);
    const [clothingImage, setClothingImage] = useState<string | null>(null);

    const handleUpload = (type: "body" | "clothing") => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (error) => {
                if (type === "body") setBodyImage(error.target?.result as string);
                else setClothingImage(error.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Noise Texture */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "#ffffff",
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.3) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="relative z-10">
                <Navbar />

                <main className="max-w-7xl mx-auto px-6 py-12 md:px-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-4">Try-On Experience</h1>
                        <p className="text-primary/60">Upload your photos to see the magic happen.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Body Image Upload */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-primary">1. Your Photo</h2>
                            <div className="aspect-[3/4] rounded-3xl border-2 border-dashed border-primary/10 bg-white/50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary/30 transition-all">
                                {bodyImage ? (
                                    <img src={bodyImage} alt="Body preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-8">
                                        <span className="material-icons text-5xl text-primary/20 mb-4">person</span>
                                        <p className="text-sm text-primary/40 font-medium">Upload a full-body photo</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload("body")}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Clothing Image Upload */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-primary">2. Clothing Photo</h2>
                            <div className="aspect-[3/4] rounded-3xl border-2 border-dashed border-primary/10 bg-white/50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary/30 transition-all">
                                {clothingImage ? (
                                    <img src={clothingImage} alt="Clothing preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-8">
                                        <span className="material-icons text-5xl text-primary/20 mb-4">checkroom</span>
                                        <p className="text-sm text-primary/40 font-medium">Upload a clothing item</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload("clothing")}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button
                            disabled={!bodyImage || !clothingImage}
                            className="px-12 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            Generate Try-On
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
