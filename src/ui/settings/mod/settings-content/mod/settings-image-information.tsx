import React from "react";
import { view } from "react-easy-state";
import { state } from "../../../../../state";
import { Section, List, ListItem, Dash, Link } from "./styled";

export const SettingsImageInformation = view(() => (
  <Section title="Image information">
    {state.image.imageSourceWithFallback === "BING" && (
      <>
        {!state.image.imageBingWithFallback && state.image.imageBing.type === "FETCHING" && (
          <List>
            <ListItem>Fetching&hellip;</ListItem>
          </List>
        )}
        {state.image.imageBingWithFallback && (
          <List>
            {state.image.imageBingWithFallback.title && (
              <ListItem>
                Title <Dash /> {state.image.imageBingWithFallback.title}
              </ListItem>
            )}
            {state.image.imageBingWithFallback.description && (
              <ListItem>
                Description <Dash /> {state.image.imageBingWithFallback.description}
              </ListItem>
            )}
            {state.image.imageBingWithFallback.link && (
              <ListItem>
                <Link href={state.image.imageBingWithFallback.link}>Link</Link>
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
