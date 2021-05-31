import React from 'react';
import Home from './Pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './styles/global.scss';
function App() {
	return (
		<div className='App'>
			<Router>
				<Routes />
			</Router>
		</div>
	);
}

export default App;
