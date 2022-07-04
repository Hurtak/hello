import { view } from "react-easy-state";

import { state } from "../../../../../state";
import { never } from "../../../../../utils/never";
import { Dash, Link, List, ListItem, Section } from "./styled";

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
            {state.image.imageBingWithFallback.copyright && (
              <ListItem>
                Author <Dash /> {state.image.imageBingWithFallback.copyright}
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

        {state.image.imageLocal.author && (
          <ListItem>
            Author <Dash />{" "}
            <Link href={state.image.imageLocal.author.url}>
              {state.image.imageLocal.author.name}
            </Link>
          </ListItem>
        )}

        {state.image.imageLocal.source && (
          <ListItem>
            Source <Dash />{" "}
            <Link href={state.image.imageLocal.source.url}>
              {(() => {
                switch (state.image.imageLocal.source.type) {
                  case "UNSPLASH":
                    return <>Unsplash.com</>;
                  default:
                    never(state.image.imageLocal.source.type);
                }
              })()}
            </Link>
          </ListItem>
        )}
      </List>
    )}
  </Section>
));
