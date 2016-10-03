import React from 'react';
import { Treebeard } from 'react-treebeard';
import { browserHistory } from 'react-router';
import Auth from './../../modules/Auth';

class addProject extends React.Component
{
	constructor()
	{
		super();
		this.state =
		{
			successMessage: '',
			errorMessage: '',
			errors: {},
			rootStruct: {},
			cursor: {},
			tempLang: '',
			tempProg: '',
			users : []
		};
	}
	fetchRootDirectory = () =>
	{
		var host = this.props.route.host;
		var _this = this;
		$.ajax({
			url: host+'commands/root/',
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					rootStruct: res
				});
			}
		});
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		this.fetchRootDirectory();
		$.ajax({
			url: host+'users',
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					users: res
				});
			}
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
	processForm = (event) => 
	{
		event.preventDefault();
		var host = this.props.route.host;
		var _this = this;
		var data = {
			name: this.refs.nombre.value,
			language: this.state.tempLang,
			username: this.state.tempProg,
			route: this.state.cursor.path
		};
		$.ajax({
			url: host+'proyects',
			method: "POST",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			data: data,
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					successMessage: res
				});
				browserHistory.push('/projects');
			}
		});
	}
	updateLang = (e) =>
	{
		this.setState({ tempLang: e.target.value });
	}
	updateProg = (e) =>
	{
		this.setState({ tempProg: e.target.value });
	}
	createDirectory = (event) => 
	{
		event.preventDefault();
		var direc = this.refs.carpeta.value;
		var host = this.props.route.host;
		var _this = this;
		console.log(direc);
		$.ajax({
			url: host+'commands/makedir/',
			data: {directory: direc },
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
					_this.fetchRootDirectory();
				}
			}
		});
	}
	render()
	{
		return (
			<div className="ui segment">
				<h1>Agregar Proyecto</h1>
				<form action="" className="ui form" onSubmit={this.processForm}>
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="nombre" ref="nombre" />
					</div>
					<div className="field">
						<label>Lenguaje</label>
						<select name="lenguaje" value={this.state.tempLang} onChange={this.updateLang} className="ui dropdown">
							<option value="PHP">PHP</option>
							<option value="Javascript">Javascript</option>
							<option value="Ruby">Ruby</option>
						</select>
					</div>
					<div className="field">
						<label>Programador asignado</label>
						<select name="username" value={this.state.tempProg} onChange={this.updateProg} className="ui dropdown">
							{this.state.users.map(function(user){
								return (
									<option value={user.username}>{user.name}</option>
								);
							})}
						</select>
					</div>
					<Treebeard data={this.state.rootStruct} onToggle={this.onToggle}/>
					<hr/>
					<div className="inline fields">
						<div className="eight wide field">
						      <label>Crear Carpeta</label>
						      <input type="text" name="carpeta" ref="carpeta"/>
						</div>
						<button className="ui primary button" onClick={this.createDirectory}>
						  Crear Carpeta
						</button>
					</div>
					<button className="ui green button" type="submit">Guardar</button>
				</form>
			</div>
		);
	}
}

export default addProject;