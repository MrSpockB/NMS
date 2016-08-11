import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';

class runProject extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			packages: [],
			searchResult: []
		}
	}
	componentDidMount()
	{
		$('.menu .item').tab();
	}
	searchPackage(event)
	{
		event.preventDefault();
	}
	render()
	{
		return(
			<div className="ui segment">
				<h1>Monitorizar Proyecto</h1>
				<div className="ui top attached tabular menu">
					<a className="item active" data-tab="first" ref="menuItem">Monitorizar</a>
				  	<a className="item" data-tab="second">Listar paquetes</a>
				  	<a className="item" data-tab="third">Instalar paquete</a>
				  	<a className="item" data-tab="fourth">Opciones</a>
				</div>
				<div className="ui bottom attached tab segment active" data-tab="first">
				  	<form className="ui form">
				  		<div className="inline field">
				  			<button className="ui green labeled icon button">
				  				<i className="rocket icon"></i>
				  				Ejecutar Proyecto
				  			</button>
					  	    <label>Se ejecutara en el puerto: </label>
					  	    <input type="number" placeholder="3000" />
				  	  	</div>
				  	</form>
				</div>
				<div className="ui bottom attached tab segment" data-tab="second">
				  	<table className="ui celled table">
				  		<thead>
				  			<tr>
				  				<th>Nombre</th>
				  				<th>Descripcion</th>
				  				<th>Versión</th>
				  				<th>Instalar</th>
				  			</tr>
				  		</thead>
				  		<tbody>
				  			{this.state.packages.map(function(pkg){
				  				return(
				  					<tr>
				  						<td>{pkg.name}</td>
				  						<td>{pkg.desc}</td>
				  						<td>{pkg.ver}</td>
				  						<td>
				  							<button className="ui icon green button">
				  								<i className="checkmark icon"></i>
				  							</button>
				  						</td>
				  					</tr>
				  				);
				  			})}
				  		</tbody>
				  	</table>
				</div>
				<div className="ui bottom attached tab segment" data-tab="third">
					<form action="" className="ui form">
						<div className="fields">
							<div className="ten wide field">
								<input type="text" placeholder="Servicio a Instalar" ref="pkgToSearch" />
							</div>
							<input className="ui blue button" type="submit" value="Buscar" onClick={this.searchPackage.bind(this)}/>
						</div>
					</form>
					<table className="ui celled table">
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Descripcion</th>
								<th>Versión</th>
								<th>Instalar</th>
							</tr>
						</thead>
						<tbody>
							{this.state.searchResult.map(function(pkg){
								return(
									<tr>
										<td>{pkg.name}</td>
										<td>{pkg.desc}</td>
										<td>{pkg.ver}</td>
										<td>
											<button className="ui icon green button">
												<i className="checkmark icon"></i>
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="ui bottom attached tab segment" data-tab="fourth">
				  	<button className="ui red labeled icon button">
				  		<i className="remove icon"></i>
				  		Eliminar Proyecto
				  	</button>
				</div>
			</div>
		);
	}
}

export default runProject;