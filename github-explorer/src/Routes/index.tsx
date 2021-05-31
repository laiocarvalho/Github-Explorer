import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Repository from '../Pages/Repository';
const Routes: React.FC = () => {
	return (
		<div>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/Repository/:repository+' component={Repository} />
			</Switch>
		</div>
	);
};

export default Routes;
