"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";

/** Gira suavemente o conteúdo em direção ao ponteiro — parallax 3D real. */
function ParallaxRig({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer;
    ref.current.rotation.y += (x * 0.5 - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (-y * 0.35 - ref.current.rotation.x) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

interface Props {
  variant?: "orb" | "trophy";
}

/**
 * Elemento 3D central do Hero/CTA. Um sólido que "respira" (distort) com
 * profundidade real, iluminação e sparkles. Montado apenas no cliente/desktop
 * via next/dynamic (ssr:false) pelos componentes de seção.
 */
export default function Scene3D({ variant = "orb" }: Props) {
  const isTrophy = variant === "trophy";
  const color = isTrophy ? "#f0a91e" : "#22d3ee";
  const spark = isTrophy ? "#fde047" : "#a78bfa";

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 4]} intensity={1.35} />
      <pointLight position={[-4, -3, -2]} intensity={0.8} color={color} />
      <ParallaxRig>
        <Float speed={2} rotationIntensity={0.6} floatIntensity={1.3}>
          <mesh>
            <icosahedronGeometry args={[1.25, 4]} />
            <MeshDistortMaterial
              color={color}
              distort={isTrophy ? 0.22 : 0.38}
              speed={1.6}
              roughness={0.15}
              metalness={isTrophy ? 0.9 : 0.45}
            />
          </mesh>
        </Float>
        <Sparkles count={50} scale={7} size={3.2} speed={0.35} color={spark} opacity={0.7} />
      </ParallaxRig>
    </Canvas>
  );
}
