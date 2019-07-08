import styled from "styled-components/macro";
import * as s from "../../../../styles";

export const MonthsWrapper = styled.ul({
  display: "grid",
  gridTemplateColumns: "repeat(4, auto)",
  gridGap: s.grid(1),
  listStyleType: "none",
  margin: 0,
  padding: 0,
});

export const Month = styled.li({
  display: "block",
  padding: s.grid(2),
  backgroundColor: s.colors.blackTransparent40,
});

export const MonthName = styled.h2({
  ...s.text(),

  display: "block",
  margin: 0,
  textAlign: "center",
});

export const DaysWrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(7, auto)",
  gridGap: "${s.grid(1)} 0",
  justifyContent: "space-between",
  padding: 0,
  marginTop: s.grid(2),
  listStyleType: "none",
});

export const Day = styled.div(
  (props: { heading?: boolean; currentDay?: boolean; selected?: boolean }) => ({
    ...s.text({
      weight: props.heading || props.currentDay ? "BOLD" : "DEFAULT",
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
        zIndex: -1,
      },
    }),
  }),
);
