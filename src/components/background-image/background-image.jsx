import React from "react";
import PropTypes from "prop-types";

class ComponentName extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return <div style={{ backgroundImage: `url(${this.props.url})` }} />;
  }
}
