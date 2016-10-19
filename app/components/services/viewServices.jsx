import React from 'react';
import {Link} from 'react-router';
import Auth from './../../modules/Auth';

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
		$('#overlay').addClass('active');
		$.ajax({
			url: host+'services',
			method: "GET",
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': 'bearer ' + Auth.getToken(),
			},
			dataType: "json",
			success: function(res)
			{
				$('#overlay').removeClass('active');
				_this.setState({
					services: res
				});
			}
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
								<tr key={service._id}>
									<td>{service.name}</td>
									<td>{service.status ? "Activo" : "Desactivado"}</td>
									<td>
										<Link to={'/services/'+service._id+'/edit'} className="ui icon blue button">
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