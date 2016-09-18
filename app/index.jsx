import React from 'react';
import {render} from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import css from './styles/main.less';
import Login from './components/auth/Login.jsx';
import MainLayout from './components/MainLayout.jsx';
import Auth from './modules/Auth';

import viewProjects from './components/projects/viewProjects.jsx';
import addProject from './components/projects/addProject.jsx';
import editDetailsProject from './components/projects/editDetailsProject.jsx';
import runProject from './components/projects/runProject.jsx';

import viewServices from './components/services/viewServices.jsx';
import addService from './components/services/addService.jsx';
import editDetailsService from './components/services/editDetailsService.jsx';

import viewUsers from './components/users/viewUsers.jsx';
import addUser from './components/users/addUser.jsx';
import editUser from './components/users/editUser.jsx';

const host = "http://localhost:5000/api/";

const router = (
	<Router history={browserHistory}>
		<Route path="/" component={Login} />
		<Route component={MainLayout} >
			<Route path="services">
				<IndexRoute component={viewServices} host={host} />
				<Route path="add" component={addService} host={host}/>
				<Route path=":id/edit" component={editDetailsService} />
			</Route>
			<Route path="projects">
				<IndexRoute component={viewProjects} host={host} />
				<Route path="add" component={addProject} host={host} />
				<Route path=":id/edit" component={editDetailsProject} host={host} />
				<Route path=":id/run" component={runProject} host={host} />
			</Route>
			<Route path="users">
				<IndexRoute component={viewUsers} host={host} />
				<Route path="add" component={addUser} host={host}/>
				<Route path=":id/edit" component={editUser}/>
			</Route>
		</Route>
	</Router>
)

render(router, document.getElementById('root'));