import React, { useRef, useState, useLayoutEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { view } from "react-easy-state";
import { Icon } from "../../icons";
import * as s from "../../styles";
import { state } from "../../state";
import {
  SettingsWrapper,
  ToggleButton,
  ToggleButtonIconWrapper,
  ToggleButtonSpacer,
} from "./mod/styled";
import { SettingsContent } from "./mod/settings-content";
import { scrollTop, scrollBottom } from "./mod/utils";

export const Settings = view(() => {
  const settingsWrapperEl = useRef<HTMLElement>(null);

  const [previousDevMenuVisible, setPreviousDevMenuVisible] = useState<boolean | null>(null);
  const [previousSettingsOpened, setPreviousSettingsOpened] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    if (!settingsWrapperEl.current) return;

    if (previousSettingsOpened !== null) {
      if (state.settings.opened === false) {
        // Scroll to top when we are closing
        scrollTop(settingsWrapperEl.current);
      }
      if (state.debug.devMenuVisible === true && previousDevMenuVisible === false) {
        // Scroll to bottom when we show dev menu
        scrollBottom(settingsWrapperEl.current);
      }
    }

    setPreviousSettingsOpened(state.settings.opened);
    setPreviousDevMenuVisible(state.debug.devMenuVisible);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    previousSettingsOpened,
    previousDevMenuVisible,
    state.settings.opened,
    state.debug.devMenuVisible,
  ]);

  return (
    <OutsideClickHandler onOutsideClick={state.settings.closeSettings}>
      <SettingsWrapper
        opened={state.settings.opened}
        hiddenUnlessHovered={state.settings.cleanVersion && !state.settings.opened}
        ref={settingsWrapperEl}
      >
        <ToggleButton onClick={state.settings.toggleSettingsOpened}>
          <ToggleButtonIconWrapper rotated={state.settings.opened}>
            <Icon
              type="COG"
              width={s.sizeNumberToGridNumber(s.dimensions.settingsButtonSize)}
              height={s.sizeNumberToGridNumber(s.dimensions.settingsButtonSize)}
            />
          </ToggleButtonIconWrapper>
        </ToggleButton>

        <ToggleButtonSpacer />

        <div inert={state.settings.opened === false ? "inert" : null}>
          <SettingsContent />
        </div>
      </SettingsWrapper>
    </OutsideClickHandler>
  );
});
