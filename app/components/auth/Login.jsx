import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';

class Login extends React.Component
{
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
				    <form className="ui large form">
				    	<div className="ui stacked segment">
				    		<div className="field">
				    			<div className="ui left icon input">
				    				<i className="user icon"></i>
				    				<input type="text" name="email" placeholder="E-mail address" />
				    			</div>
				    		</div>
				    		<div className="field">
				    			<div className="ui left icon input">
				    				<i className="lock icon"></i>
				    				<input type="password" name="password" placeholder="Password" />
				    			</div>
				    		</div>
				    		<Link to="services" className="ui fluid large teal submit button">Acceder</Link>
				    	</div>
				    	<div className="ui error message"></div>
				    </form>
				</div>
			</div>
		);
	}
}

export default Login;