import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import Auth from './../../modules/Auth';

class runProject extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			packages: [],
			devPackages: [],
			searchResult: []
		}
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		var id = this.props.params.id;
		$('.menu .item').tab();
		$.ajax({
			url: host+'proyects/view/'+id+'/packages',
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					packages: res["deps"],
					devPackages: res["devDeps"]
				});
			}
		});
	}
	installPackage = (event) => {
		event.preventDefault();
		var pkg = this.refs.pkgToSearch.value;
		var host = this.props.route.host;
		var id = this.props.params.id;
		var _this = this;
		console.log(pkg);
		$.ajax({
			url: host+'proyects/view/'+id+'/packages',
			data: {package: pkg },
			method: "POST",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				if(res.success)
				{
					console.log(res);
				}
			}
		});
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
					<h3>Dependencias de Aplicación</h3>
				  	<table className="ui celled compact table">
				  		<thead>
				  			<tr>
				  				<th>Nombre</th>
				  				<th>Versión</th>
				  				<th>Desinstalar</th>
				  			</tr>
				  		</thead>
				  		<tbody>
				  			{this.state.packages.map(function(pkg){
				  				return(
				  					<tr>
				  						<td>{pkg.name}</td>
				  						<td>{pkg.version}</td>
				  						<td>
				  							<button className="ui icon red button">
				  								<i className="remove icon"></i>
				  							</button>
				  						</td>
				  					</tr>
				  				);
				  			})}
				  		</tbody>
				  	</table>
				  	<hr/>
				  	<h3>Dependencias de Desarrollador</h3>
				  	<table className="ui celled compact table">
				  		<thead>
				  			<tr>
				  				<th>Nombre</th>
				  				<th>Versión</th>
				  				<th>Desinstalar</th>
				  			</tr>
				  		</thead>
				  		<tbody>
				  			{this.state.devPackages.map(function(pkg){
				  				return(
				  					<tr>
				  						<td>{pkg.name}</td>
				  						<td>{pkg.version}</td>
				  						<td>
				  							<button className="ui icon red button">
				  								<i className="remove icon"></i>
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
								<input type="text" placeholder="Paquete a Instalar" ref="pkgToSearch" />
							</div>
							<input className="ui blue button" type="submit" value="Instalar" onClick={this.installPackage}/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default runProject;