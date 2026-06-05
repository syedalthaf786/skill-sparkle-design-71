import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import type { Group, Mesh } from "three";

function Robot() {
  const group = useRef<Group>(null);
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.6) * 0.5;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    }
    if (leftArm.current) leftArm.current.rotation.x = Math.sin(t * 1.5) * 0.6;
    if (rightArm.current) rightArm.current.rotation.x = -Math.sin(t * 1.5) * 0.6;
    const blink = (Math.sin(t * 3) + 1) * 0.5;
    if (leftEye.current) (leftEye.current.material as any).emissiveIntensity = 0.6 + blink;
    if (rightEye.current) (rightEye.current.material as any).emissiveIntensity = 0.6 + blink;
  });

  return (
    <group ref={group} position={[0, -0.4, 0]} scale={1.1}>
      {/* Antenna */}
      <mesh position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#7FEE64" emissive="#7FEE64" emissiveIntensity={1.2} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[1, 0.85, 0.95]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Eyes */}
      <mesh ref={leftEye} position={[-0.22, 1.3, 0.49]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={1} />
      </mesh>
      <mesh ref={rightEye} position={[0.22, 1.3, 0.49]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={1} />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, 1.05, 0.49]}>
        <boxGeometry args={[0.4, 0.06, 0.02]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.3, 1.2, 0.8]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Chest light */}
      <mesh position={[0, 0.2, 0.41]}>
        <circleGeometry args={[0.15, 24]} />
        <meshStandardMaterial color="#7FEE64" emissive="#7FEE64" emissiveIntensity={1.5} />
      </mesh>

      {/* Arms */}
      <group ref={leftArm} position={[-0.8, 0.55, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.13, 0.6, 8, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.8, 0.55, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.13, 0.6, 8, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-0.3, -0.85, 0]}>
        <capsuleGeometry args={[0.15, 0.5, 8, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, -0.85, 0]}>
        <capsuleGeometry args={[0.15, 0.5, 8, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Snow() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 8,
        duration: 8 + Math.random() * 10,
        delay: -Math.random() * 15,
        opacity: 0.5 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 60,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="absolute top-[-10%] block rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            boxShadow: "0 0 6px rgba(255,255,255,0.9)",
            animation: `snowfall ${f.duration}s linear ${f.delay}s infinite`,
            ["--drift" as any]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function RoboSnowBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* White wintery base */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#eef4ff] to-[#dce8fb]" />
      {/* 3D Robot canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0.3, 5], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={1.1} />
          <pointLight position={[-3, -2, 3]} intensity={0.5} color="#7FEE64" />
          <Suspense fallback={null}>
            <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
              <Robot />
            </Float>
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      {/* Snow on top */}
      <Snow />
    </div>
  );
}
