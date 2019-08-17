import styled from "styled-components/macro";
import * as s from "../../../styles";

export const Wrapper = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
});

type ImageProps = {
  visible?: boolean;
  noAnimation?: boolean;
  backgroundImage?: string | null;
};

export const Image = styled.div.attrs((props: ImageProps) => ({
  style: {
    backgroundImage: props.backgroundImage ? `url("${props.backgroundImage}")` : "none",
  },
}))((props: ImageProps) => ({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  transition: props.noAnimation ? "initial" : s.animation.backgroundImage,
  opacity: props.visible ? 1 : 0,
}));
