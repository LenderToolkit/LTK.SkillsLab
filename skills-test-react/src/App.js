import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Container from "@mui/material/Container";

import { TodoPage, HomePage } from './pages';

import { HeaderComponent } from './components';

import store from "./store";

import { PATH } from './constants';

const App = () => {
	return (
		<Provider store={store}>
			<Container maxWidth="sm">
				<BrowserRouter>
					<HeaderComponent />
					<Routes>
						<Route path={PATH.TODO} element={<TodoPage />} />
						<Route path={PATH.HOME} element={<HomePage />} />
					</Routes>
				</BrowserRouter>
			</Container>
		</Provider>
	);
}

export default App;