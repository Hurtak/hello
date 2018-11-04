import "react";

declare module "react" {
  export function useState(any): any;
  export function useEffect(any, x?: any): any;
  export function useLayoutEffect(any): any;
  export function useRef(any): any;

  interface HTMLAttributes<T> {
    inert?: "true" | null;
  }
}
