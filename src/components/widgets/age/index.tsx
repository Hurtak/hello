import { FC } from "react";

import { Timestamp } from "../../utils/timer-updater";
import { AgeBox, AgePosition, AgeText, Wrapper } from "./mod/styled";
import { getAgeInYears } from "./mod/utils";

export const Age: FC<{
  time: Timestamp;
  birthDate: Timestamp;
  decimalPlaces: number;
}> = (props) => {
  const years = getAgeInYears(props.time, props.birthDate);

  return (
    <Wrapper>
      <AgePosition>
        <AgeBox>
          <AgeText>{Math.max(years, 0).toFixed(props.decimalPlaces)}</AgeText>
        </AgeBox>
      </AgePosition>
    </Wrapper>
  );
};
