import React from 'react';
import Auth from './../modules/Auth';
import Console from 'react-console-component';
import './../styles/consola.css';

class consola extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
		}
	}
	componentDidMount()
	{
		var self = this;
		this.socket = io.connect('http://bananapi.nms.com:5000');
		this.socket.on('cmdOutput', function(outputData)
		{
			self.refs.console.log(outputData);
		});
		this.socket.on('cmdFinish', function(outputData)
		{
			self.refs.console.return();
		});
	}
	echo = (text) =>
	{
		console.log(text);
		this.socket.emit('runCmd', text);
	}
	render()
	{
		return <Console ref="console" handler={this.echo} autofocus={true} />
	}
}

export default consola;