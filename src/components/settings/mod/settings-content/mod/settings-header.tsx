import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Text, Heading } from "./styled";

export const SettingsHeader = view(() => (
  <>
    <Heading>Hello</Heading>

    {!state.settings.cleanVersion && (
      <Text>
        How are you doing? Enjoy daily new image from bing.com, or in case you are offline there is
        dozen of nice wallpapers from nature that I liked. You can also display a widget. Some are
        traditional, like a clock, some are meant to motivate you a little.
      </Text>
    )}
  </>
));
