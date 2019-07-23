import React from "react";

import { SettingsHeader } from "./mod/settings-header";
import { SettingsImageSource } from "./mod/settings-image-source";
import { SettingsImageSettings } from "./mod/settings-image-settings";
import { SettingsImageInformation } from "./mod/settings-image-information";
import { SettingsViewType } from "./mod/settings-view-type";
import { SettingsViewSettings } from "./mod/settings-view-settings";
import { SettingsCleanVersion } from "./mod/settings-clean-version";
import { SettingsContact } from "./mod/settings-contact";
import { SettingsDebug } from "./mod/settings-debug";

export const SettingsContent = () => (
  <>
    <SettingsHeader />

    <SettingsImageSource />
    <SettingsImageSettings />
    <SettingsImageInformation />

    <SettingsViewType />
    <SettingsViewSettings />

    <SettingsCleanVersion />
    <SettingsContact />
    <SettingsDebug />
  </>
);
