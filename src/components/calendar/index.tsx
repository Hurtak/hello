import React from "react";
import { MonthsWrapper, Month, MonthName, DaysWrapper, Day } from "./styled";
import { Timestamp } from "../timer-updater";

const monthNames = [
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

const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const Calendar = (props: { time: Timestamp }) => {
  const now = new Date(props.time);

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
              {monthNumber}. {monthNames[monthNumber - 1]}
            </MonthName>

            {(() => {
              const daysInMonth = getDaysInMonth(currentYear, monthNumber);
              const days = range(1, daysInMonth);

              return (
                <DaysWrapper>
                  {dayNames.map(dayName => {
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
};

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
