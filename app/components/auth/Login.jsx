import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';
import Auth from './../../modules/Auth';

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
		let self = this;
		let data = { email: this.refs.email.value, password: this.refs.pass.value };
		$.post(this.props.route.host+'login', data )
		.done(function(data)
		{
			console.log(data);
			self.setState({
				errorMessage: '',
				errors: {}
			});
			Auth.authenticateUser(data.token);
			browserHistory.push('/services');
		})
		.fail(function(data)
		{
			console.log(data);
			self.setState({
				errorMessage: data.message,
				errors: data.errors
			});
		});
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
				    </form>
				    {this.state.errorMessage && <p className="ui error message">{this.state.errorMessage}</p>}
				</div>
			</div>
		);
	}
}

export default Login;