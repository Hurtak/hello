import React from "react";
import { Subscribe } from "unstated";
import AppState from "./app-state-container.js";
import AppStateType from "./app-state-type";

export default function withAppState(
  Component: React.ComponentType<{ app: AppStateType }>
) {
  return class extends React.Component {
    render() {
      return (
        <Subscribe to={[AppState]}>
          {app => <Component app={app} {...this.props} />}
        </Subscribe>
      );
    }
  };
}
