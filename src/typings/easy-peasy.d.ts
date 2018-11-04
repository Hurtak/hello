declare module "easy-peasy" {
  export function StoreProvider(): any;

  export function createStore(any, any): any;
  export function useStore(state: S): S;
  export function useAction(any): any;

  export function select(any): any;
  export function effect(any): any;
}
