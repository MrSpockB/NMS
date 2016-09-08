import React from 'react';

class editDetailsProject extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			project: {},
			successMessage: '',
			errorMessage: '',
			errors: {}
		};
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		$.get(host+'proyects/'+this.props.params.id, function(result)
		{
			_this.setState({
				project: result
			});
		});
	}
	processForm = (event) => {
		event.preventDefault();
		let self = this;
		let data = {
			name: this.refs.nombre.value,
			language: this.refs.lenguaje.value,
			programer: this.refs.programer.value

			
		};
		$.put(this.props.route.host+'proyects'+"/"+this.state.project.id, data )
			.done(function(data)
			{
				console.log(data);
				self.setState({
					successMessage: data.message
				});
				this.refs.name.reset();
				this.refs.programer.reset();
				this.refs.language.reset();

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
			<div>
				<h1> {this.state.project.name} </h1>
				<form action="" className="ui form">
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="name" value={this.state.project.name}/>
					</div>
					<div className="field">
						<label>Lenguaje</label>
						<select name="language" className="ui dropdown">
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
					<button className="ui green button" type="submit">Guardar</button>
				</form>
			</div>
		);
	}
}

export default editDetailsProject;