import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  currentPos: React.RefObject<[number, number, number]>;
  currentTarget: React.RefObject<[number, number, number]>;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  currentPos,
  currentTarget,
}) => {
  const { camera } = useThree();
  const targetVec = React.useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (currentPos.current && currentTarget.current) {
      // Smooth lerp to camera position
      camera.position.x += (currentPos.current[0] - camera.position.x) * 0.08;
      camera.position.y += (currentPos.current[1] - camera.position.y) * 0.08;
      camera.position.z += (currentPos.current[2] - camera.position.z) * 0.08;

      // Smooth lerp to lookAt target
      targetVec.x += (currentTarget.current[0] - targetVec.x) * 0.08;
      targetVec.y += (currentTarget.current[1] - targetVec.y) * 0.08;
      targetVec.z += (currentTarget.current[2] - targetVec.z) * 0.08;

      camera.lookAt(targetVec);
    }
  });

  return null;
};
