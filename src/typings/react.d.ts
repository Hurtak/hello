// eslint-disable-next-line react/no-typos
import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLAttributes {
    inert?: "inert";
  }
}
