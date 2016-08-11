import React from 'react';
import {Link} from 'react-router';

class viewServices extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			services: []
		};
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		$.get(host+'services', function(result)
		{
			_this.setState({
				services: result
			});
		});
	}
	render()
	{
		return(
			<div>
				<h1>Servicios</h1>
				<table className="ui celled table">
					<thead>
						<tr>
							<th>Servicio</th>
							<th>Estado</th>
							<th>Editar Configuración</th>
						</tr>
					</thead>
					<tbody>
						{this.state.services.map(function(service){
							return(
								<tr key={service.id}>
									<td>{service.name}</td>
									<td>{service.status ? "Activo" : "Desactivado"}</td>
									<td>
										<Link to={'/services/'+service.id+'/edit'} className="ui icon blue button">
											<i className="setting icon"></i>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		)
	}
}
export default viewServices;