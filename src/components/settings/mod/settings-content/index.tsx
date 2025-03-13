import { useEffect } from "react";

import { logTimestamp } from "../../../../utils/logging";
import { SettingsCleanVersion } from "./mod/settings-clean-version";
import { SettingsContact } from "./mod/settings-contact";
import { SettingsDebug } from "./mod/settings-debug";
import { SettingsHeader } from "./mod/settings-header";
import { SettingsImageInformation } from "./mod/settings-image-information";
import { SettingsImageSettings } from "./mod/settings-image-settings";
import { SettingsImageSource } from "./mod/settings-image-source";
import { SettingsViewSettings } from "./mod/settings-view-settings";
import { SettingsViewType } from "./mod/settings-view-type";

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
