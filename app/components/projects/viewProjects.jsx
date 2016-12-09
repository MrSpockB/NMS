import React from 'react';
import { Link } from 'react-router';
import Auth from './../../modules/Auth';

class viewProjects extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			projects: []
		};
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		$('#overlay').removeClass('active');
		$.ajax({
			url: host+'proyects',
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
					projects: res
				});
						
			}
		});
	}
	render()
	{
		var element;
		if(this.state.projects === undefined || this.state.projects.length == 0)
		{
			element = (<h2 className="ui icon center aligned header segment">
						  <i className="settings icon"></i>
						  <div className="content">
						    No hay proyectos
						    <div className="sub header">Agrega proyectos para poder configurarlos.</div>
						  </div>
						</h2>
			);
		}
		else
		{
			element = "";
		}
		return(
			<div>
				<h1>Proyectos</h1>
				<table className="ui celled table">
					<thead>
						<tr>
							<th>Proyecto</th>
							<th>Lenguaje</th>
							<th>Usuario</th>
							<th>Editar detalles</th>
							<th>Configurar proyecto</th>
						</tr>
					</thead>
					<tbody>
						{this.state.projects.map(function(project){
							return(
								<tr key={project.id}>
									<td>{project.name}</td>
									<td>{project.language}</td>
									<td>{project.username}</td>
									<td>
										<Link to={'/projects/'+project._id+'/edit'} className="ui icon teal button">
											<i className="setting icon"></i>
										</Link>
									</td>
									<td>
										<Link to={'/projects/'+project._id+'/run'} className="ui icon blue button">
											<i className="setting icon"></i>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{element}
			</div>
		)
	}
}
export default viewProjects;