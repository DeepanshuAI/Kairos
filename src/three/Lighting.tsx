import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <>
      {/* Soft Ambient Fill */}
      <ambientLight intensity={0.4} color="#F3F0E8" />

      {/* Architectural Directional Sun Light */}
      <directionalLight
        position={[25, 35, 20]}
        intensity={1.2}
        color="#FAF4E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Warm Fill Light from Opposite Angle */}
      <directionalLight
        position={[-15, 10, -15]}
        intensity={0.3}
        color="#9A8060"
      />

      {/* Interior Warm Living Glow Point Light */}
      <pointLight
        position={[0, 2.5, 0]}
        intensity={2.0}
        distance={15}
        color="#F3E5C8"
      />
    </>
  );
};
