import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Section, List, ListItem, Dash, Link } from "./styled";

export const SettingsImageInformation = view(() => (
  <Section title="Image information">
    {state.image.imageSourceWithFallback === "BING" && (
      <>
        {state.image.imageBing.type === "FETCHING" && (
          <List>
            <ListItem>Fetching&hellip;</ListItem>
          </List>
        )}
        {state.image.imageBing.type === "DONE" && (
          <List>
            {state.image.imageBing.data.title && (
              <ListItem>
                Title <Dash /> {state.image.imageBing.data.title}
              </ListItem>
            )}
            {state.image.imageBing.data.description && (
              <ListItem>
                Description <Dash /> {state.image.imageBing.data.description}
              </ListItem>
            )}
            {state.image.imageBing.data.link && (
              <ListItem>
                <Link href={state.image.imageBing.data.link}>Link</Link>
              </ListItem>
            )}
          </List>
        )}
      </>
    )}

    {state.image.imageSourceWithFallback === "LOCAL" && (
      <List>
        <ListItem>
          Image <Dash /> {state.image.imageLocalIndex + 1}/{state.image.imagesLocal.length}
        </ListItem>
        {state.image.imageLocal.name && (
          <ListItem>
            Name <Dash /> {state.image.imageLocal.name}
          </ListItem>
        )}
        {state.image.imageLocal.location && (
          <ListItem>
            Location <Dash /> {state.image.imageLocal.location}
          </ListItem>
        )}
        {state.image.imageLocal.source && (
          <ListItem>
            <Link href={state.image.imageLocal.source}>Source</Link>
          </ListItem>
        )}
      </List>
    )}
  </Section>
));
