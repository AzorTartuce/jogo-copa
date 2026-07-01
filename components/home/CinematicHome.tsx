"use client";

import HomeNav from "./HomeNav";
import HeroSection from "./HeroSection";
import PartidasSection from "./PartidasSection";
import SorteioSection from "./SorteioSection";
import SimulacaoSection from "./SimulacaoSection";
import CompartilharSection from "./CompartilharSection";
import CtaSection from "./CtaSection";

/**
 * Home cinematográfica (SECTIONS.md): experiência premium de rolagem com 6
 * seções — Hero, Partidas Históricas, Sorteio de Lendas, Simulação,
 * Compartilhamento/Desafio e CTA Final. Cada seção degrada com elegância em
 * mobile / reduced-motion.
 */
export default function CinematicHome() {
  return (
    <div className="relative">
      <HomeNav />
      <HeroSection />
      <PartidasSection />
      <SorteioSection />
      <SimulacaoSection />
      <CompartilharSection />
      <CtaSection />
    </div>
  );
}
