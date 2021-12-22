import React, {useRef} from 'react';
import * as THREE from 'three';
import {useHelper} from '@react-three/drei';

import {WEBPACK_MODE} from '~/constants/env';
import Photograph from '../Photograph';

const Scene = () => {
	const pointLightRef = useRef();

	// TODO: maybe remove later
	if (process.env.NODE_ENV === WEBPACK_MODE.DEV) {
		useHelper(pointLightRef, THREE.PointLightHelper, 0.5, 'hotpink');
	}

	return (
		<>
			<pointLight
				color="white"
				intensity={2}
				position={[0, 4, 4]}
				ref={pointLightRef}
			/>

			<Photograph />
		</>
	);
};

export default Scene;
