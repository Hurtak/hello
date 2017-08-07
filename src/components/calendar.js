import React from 'react';
import * as reactFela from 'react-fela';
import styles from '../styles.js';

const MonthsWrapper = reactFela.createComponent(
	props => ({
		listStyleType: 'none',
		padding: 0,
	}),
	'ul'
);

const Month = reactFela.createComponent(
	props => ({ display: 'inline-block', width: '25%', verticalAlign: 'top' }),
	'li'
);

const DaysWrapper = reactFela.createComponent(
	props => ({
		listStyleType: 'none',
		padding: 0,
	}),
	'ul'
);

const Day = reactFela.createComponent(
	props => ({ display: 'inline-block', width: `${100 / 7}%`, verticalAlign: 'top' }),
	'li'
);

export default class Calendar extends React.Component {
	static config = {};

	state = {};

	render() {
		const now = new Date();

		const currentMonth = now.getMonth() + 1;
		const currentYear = now.getFullYear();
		const currentDay = now.getDate();

		const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

		return (
			<MonthsWrapper>
				{months.map(monthNumber => {
					return (
						<Month
							key={monthNumber}
							style={{ backgroundColor: monthNumber === currentMonth ? 'lightblue' : '' }}
						>
							{monthNumber}
							{(() => {
								const days = [];
								const daysInMonth = getDaysInMonth(monthNumber);
								for (let i = 0; i < daysInMonth; i++) {
									days.push(i + 1);
								}

								return (
									<DaysWrapper>
										{days.map(dayNumber => {
											return (
												<Day
													key={dayNumber}
													style={{
														color:
															monthNumber === currentMonth && dayNumber === currentDay
																? 'red'
																: '',
													}}
												>
													{dayNumber}
												</Day>
											);
										})}
									</DaysWrapper>
								);
							})()}
						</Month>
					);
				})}
			</MonthsWrapper>
		);
	}
}

function getDaysInMonth(month) {
	return new Date(2000, month, 0).getDate();
}
