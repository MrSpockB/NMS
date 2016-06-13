import React from 'react';
import {render} from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MainLayout from './components/MainLayout.jsx';
import viewProjects from './components/proyects/viewProjects.jsx';
import viewServices from './components/services/viewServices.jsx';
import viewUsers from './components/users/viewUsers.jsx';

const router = (
	<Router history={browserHistory}>
		<Route path="/" component={MainLayout}>
			<IndexRoute component={viewServices}/>
			<Route path="/projects" component={viewProjects} />
			<Route path="/users" component={viewUsers} />
		</Route>
	</Router>
)

render(router, document.getElementById('root'));