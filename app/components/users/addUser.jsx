import React from 'react';

class addUser extends React.Component
{
	constructor()
	{
		super();
		this.state =
		{
			successMessage: '',
			errorMessage: '',
			errors: {}
		};
	}
	processForm = (event) => {
		event.preventDefault();
		let self = this;
		let data = { 
			name: this.refs.name.value,
			username: this.refs.username.value,
			email: this.refs.email.value, 
			password: this.refs.pass.value
		};
		$.post(this.props.route.host+'signup', data )
		.done(function(data)
		{
			console.log(data);
			self.setState({
				successMessage: data.message
			});
			this.refs.name.reset();
			this.refs.username.reset();
			this.refs.email.vreset();
			this.refs.passreset();
		})
		.fail(function(data)
		{
			console.log(data);
			self.setState({
				errorMessage: data.responseJSON.message,
				errors: data.responseJSON.errors
			});
		});
	}
	render()
	{
		return (
			<div className="ui segment">
				<h1>Agregar Usuario</h1>
				{this.state.errorMessage && <p className="ui error message">{this.state.errorMessage}</p>}
				<form action="" className="ui form" onSubmit={this.processForm}>
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="nombre" ref="name"/>
					</div>
					<div className="field">
						<label>Username</label>
						<input type="text" name="username" ref="username"/>
					</div>
					<div className="field">
						<label>Email</label>
						<input type="text" name="email" ref="email"/>
					</div>
					<div className="field">
						<label>Contraseña</label>
						<input type="password" name="pass" ref="pass"/>
					</div>
					<input type="submit" value="Agregar Usuario" className="ui green button" />
				</form>
			</div>
		);
	}
}

export default addUser;