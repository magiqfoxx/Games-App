import React from "react";
import { connect } from "react-redux";

const Points = props => {
  return <div id="points">{props.points}pts.</div>;
};

const mapStateToProps = state => {
  return {
    points: state.points
  };
};
export default connect(
  mapStateToProps,
  {}
)(Points);
