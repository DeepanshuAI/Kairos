import React from 'react';
import { ARCHITECTURAL_MATERIALS } from './Materials';

export const ResidenceModel: React.FC = () => {
  return (
    <group position={[0, -2, 0]}>
      {/* 1. Ground Podium & Reflecting Pool */}
      {/* Main Ground Slab */}
      <mesh position={[0, 0, 0]} material={ARCHITECTURAL_MATERIALS.travertine} receiveShadow>
        <boxGeometry args={[26, 0.4, 18]} />
      </mesh>
      
      {/* Reflecting Pool */}
      <mesh position={[-6, 0.21, 5]} material={ARCHITECTURAL_MATERIALS.water}>
        <boxGeometry args={[10, 0.05, 6]} />
      </mesh>

      {/* 2. Lower Level Concrete Columns & Walls */}
      {/* Main Concrete Core */}
      <mesh position={[-3, 2.2, 0]} material={ARCHITECTURAL_MATERIALS.concrete} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 10]} />
      </mesh>

      {/* Structural Steel Columns */}
      <mesh position={[5, 2.2, 4]} material={ARCHITECTURAL_MATERIALS.steel} castShadow>
        <boxGeometry args={[0.3, 4, 0.3]} />
      </mesh>
      <mesh position={[5, 2.2, -4]} material={ARCHITECTURAL_MATERIALS.steel} castShadow>
        <boxGeometry args={[0.3, 4, 0.3]} />
      </mesh>

      {/* 3. Main Glass Pavilion Living Volume */}
      <mesh position={[2, 2.2, 0]} material={ARCHITECTURAL_MATERIALS.glass}>
        <boxGeometry args={[8.2, 3.8, 9.8]} />
      </mesh>

      {/* Interior Warm Illuminated Volume */}
      <mesh position={[0, 2.2, 0]} material={ARCHITECTURAL_MATERIALS.interiorGlow}>
        <boxGeometry args={[5, 3.2, 5]} />
      </mesh>

      {/* Interior Travertine Fireplace Core Wall */}
      <mesh position={[-1, 2.2, 0]} material={ARCHITECTURAL_MATERIALS.travertine} castShadow>
        <boxGeometry args={[0.6, 3.6, 4]} />
      </mesh>

      {/* 4. Mid-Level Cantilevered Floor Slab */}
      <mesh position={[0.5, 4.3, 0]} material={ARCHITECTURAL_MATERIALS.concrete} castShadow receiveShadow>
        <boxGeometry args={[20, 0.4, 14]} />
      </mesh>

      {/* 5. Upper Penthouse Floorplate & Terrace */}
      <mesh position={[2, 6.2, 0]} material={ARCHITECTURAL_MATERIALS.concrete} castShadow receiveShadow>
        <boxGeometry args={[12, 3.4, 8]} />
      </mesh>

      {/* Upper Glass Facade */}
      <mesh position={[3, 6.2, 0]} material={ARCHITECTURAL_MATERIALS.glass}>
        <boxGeometry args={[9.8, 3.2, 7.8]} />
      </mesh>

      {/* Bronze Louver Privacy Screen Array */}
      {[-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((xOffset) => (
        <mesh
          key={xOffset}
          position={[xOffset * 0.8 + 1, 6.2, 4.02]}
          material={ARCHITECTURAL_MATERIALS.bronze}
          castShadow
        >
          <boxGeometry args={[0.08, 3.2, 0.3]} />
        </mesh>
      ))}

      {/* 6. Roof Canopy Slab */}
      <mesh position={[1, 8.0, 0]} material={ARCHITECTURAL_MATERIALS.concrete} castShadow>
        <boxGeometry args={[18, 0.4, 12]} />
      </mesh>

      {/* Subtle Bronze Roof Trim Accent */}
      <mesh position={[1, 8.22, 5.9]} material={ARCHITECTURAL_MATERIALS.bronze}>
        <boxGeometry args={[18.1, 0.08, 0.1]} />
      </mesh>
    </group>
  );
};
