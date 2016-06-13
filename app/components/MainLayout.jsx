import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

class MainLayout extends React.Component
{
	render()
	{
		return(
			<div className="app">
				<header className="primary-header"></header>
				<aside className="primary-aside">
					<ul>
						<li>
							<Link to="/">Servicios</Link>
						</li>
						<li>
							<Link to="/projects">Proyectos</Link>
						</li>
						<li>
							<Link to="/users">Usuarios</Link>
						</li>
					</ul>
				</aside>
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}
export default MainLayout;