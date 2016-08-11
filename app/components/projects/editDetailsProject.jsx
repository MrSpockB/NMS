import React from 'react';

class editDetailsProject extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			project: {}
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
	render()
	{
		return (
			<div>
				<h1> {this.state.project.name} </h1>
				<form action="" className="ui form">
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="nombre" value={this.state.project.name}/>
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
						<select name="usuario" className="ui dropdown">
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