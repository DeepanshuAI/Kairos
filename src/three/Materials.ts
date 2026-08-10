import * as THREE from 'three';

export const ARCHITECTURAL_MATERIALS = {
  // Monolithic raw concrete
  concrete: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2C2B28'),
    roughness: 0.85,
    metalness: 0.1,
  }),
  
  // Warm travertine stone
  travertine: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3D3A35'),
    roughness: 0.75,
    metalness: 0.05,
  }),

  // Muted champagne bronze
  bronze: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9A8060'),
    roughness: 0.35,
    metalness: 0.8,
  }),

  // Structural charcoal steel framing
  steel: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1A1918'),
    roughness: 0.4,
    metalness: 0.6,
  }),

  // Low-iron acoustic glass
  glass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#CBE2F0'),
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    transmission: 0.9,
    ior: 1.5,
  }),

  // Warm interior illuminated core
  interiorGlow: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F3E5C8'),
    emissive: new THREE.Color('#9A8060'),
    emissiveIntensity: 0.6,
    roughness: 0.9,
  }),

  // Pool reflecting water
  water: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1C2B36'),
    roughness: 0.1,
    metalness: 0.3,
  }),
};
