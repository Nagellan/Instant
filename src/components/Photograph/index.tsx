import React, {useRef} from 'react';
import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';

type Props = JSX.IntrinsicElements['mesh'];

const Photograph = (props: Props) => {
	const meshRef = useRef<THREE.Mesh>(null!);

	useFrame(() => {
		meshRef.current.rotation.y += 0.01;
	});

	return (
		<mesh {...props} ref={meshRef}>
			<planeGeometry args={[3.29, 4]} />
			<meshStandardMaterial
				color="white"
				roughness={0.5}
				metalness={0}
				side={THREE.DoubleSide}
				flatShading
			/>
		</mesh>
	);
};

export default Photograph;
