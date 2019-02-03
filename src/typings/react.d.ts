import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    inert?: "inert" | null;
  }
}
