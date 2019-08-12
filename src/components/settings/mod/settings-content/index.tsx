import React, { useEffect } from "react";

import { logTimestamp } from "../../../../utils/logging";

import { SettingsHeader } from "./mod/settings-header";
import { SettingsImageSource } from "./mod/settings-image-source";
import { SettingsImageSettings } from "./mod/settings-image-settings";
import { SettingsImageInformation } from "./mod/settings-image-information";
import { SettingsViewType } from "./mod/settings-view-type";
import { SettingsViewSettings } from "./mod/settings-view-settings";
import { SettingsCleanVersion } from "./mod/settings-clean-version";
import { SettingsContact } from "./mod/settings-contact";
import { SettingsDebug } from "./mod/settings-debug";

export const SettingsContent = () => {
  useEffect(() => {
    logTimestamp("Settings rendered");
  }, []);

  return (
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
};

// For React.lazy
export default SettingsContent;
