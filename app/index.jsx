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

import viewUsers from './components/users/viewUsers.jsx';
import addUser from './components/users/addUser.jsx';
import editUser from './components/users/editUser.jsx';

import consola from './components/consola.jsx';

const host = "http://bananapi.nms.com/api/";

const router = (
	<Router history={browserHistory}>
		<Route path="/" component={Login} />
		<Route component={MainLayout} >
			<Route path="projects">
				<IndexRoute component={viewProjects} host={host} />
				<Route path="add" component={addProject} host={host} />
				<Route path=":id/edit" component={editDetailsProject} host={host} />
				<Route path=":id/run" component={runProject} host={host} />
			</Route>
			<Route path="users">
				<IndexRoute component={viewUsers} host={host} />
				<Route path="add" component={addUser} host={host}/>
				<Route path=":id/edit" component={editUser} host={host}/>
			</Route>
			<Route path="consola" component={consola} host={host} />
		</Route>
	</Router>
)

render(router, document.getElementById('root'));