"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Group, Vector3, Points } from "three";

function Particle({ position, color, index }: { position: Vector3; color: string; index: number }) {
  const meshRef = useRef<Points>(null);
  const { mouse } = useThree();
  const basePosition = useMemo(() => position.clone(), [position]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // 基础浮动动画 - 使用偏移而不是直接修改position
      const offsetY = Math.sin(time * 0.5 + index * 0.1) * 0.08;
      const offsetX = Math.cos(time * 0.3 + index * 0.05) * 0.04;
      
      meshRef.current.position.set(
        basePosition.x + offsetX,
        basePosition.y + offsetY,
        basePosition.z
      );
      
      // 鼠标交互
      const mouseX = mouse.x * 4;
      const mouseY = mouse.y * 4;
      const dx = mouseX - meshRef.current.position.x;
      const dy = mouseY - meshRef.current.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 1.5) {
        const force = (1.5 - distance) / 1.5;
        meshRef.current.position.x += dx * force * 0.003;
        meshRef.current.position.y += dy * force * 0.003;
      }
    }
  });

  return (
    <points ref={meshRef} position={basePosition}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0]), 3]} />
      </bufferGeometry>
      <pointsMaterial 
        color={color}
        size={2.0}
        transparent
        opacity={0.7}
        sizeAttenuation={false}
      />
    </points>
  );
}

function ParticleField() {
  const groupRef = useRef<Group>(null);
  
  const particles = useMemo(() => {
    const count = 300;
    const particleArray = [];
    
    for (let i = 0; i < count; i++) {
      const position = new Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 3
      );
      
      // 紫色系颜色
      const colors = ['#8b5cf6', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particleArray.push({ position, color, index: i });
    }
    
    return particleArray;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <Particle
          key={index}
          position={particle.position}
          color={particle.color}
          index={particle.index}
        />
      ))}
    </group>
  );
}

export default function WaterRipple() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/3 to-pink-500/5" />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
      
      {/* 渐变背景覆盖 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-blue-500/3 pointer-events-none" />
    </div>
  );
} 