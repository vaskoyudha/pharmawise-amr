"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Microscope, Users } from "lucide-react";

export function VisualShowcase() {
    return (
        <section className="grid gap-8 md:grid-cols-2">
            {/* AMR Visualization Card */}
            <ScrollReveal animation="slideUp" delay={0.1}>
                <motion.div
                    className="glass-panel glow-effect group relative overflow-hidden rounded-[32px] border border-white/10 p-6 transition-all duration-500 hover:border-purple-400/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-[16/9] w-full"
                        >
                            <Image
                                src="/img/visualisasi-ilmiah-resistensi-antimikroba-amr.png"
                                alt="Visualisasi Ilmiah Resistensi Antimikroba"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#04060e]/80 via-[#04060e]/10 to-transparent" />
                        </motion.div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-purple-500/20 p-3">
                            <Microscope className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-purple-100">
                                Pemahaman AMR Berbasis Sains
                            </h3>
                            <p className="mt-2 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80">
                                Visualisasi ilmiah resistensi antimikroba membantu memahami mekanisme resistensi bakteri terhadap antibiotik secara mendalam.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </ScrollReveal>

            {/* Healthcare Collaboration Card */}
            <ScrollReveal animation="slideUp" delay={0.2}>
                <motion.div
                    className="glass-panel glow-effect group relative overflow-hidden rounded-[32px] border border-white/10 p-6 transition-all duration-500 hover:border-aurora-400/30 hover:shadow-[0_0_40px_rgba(94,252,232,0.3)]"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-[16/9] w-full"
                        >
                            <Image
                                src="/img/kolaborasi-tim-medis-rumah-sakit-modern.png"
                                alt="Kolaborasi Tim Medis di Rumah Sakit Modern"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#04060e]/80 via-[#04060e]/10 to-transparent" />
                        </motion.div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-aurora-400/20 p-3">
                            <Users className="h-6 w-6 text-aurora-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-aurora-100">
                                Kolaborasi Tim Kesehatan
                            </h3>
                            <p className="mt-2 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80">
                                Farmasis, dokter, dan tenaga kesehatan bekerja bersama dalam stewardship antimikroba untuk hasil terbaik pasien.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </ScrollReveal>
        </section>
    );
}
