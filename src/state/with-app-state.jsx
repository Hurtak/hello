import React from "react";
import { Subscribe } from "unstated";
import AppState from "./app-state-container.js";

export default function withAppState(Component) {
  return class extends React.Component {
    render() {
      return (
        <Subscribe to={[AppState]}>{app => <Component app={app} />}</Subscribe>
      );
    }
  };
}
