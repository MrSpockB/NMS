import React from 'react';

class addProject extends React.Component
{
	render()
	{
		return (
			<div className="ui segment">
				<h1>Agregar Proyecto</h1>
				<form action="" className="ui form">
					<div className="field">
						<label>Nombre</label>
						<input type="text" name="nombre"/>
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

export default addProject;