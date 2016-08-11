import React from 'react';

class addUser extends React.Component
{
	render()
	{
		return (
			<div className="ui segment">
				<h1>Agregar Usuario</h1>
				<form action="" className="ui form">
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="nombre"/>
					</div>
					<div className="field">
						<label>Teléfono</label>
						<input type="text" name="tel"/>
					</div>
					<div className="field">
						<label>Email</label>
						<input type="text" name="email"/>
					</div>
					<div className="field">
						<label>Contraseña</label>
						<input type="password" name="pass"/>
					</div>
					<input type="submit" value="Agregar Usuario" className="ui green button" />
				</form>
			</div>
		);
	}
}

export default addUser;