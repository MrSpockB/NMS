import React from 'react';
import { browserHistory } from 'react-router';
import Auth from './../../modules/Auth';

class editDetailsProject extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			project: {},
			users: [],
			successMessage: '',
			errorMessage: '',
			errors: {},
			tempProg: '',
			tempLang: '',
			tempName: ''
		};
	}
	updateName = (e) =>
	{
		this.setState({ tempName: e.target.value });
	}
	updateLang = (e) =>
	{
		this.setState({ tempLang: e.target.value });
	}
	updateProg = (e) =>
	{
		this.setState({ tempProg: e.target.value });
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		$.ajax({
			url: host+'proyects/view/'+this.props.params.id,
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					project: res,
					tempProg: res.username,
					tempLang: res.language,
					tempName: res.name
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
	processForm = (event) => {
		event.preventDefault();
		var host = this.props.route.host;
		var _this = this;
		$.ajax({
			url: host+'proyects/view/'+_this.state.project._id,
			method: "PUT",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			data:{
				name: _this.state.tempName,
				language: _this.state.tempLang,
				username: _this.state.tempProg
			},
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
	render()
	{
		return (
			<div>
				<h1> {this.state.tempName} </h1>
				<form action="" className="ui form" onSubmit={this.processForm}>
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="name" value={this.state.tempName} onChange={this.updateName}/>
					</div>
					<div className="field">
						<label>Lenguaje</label>
						<select name="language" className="ui dropdown" value={this.state.tempLang} onChange={this.updateLang}>
							<option value="PHP">PHP</option>
							<option value="Javascript">Javascript</option>
							<option value="Ruby">Ruby</option>
						</select>
					</div>
					<div className="field">
						<label>Programador asignado</label>
						<select name="programer" value={this.state.tempProg} onChange={this.updateProg} className="ui dropdown">
							{this.state.users.map(function(user){
								return (
									<option value={user.username}>{user.name}</option>
								);
							})}
						</select>
					</div>
					<button className="ui green button" type="submit">Guardar</button>
				</form>
			</div>
		);
	}
}

export default editDetailsProject;