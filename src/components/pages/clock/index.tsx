import React from "react";
import { Wrapper, ClockBox, TextWrapper, Text, ColonWrapper, ColonCircle } from "./styled";
import { Timestamp } from "../../timer-updater";
import { addLeadingZero } from "../../../utils/time";

type ClockProps = {
  time: Timestamp;
  showSeconds: boolean;
};

export const Clock: React.FC<ClockProps> = props => {
  const date = new Date(props.time);

  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());

  return (
    <Wrapper>
      <ClockBox>
        <TextWrapper>
          <Text>{hours}</Text>
          <Colon />
          <Text>{minutes}</Text>
          {props.showSeconds && (
            <>
              <Colon />
              <Text>{seconds}</Text>
            </>
          )}
        </TextWrapper>
      </ClockBox>
    </Wrapper>
  );
};

const Colon: React.FC = () => {
  return (
    <ColonWrapper>
      <ColonCircle />
      <ColonCircle />
    </ColonWrapper>
  );
};
