import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';

class Menu extends React.Component
{
	componentDidMount()
	{
		$(findDOMNode(this.refs.latMenu)).accordion();
	}
	render()
	{
		return (
			<aside className="primary-aside four wide column">
				<div className="ui styled accordion" ref="latMenu">
					<div className="title">
						<i className="dropdown icon"></i>
						Proyectos
					</div>
					<div className="content">
						<div className="transition hidden">
							<div className="ui secondary vertical menu">
								<Link to="/projects" className="item" activeClassName="active">Ver todos los proyectos</Link>
								<Link to="/projects/add" className="item" activeClassName="active">Agregar proyecto</Link>
							</div>
						</div>
					</div>
					<div className="title">
						<i className="dropdown icon"></i>
						Usuarios
					</div>
					<div className="content">
						<div className="transition hidden">
							<div className="ui secondary vertical menu">
								<Link to="/users" className="item" activeClassName="active">Ver todos los usuarios</Link>
								<Link to="/users/add" className="item" activeClassName="active">Agregar usuario</Link>
							</div>
						</div>
					</div>
					<div className="title">
						<i className="dropdown icon"></i>
						Utilidades
					</div>
					<div className="content">
						<div className="transition hidden">
							<div className="ui secondary vertical menu">
								<Link to="/consola" className="item" activeClassName="active">Consola</Link>
							</div>
						</div>
					</div>
				</div>
			</aside>
		);
	}
}
export default Menu;