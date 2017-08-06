// @flow

import React from 'react';
import * as reactFela from 'react-fela';
import * as styles from '../styles.js';

function formatTime(timestamp: number): string {
	const date = new Date(timestamp);

	const hours = addLeadingZero(String(date.getHours()));
	const minutes = addLeadingZero(String(date.getMinutes()));

	return `${hours}:${minutes}`;
}

function addLeadingZero(str: string): string {
	if (str.length < 2) {
		str = '0' + str;
	}
	return str;
}

class Clock extends React.Component {
	state = {
		time: Date.now(),
		timer: null,
	};

	updateTimeConditionally = () => {
		const now = Date.now();

		const minute = 1000 * 60;

		const nowRounded = Math.floor(now / minute) * minute;
		const stateTimeRounded = Math.floor(this.state.time / minute) * minute;

		if (nowRounded !== stateTimeRounded) {
			this.setState({ time: Date.now() });
		}
	};

	componentDidMount() {
		const timer = setInterval(this.updateTimeConditionally, 100);

		this.setState({
			timer: timer,
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	render() {
		return (
			<section>
				{formatTime(this.state.time)}
			</section>
		);
	}
}

const Title = reactFela.createComponent(
	props => ({
		fontSize: props.fontSize + 'px',
		color: props.color,
	}),
	'h1'
);

class App extends React.Component {
	render() {
		return (
			<div>
				<Clock />
			</div>
		);
	}
}

export default App;
