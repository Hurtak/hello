import React from 'react';
import * as reactFela from 'react-fela';
import styles from '../styles.js';

const Time = reactFela.createComponent(
	props => ({
		...styles.font.small,
	}),
	'section'
);

export default class Clock extends React.Component {
	static config = {
		updateInterval: 100, // ms
	};

	state = {
		time: Date.now(),
		timer: null,
	};

	updateTimeConditionally = () => {
		const now = Date.now();

		const minute = 1000 * 60;

		const nowRoundedToMinutes = Math.floor(now / minute) * minute;
		const stateTimeRoundedToMinutes = Math.floor(this.state.time / minute) * minute;

		if (nowRoundedToMinutes !== stateTimeRoundedToMinutes) {
			this.setState({
				time: Date.now(),
			});
		}
	};

	componentDidMount() {
		const timer = setInterval(this.updateTimeConditionally, Clock.config.updateInterval);

		this.setState({
			timer: timer,
		});
	}

	componentWillUnmount() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer);
		}
	}

	render() {
		return (
			<Time>
				{formatTime(this.state.time)}
			</Time>
		);
	}
}

export function formatTime(timestamp) {
	const date = new Date(timestamp);

	const hours = addLeadingZero(String(date.getHours()));
	const minutes = addLeadingZero(String(date.getMinutes()));

	return `${hours}:${minutes}`;
}

export function addLeadingZero(str) {
	if (str.length < 2) {
		str = '0' + str;
	}
	return str;
}
