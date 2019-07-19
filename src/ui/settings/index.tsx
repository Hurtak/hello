import React from "react";
import { view } from "react-easy-state";
import OutsideClickHandler from "react-outside-click-handler";
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

export const Settings = view(() => (
  <OutsideClickHandler onOutsideClick={state.settings.closeSettings}>
    <SettingsWrapper settingsHidden={state.settings.cleanVersion && !state.settings.opened}>
      <ToggleButton onClick={state.settings.toggleSettingsOpened}>
        <ToggleButtonIconWrapper rotated={state.settings.opened}>
          <Icon
            type="COG"
            width={s.rawSizeToGridRaw(s.dimensions.settingsButtonSize)}
            height={s.rawSizeToGridRaw(s.dimensions.settingsButtonSize)}
          />
        </ToggleButtonIconWrapper>
      </ToggleButton>

      <ToggleButtonSpacer />

      <div inert={state.settings.opened === false ? "inert" : null}>
        <SettingsContent />
      </div>
    </SettingsWrapper>
  </OutsideClickHandler>
));
