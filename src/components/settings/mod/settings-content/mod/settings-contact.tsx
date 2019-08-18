import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Text, Section, ContactLinks, SpacedItems, ContactLink, Spacer } from "./styled";

export const SettingsContact = view(() => {
  if (state.settings.cleanVersion) return null;

  return (
    <Section title="Who did this?">
      <Text>
        I did! If you find any bugs or if you would like to tell me how much you like this swell
        plugin you can do that. Also, this plugin is open-source, so you contribute on GitHub!
      </Text>

      <Spacer size={1} />

      <ContactLinks>
        <SpacedItems spacing={1} horizontal>
          <ContactLink iconType="GITHUB" href="https://github.com/hurtak/hello">
            Github
          </ContactLink>
          <ContactLink iconType="TWITTER" href="https://twitter.com/PetrHurtak">
            Twitter
          </ContactLink>
          <ContactLink iconType="MAIL" href="mailto:petr.hurtak@gmail.com">
            Mail
          </ContactLink>
        </SpacedItems>
      </ContactLinks>
    </Section>
  );
});
