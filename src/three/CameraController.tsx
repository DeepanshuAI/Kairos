import React, { useEffect, useRef } from 'react';
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
  const targetVec = React.useMemo(() => new THREE.Vector3(0, 3.5, 0), []);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (currentPos.current && currentTarget.current) {
      camera.position.set(currentPos.current[0], currentPos.current[1], currentPos.current[2]);
      targetVec.set(currentTarget.current[0], currentTarget.current[1], currentTarget.current[2]);
      camera.lookAt(targetVec);
      isInitialized.current = true;
    }
  }, [camera, currentPos, currentTarget, targetVec]);

  useFrame(() => {
    if (currentPos.current && currentTarget.current) {
      if (!isInitialized.current) {
        camera.position.set(currentPos.current[0], currentPos.current[1], currentPos.current[2]);
        targetVec.set(currentTarget.current[0], currentTarget.current[1], currentTarget.current[2]);
        camera.lookAt(targetVec);
        isInitialized.current = true;
        return;
      }

      // Smooth lerp to camera position
      camera.position.x += (currentPos.current[0] - camera.position.x) * 0.1;
      camera.position.y += (currentPos.current[1] - camera.position.y) * 0.1;
      camera.position.z += (currentPos.current[2] - camera.position.z) * 0.1;

      // Smooth lerp to lookAt target
      targetVec.x += (currentTarget.current[0] - targetVec.x) * 0.1;
      targetVec.y += (currentTarget.current[1] - targetVec.y) * 0.1;
      targetVec.z += (currentTarget.current[2] - targetVec.z) * 0.1;

      camera.lookAt(targetVec);
    }
  });

  return null;
};
