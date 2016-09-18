import React from 'react';
import { Treebeard } from 'react-treebeard';
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
	componentDidMount()
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
				_this.refs.name.reset();
				_this.refs.username.reset();
				_this.refs.language.reset();			
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
					<button className="ui green button" type="submit">Guardar</button>
				</form>
			</div>
		);
	}
}

export default addProject;