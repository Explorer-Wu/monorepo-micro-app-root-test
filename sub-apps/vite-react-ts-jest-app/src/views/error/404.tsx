import React, { Component } from 'react';

class NoMatch extends Component {
	render() {
		const { location }: any = this.props;
		return (
			<>
				<h3>404!</h3>
				<p>
					No match for <code>{location.pathname}</code>
				</p>
			</>
		);
	}
}

export default NoMatch;
