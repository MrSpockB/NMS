import React from 'react';
import { Link } from 'react-router';
import Menu from './Menu.jsx';

class MainLayout extends React.Component
{
	render()
	{
		return(
			<div>
				<div className="ui fixed inverted menu">
					<div className="ui container">
						<Link to="/" className="header item">NMS</Link>
						<a href="" className="item">Inicio</a>
					</div>
				</div>
				<div className="app ui grid container">
					<Menu />
					<main className="twelve wide column">
						{this.props.children}
					</main>
				</div>
			</div>
		)
	}
}
export default MainLayout;