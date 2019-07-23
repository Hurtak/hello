import React, { useLayoutEffect, useRef } from "react";
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

export const Settings = view(() => {
  const settingsWrapperEl = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!settingsWrapperEl.current) return;

    if (state.settings.opened === false) {
      // TODO: which one oto use, .scroll. scrollBy or .scrollTo
      settingsWrapperEl.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  });

  return (
    <OutsideClickHandler onOutsideClick={state.settings.closeSettings}>
      <SettingsWrapper
        opened={state.settings.opened}
        hidden={state.settings.cleanVersion && !state.settings.opened}
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
