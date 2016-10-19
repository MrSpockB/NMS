import React from 'react';
import {Link} from 'react-router';
import Auth from './../../modules/Auth';

class viewUsers extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			users: []
		};
	}
	componentDidMount()
	{
		var host = this.props.route.host;
		var _this = this;
		$('#overlay').addClass('active');
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
				$('#overlay').removeClass('active');
				_this.setState({
					users: res
				});
			}
		});
	}
	render()
	{
		return(
			<div>
				<h1>Usuarios</h1>
				<table className="ui celled table">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Username</th>
							<th>Email</th>
							<th>Modificar</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{this.state.users.map(function(user){
							return(
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>
										<Link to={'/users/'+user.id+'/edit'} className="ui icon blue button">
											<i className="setting icon"></i>
										</Link>
									</td>
									<td>
										<button className="ui icon red button">
											<i className="remove icon"></i>
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
export default viewUsers;