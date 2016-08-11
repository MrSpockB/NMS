import React from 'react';

class addService extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			result : []
		}
	}
	searchPackage(event)
	{
		event.preventDefault();
		var host = this.props.route.host;
		var value = this.refs.pkgToSearch.value;
		var _this = this;
		$.get(host+'searchService?q='+value, function(result)
		{
			_this.setState({
				result: result
			});
		});
	}
	render()
	{
		return (
			<div className="ui segment">
				<h1>Agregar Servicio</h1>
				<form action="" className="ui form">
					<div className="fields">
						<div className="ten wide field">
							<input type="text" placeholder="Servicio a Instalar" ref="pkgToSearch" />
						</div>
						<input className="ui button" type="submit" value="Buscar" onClick={this.searchPackage.bind(this)}/>
					</div>
				</form>
				<table className="ui celled table">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Descripcion</th>
							<th>Versión</th>
							<th>Instalar</th>
						</tr>
					</thead>
					<tbody>
						{this.state.result.map(function(service){
							return(
								<tr>
									<td>{service.name}</td>
									<td>{service.desc}</td>
									<td>{service.ver}</td>
									<td>
										<button className="ui icon green button">
											<i className="checkmark icon"></i>
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default addService;