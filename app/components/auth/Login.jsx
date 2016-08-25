import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';

class Login extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			errorMessage: '',
			errors: {}
		};
	}
	processForm = (event) => {
		event.preventDefault();
		console.log("mail:", this.refs.email.value);
		console.log("pass:", this.refs.pass.value);
		let data = { email: this.refs.email.value, password: this.refs.pass.value };
		$.post(this.props.route.host+'login', data );
	}
	render()
	{
		return (
			<div className="ui middle aligned center aligned grid login">
				<div className="column">
			    	<h2 className="ui black image header">
				    	<div className="content">
				    		NMS
				    	</div>
				    </h2>
				    <form action="/services" className="ui large form" onSubmit={this.processForm}>
				    	<div className="ui stacked segment">
				    		<div className="field">
				    			<div className="ui left icon input">
				    				<i className="user icon"></i>
				    				<input type="text" name="email" placeholder="E-mail address" ref="email"/>
				    			</div>
				    		</div>
				    		<div className="field">
				    			<div className="ui left icon input">
				    				<i className="lock icon"></i>
				    				<input type="password" name="password" placeholder="Password" ref="pass"/>
				    			</div>
				    		</div>
				    		<input type="submit" value="Acceder" className="ui fluid large teal submit button" />
				    	</div>
				    	<div className="ui error message"></div>
				    </form>
				</div>
			</div>
		);
	}
}

export default Login;