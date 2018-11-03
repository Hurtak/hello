import React from "react";
import propTypes from "prop-types";
import styled, { css } from "styled-components";
import * as s from "../../shared/styles";
import * as types from "../../shared/types";

export default class Calendar extends React.Component<
  { time: types.Time },
  {}
> {
  static monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  static dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  render() {
    const now = new Date(this.props.time);

    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();

    const months = range(1, 12);

    return (
      <MonthsWrapper>
        {months.map(monthNumber => {
          return (
            <Month key={monthNumber}>
              <MonthName>
                {monthNumber}. {Calendar.monthNames[monthNumber - 1]}
              </MonthName>

              {(() => {
                const daysInMonth = getDaysInMonth(currentYear, monthNumber);
                const days = range(1, daysInMonth);

                return (
                  <DaysWrapper>
                    {Calendar.dayNames.map(dayName => {
                      return (
                        <Day heading key={dayName}>
                          {dayName}
                        </Day>
                      );
                    })}

                    {(() => {
                      const day = new Date(currentYear, monthNumber - 1, 1);

                      // 0 - Su, 1 - Mo ...
                      let firstDayIndex = day.getDay();

                      // shift items that week starts with monday
                      // 0 - Mo, 2 - Tu ...
                      firstDayIndex -= 1;
                      if (firstDayIndex === -1) {
                        firstDayIndex = 6;
                      }

                      const numberOfEmptyItems = firstDayIndex - 1;
                      const emptyItems = range(0, numberOfEmptyItems);

                      return emptyItems.map(item => {
                        return <Day key={item} />;
                      });
                    })()}

                    {days.map(dayNumber => {
                      const isCurrentDay = Boolean(
                        monthNumber === currentMonth && dayNumber === currentDay
                      );

                      return (
                        <Day
                          selected={isCurrentDay}
                          currentDay={isCurrentDay}
                          key={dayNumber}
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

const MonthsWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: ${s.grid(1)};
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Month = styled.li`
  display: block;
  padding: ${s.grid(2)};
  background-color: ${s.colors.whiteTransparentDefault};
`;

const MonthName = styled.h2`
  ${s.text.text};
  display: block;
  margin: 0;
  text-align: center;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-gap: ${s.grid(1)} 0;
  justify-content: space-between;
  padding: 0;
  margin-top: ${s.grid(2)};
  list-style-type: none;
`;

interface IDayProps {
  heading?: boolean;
  currentDay?: boolean;
  selected?: boolean;
}

const Day = styled.div`
  ${s.text.text};

  ${(props: IDayProps) =>
    props.heading &&
    css`
      font-weight: bold;
    `}


  ${(props: IDayProps) =>
    props.currentDay &&
    css`
      font-weight: bold;
    `}

  ${(props: IDayProps) =>
    props.currentDay &&
    css`
      position: relative;
      z-index: 0;

      &::after: {
        content: "";
        display: block;
        position: absolute;
        left: -2px;
        top: -4px;
        width: 22px;
        height: 22px;
        background-color: orange;
        z-index: -1;
      }
    `}

`;

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function range(start: number, end: number): number[] {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(i);
  }
  return items;
}
