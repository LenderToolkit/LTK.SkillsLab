import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BasicForm from './pages/BasicForm';

export default function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='todo' element={<BasicForm />} />
		</Routes>
  );
}
