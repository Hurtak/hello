import React from "react";
import { Subscribe } from "unstated";
import AppState from "./app-state-container";
import AppStateType from "./app-state-type";

export default function withAppState(
  // Component: React.ComponentType<{ app: AppStateType }>
  Component: any
) {
  return (props: any) => {
    return (
      <Subscribe to={[AppState]}>
        {app => <Component app={app} {...props} />}
      </Subscribe>
    );
  };
}
