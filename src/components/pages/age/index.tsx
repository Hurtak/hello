import React from "react";
import { Wrapper, AgePosition, AgeBox, AgeText } from "./styled";
import { Timestamp } from "../../timer-updater";
import * as time from "../../../utils/time";

export const Age: React.FC<{
  time: Timestamp;
  birthDate: number;
  decimalPlaces: number;
}> = props => {
  const years = (props.time - props.birthDate) / time.year;

  return (
    <Wrapper>
      <AgePosition>
        <AgeBox>
          <AgeText>{years.toFixed(props.decimalPlaces)}</AgeText>
        </AgeBox>
      </AgePosition>
    </Wrapper>
  );
};
