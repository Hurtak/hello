import React from "react";
import { styled } from "../../shared/css";
import * as s from "../../shared/styles";
import * as types from "../../shared/types";

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

const Calendar = (props: { time: types.Time }) => {
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

export default Calendar;

const MonthsWrapper = styled.ul({
  display: "grid",
  gridTemplateColumns: "repeat(4, auto)",
  gridGap: s.grid(1),
  listStyleType: "none",
  margin: 0,
  padding: 0
});

const Month = styled.li({
  display: "block",
  padding: s.grid(2),
  backgroundColor: s.colors.whiteTransparentDefault
});

const MonthName = styled.h2({
  ...s.text.text,

  display: "block",
  margin: 0,
  textAlign: "center"
});

const DaysWrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(7, auto)",
  gridGap: "${s.grid(1)} 0",
  justifyContent: "space-between",
  padding: 0,
  marginTop: s.grid(2),
  listStyleType: "none"
});

interface IDayProps {
  heading?: boolean;
  currentDay?: boolean;
  selected?: boolean;
}

const Day = styled.div((props: IDayProps) => ({
  ...s.text.text,

  ...(props.heading && {
    fontWeight: "bold"
  }),
  ...(props.currentDay && {
    fontWeight: "bold"
  }),
  ...(props.currentDay && {
    position: "relative",
    zIndex: 0,
    "&::after": {
      content: `""`,
      display: "block",
      position: "absolute",
      left: "-2px",
      top: "-4px",
      width: "22px",
      height: "22px",
      backgroundColor: "orange",
      zIndex: -1
    }
  })
}));

//   $ =>

//   ${(props: IDayProps) =>

//     `}

// `;

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
