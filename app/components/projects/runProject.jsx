import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import Auth from './../../modules/Auth';
import Console from 'react-console-component';
import { Treebeard } from 'react-treebeard';

class runProject extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			packages: [],
			devPackages: [],
			searchResult: [],
			folderStruct: {},
			cursor: {},
			port: 3000,
			output: [],
			packageInstallOutput: [],
			proyect: {},
			dev: false
		}
	}
	fetchPackageList = () =>
	{
		var host = this.props.route.host;
		var _this = this;
		var id = this.props.params.id;
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
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		var id = this.props.params.id;
		$('.menu .item').tab();
		$('.ui.checkbox').checkbox();
		this.fetchPackageList();
		$('#overlay').addClass('active');
		$.ajax({
			url: host+'proyects/view/'+id,
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					proyect: res
				});
			}
		});
		$.ajax({
			url: host+'proyects/view/'+id+'/folder',
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				$('#overlay').removeClass('active');
				_this.setState({
					folderStruct: res
				});
			}
		});
		this.socket = io.connect('http://bananapi.nms.com:5000');
		this.socket.on('shellOutput', function(outputData)
		{
			var arrayvar = _this.state.output.slice()
			arrayvar.push(outputData)
			_this.setState({ output: arrayvar })
		});
		this.socket.on('packageInstallOutput', function(outputData)
		{
			var arrayvar = _this.state.packageInstallOutput.slice()
			arrayvar.push(outputData)
			_this.setState({packageInstallOutput: arrayvar});
		});
		this.socket.on('finishInstallOutput', function(outputData)
		{
			$('#overlay').removeClass('active');
		});
		this.socket.on('cmdOutput', function(outputData)
		{
			_this.refs.console.log(outputData);
		});
		this.socket.on('cmdFinish', function(outputData)
		{
			_this.refs.console.return();
		});
	}
	onToggle = (node, toggled) =>
	{
		if(this.state.cursor)
		{
			this.state.cursor.active = false;
		}
		node.active = true;
		if(node.children)
		{
			node.toggled = toggled;
		}
		this.setState({ cursor: node });
	}
	installPackage = (event) => {
		event.preventDefault();
		var data = {id: this.props.params.id, package: this.refs.pkgToSearch.value, dev: this.state.dev}
		this.setState({ packageInstallOutput: [] });
		$('#overlay').addClass('active');
		this.socket.emit('installPackage', data);
	}
	updatePort = (event) =>
	{
		this.setState({port: event.target.value});
	}
	changeDevDep = (event) =>
	{
		console.log(event);
		this.setState({dev: event.target.checked});
	}
	sendEventRun = (event) =>
	{
		event.preventDefault();
		var data = {id: this.props.params.id, name: this.state.cursor.name, port: this.state.port}
		this.socket.emit('runProject', data);
	}
	sendEventStop = (event) =>
	{
		event.preventDefault();
		this.socket.emit('stopProject');
	}
	uninstallPackage = (event, name, dev) =>
	{
		console.log(event, name);
	}
	echo = (text) =>
	{
		console.log(text);
		this.socket.emit('runCmdInProyectRoute', {cmd: text, route: this.state.proyect.route});
	}
	render()
	{
		var menuItem = (this.state.proyect.language === "PHP") ? '' : (<a className="item active" data-tab="first" ref="menuItem">Monitorizar</a>);
		var container = ( this.state.proyect.language === "PHP" ) ? '' : 
		(
			<div className="ui bottom attached tab segment active" data-tab="first">
			  	<form className="ui form">
			  		<div className="inline field">
			  			<button className="ui green labeled icon button" onClick={this.sendEventRun}>
			  				<i className="rocket icon"></i>
			  				Ejecutar Proyecto
			  			</button>
			  			<button className="ui red labeled icon button" onClick={this.sendEventStop}>
			  				<i className="remove icon"></i>
			  				Detener Proyecto
			  			</button>
				  	    <label>Se ejecutara en el puerto: </label>
				  	    <input type="number" placeholder="3000" value={this.state.port} onChange={this.updatePort} />
			  	  	</div>
			  	</form>
			  	<hr/>
				<Treebeard data={this.state.folderStruct} onToggle={this.onToggle}/>
				<hr/>
				<ul id="shellOutput">
					{this.state.output.map(function(line){
						return(
							<pre>{line}</pre>
						);
					})}
				</ul>
			</div>
		);
		return(
			<div className="ui segment">
				<h1>Monitorizar Proyecto</h1>
				<div className="ui top attached tabular menu">
					{ menuItem }
				  	<a className="item" data-tab="second">Listar paquetes</a>
				  	<a className="item" data-tab="third">Instalar paquete</a>
				  	<a className="item" data-tab="four">Consola</a>
				</div>
				{ container }
				<div className="ui bottom attached tab segment" data-tab="second">
					<h3>Dependencias de Aplicación</h3>
					<button className="ui button green" onClick={this.fetchPackageList}>Refrescar lista</button>
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
				  								<i className="remove icon" onClick={this.uninstallPackage.bind(this, pkg.name, 'no-dev')}></i>
				  							</button>
				  						</td>
				  					</tr>
				  				);
				  			}, this)}
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
				  								<i className="remove icon" onClick={this.uninstallPackage.bind(this, pkg.name, 'dev')}></i>
				  							</button>
				  						</td>
				  					</tr>
				  				);
				  			}, this)}
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
						<div className="field">
							<input type="checkbox" tabindex="0" checked={this.state.dev} onChange={this.changeDevDep} />
							<label>Dependencia del Desarrollador?</label>
						</div>
					</form>
					<hr/>
					<ul id="packageInstallOutput">
						{this.state.packageInstallOutput.map(function(line){
							return(
								<pre>{line}</pre>
							);
						})}
					</ul>
				</div>
				<div className="ui bottom attached tab segment" data-tab="four">
					<Console ref="console" handler={this.echo} autofocus={true} />
				</div>
			</div>
		);
	}
}

export default runProject;