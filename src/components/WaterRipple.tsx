"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Vector2 } from "three";

const WaterRippleShader = {
  vertexShader: `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_radius;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      float dist = distance(uv, u_mouse);
      if (dist < u_radius) {
        float strength = (u_radius - dist) / u_radius;
        pos.z += sin(dist * 20.0 - u_time * 4.0) * 0.1 * strength;
      }
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_radius;
    varying vec2 vUv;
    
    void main() {
      float dist = distance(vUv, u_mouse);
      float strength = 1.0 - smoothstep(0.0, u_radius, dist);
      
      vec3 color1 = vec3(0.627, 0.125, 0.9); // Purple
      vec3 color2 = vec3(0.4, 0.0, 0.8); // Darker purple
      vec3 color = mix(color1, color2, strength);
      
      float alpha = 0.3 + strength * 0.2;
      gl_FragColor = vec4(color, alpha);
    }
  `,
};

function WaterRippleMesh() {
  const meshRef = useRef<Mesh>(null);
  const mouseRef = useRef(new Vector2(0.5, 0.5));
  const { viewport, mouse } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new Vector2(0.5, 0.5) },
      u_radius: { value: 0.25 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
      
      // Convert mouse position to UV coordinates
      const x = (mouse.x + 1) / 2;
      const y = (mouse.y + 1) / 2;
      
      // Smooth mouse movement
      mouseRef.current.x += (x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (y - mouseRef.current.y) * 0.1;
      
      material.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={WaterRippleShader.vertexShader}
        fragmentShader={WaterRippleShader.fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WaterRipple() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <WaterRippleMesh />
      </Canvas>
    </div>
  );
} 