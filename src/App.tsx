import React from 'react';
import {Canvas} from '@react-three/fiber';
import {hot} from 'react-hot-loader/root';

import Scene from './components/Scene';
import './index.css';

const App = () => (
	<Canvas>
		<Scene />
	</Canvas>
);

export default hot(App);
