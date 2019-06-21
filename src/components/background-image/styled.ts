import styled from "styled-components/macro";

export const Image = styled.div(
  (props: { topImage?: boolean; imageLoaded: boolean; backgroundImage: string | null }) => ({
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: props.backgroundImage ? `url("${props.backgroundImage}")` : "none",
    transition: "opacity 0.3s ease",
    zIndex: props.topImage ? 2 : 1,
    opacity: props.imageLoaded ? 1 : 0,
  }),
);
