import React from 'react';
import { browserHistory } from 'react-router';
import Auth from './../../modules/Auth';

class editUser extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			user:{},
			tempName: '',
			tempEmail: '',
			tempPass: ''
		};
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		$.ajax({
			url: host+'users/view/'+this.props.params.id,
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					user: res,
					tempEmail: res.email,
					tempName: res.name
				});			
			}
		});
	}
	updateName = (e) =>
	{
		this.setState({ tempName: e.target.value });
	}
	updateEmail = (e) =>
	{
		this.setState({ tempEmail: e.target.value });
	}
	updatePass = (e) =>
	{
		this.setState({ tempPass: e.target.value });
	}
	processForm = (event) => {
		event.preventDefault();
		var host = this.props.route.host;
		var _this = this;
		$.ajax({
			url: host+'users/view/'+_this.state.user._id,
			method: "PUT",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			data:{
				username: _this.state.user.username,
				name: _this.state.tempName,
				email: _this.state.tempEmail,
				password: _this.state.tempPass
			},
			dataType: "json",
			success: function(res)
			{
				_this.setState({
					successMessage: res
				});
				browserHistory.push('/users');
			}
		});
	}
	render()
	{
		return (
			<div>
				<h1>Editar Usuario</h1>
				<form action="" className="ui form" onSubmit={this.processForm}>
					<div className="field">
						<label>Username</label>
						<input type="text" name="username" value={this.state.user.username} readOnly/>
					</div>
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="name" value={this.state.tempName} onChange={this.updateName}/>
					</div>
					<div className="field">
						<label>Email</label>
						<input type="text" name="email" value={this.state.tempEmail} onChange={this.updateEmail}/>
					</div>
					<div className="field">
						<label>Password</label>
						<input type="password" name="pass" value={this.state.tempPass} onChange={this.updatePass}/>
					</div>
					<button className="ui green button" type="submit">Guardar</button>
				</form>
			</div>
		);
	}
}

export default editUser;