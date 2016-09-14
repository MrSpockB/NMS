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
			cursor: {}
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
		var host = this.props.route.host;
		var _this = this;
		$.ajax({
			url: host+'proyects',
			method: "POST",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			data:{
				name: _this.refs.nombre.value,
				language: _this.refs.lenguaje.value,
				programer: _this.refs.programer.value
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					successMessage: res
				});
				_this.refs.name.reset();
				_this.refs.programer.reset();
				_this.refs.language.reset();			
			}
		});
	}

	render()
	{
		return (
			<div className="ui segment">
				<h1>Agregar Proyecto</h1>
				<form action="" className="ui form">
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="nombre"/>
					</div>
					<div className="field">
						<label>Lenguaje</label>
						<select name="lenguaje" className="ui dropdown">
							<option value="0">PHP</option>
							<option value="1">Javascript</option>
							<option value="2">Ruby</option>
						</select>
					</div>
					<div className="field">
						<label>Programador asignado</label>
						<select name="programer" className="ui dropdown">
							<option value="0">Juanito</option>
							<option value="1">Vladimir</option>
							<option value="2">Pepesqui</option>
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