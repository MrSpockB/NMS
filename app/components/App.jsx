import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component
{
	render()
	{
		return (
			<div>
				<p>Hello Mundo!</p>
				<AwesomeComponent />
			</div>
		);
	}
}
export default App;