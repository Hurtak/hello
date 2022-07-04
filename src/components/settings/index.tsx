import React, { useLayoutEffect, useRef, useState } from "react";
import { view } from "react-easy-state";

import { Icon } from "../../icons";
import { state } from "../../state";
import * as s from "../../styles";
import { LogPerformance } from "../../utils/logging";
import { OutsideClick } from "../utils/outside-click";
import {
  SettingsStyled,
  SettingsWrapper,
  ToggleButton,
  ToggleButtonIconWrapper,
  ToggleButtonSpacer,
} from "./mod/styled";
import { scrollBottom, scrollTop } from "./mod/utils";

const SettingsContentLazy = React.lazy(() => {
  const performanceSettings = new LogPerformance("Settings code download");
  return import("./mod/settings-content").then((mod) => {
    performanceSettings.measure();
    return mod;
  });
});

export const Settings = view(() => {
  const settingsWrapperEl = useRef<HTMLDivElement>(null);

  const [previousSettingsOpened, setPreviousSettingsOpened] = useState<boolean | null>(null);
  const [previousDebugMenuScrollAnimationRequestNr, setPreviousDebugMenuScrollAnimationRequestNr] =
    useState<number | null>(null);

  useLayoutEffect(() => {
    if (!settingsWrapperEl.current) return;

    // Scroll to top when settings is closing
    if (previousSettingsOpened !== null && state.settings.opened === false) {
      scrollTop(settingsWrapperEl.current);
    }

    // Scroll to debug menu (bottom of settings) when we show debug menu
    if (
      previousDebugMenuScrollAnimationRequestNr !== null &&
      state.debug.debugMenuVisible === true &&
      state.debug.debugMenuScrollAnimationRequestNr !== previousDebugMenuScrollAnimationRequestNr
    ) {
      scrollBottom(settingsWrapperEl.current);
    }

    setPreviousSettingsOpened(state.settings.opened);
    setPreviousDebugMenuScrollAnimationRequestNr(state.debug.debugMenuScrollAnimationRequestNr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    previousSettingsOpened,
    previousDebugMenuScrollAnimationRequestNr,
    state.settings.opened,
    state.debug.debugMenuVisible,
  ]);

  return (
    <OutsideClick onOutsideClick={() => state.settings.closeSettings()}>
      <SettingsWrapper
        ref={settingsWrapperEl}
        opened={state.settings.opened}
        hiddenUnlessHovered={state.settings.cleanVersion && !state.settings.opened}
      >
        <SettingsStyled>
          <ToggleButton onClick={() => state.settings.toggleSettingsOpened()}>
            <ToggleButtonIconWrapper rotated={state.settings.opened}>
              <Icon
                type="COG"
                width={s.sizeNumberToGridNumber(s.dimensions.settingsButtonSize)}
                height={s.sizeNumberToGridNumber(s.dimensions.settingsButtonSize)}
              />
            </ToggleButtonIconWrapper>
          </ToggleButton>

          <ToggleButtonSpacer />

          <div inert={state.settings.opened === false ? "inert" : undefined}>
            <React.Suspense fallback={null}>
              <SettingsContentLazy />
            </React.Suspense>
          </div>
        </SettingsStyled>
      </SettingsWrapper>
    </OutsideClick>
  );
});
