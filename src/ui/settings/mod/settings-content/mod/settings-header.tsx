import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Text, Heading } from "./styled";

export const SettingsHeader = view(() => (
  <>
    <Heading>Hello</Heading>

    {!state.settings.cleanVersion && (
      <Text>
        Welcome to your new handsome new-tab page. Enjoy a nice background from Bing every day or
        take a look at some of the fine backgrounds that I preselected. There is also a bunch of
        useful things that you can display in front of the background, like clock and stuff!
      </Text>
    )}
  </>
));
