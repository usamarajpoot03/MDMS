import React from "react";
import classNames from "classnames/bind";

const Spinner = ({
  isSmall = false,
  isCenter = false,
  isLight = false,
  styles = {},
}) => {
  return (
    <div
      className={classNames({
        "spinner-border": true,
        "text-primary": !isLight,
        "spinner-center": isCenter,
        "spinner-border-sm": isSmall,
        "text-light": isLight,
      })}
      role="status"
      style={styles}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const GrowSpinner = ({ styles = {} }) => {
  return (
    <>
      <div
        className="spinner-grow spinner-grow-sm"
        style={styles}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="spinner-grow spinner-grow-sm"
        style={styles}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="spinner-grow spinner-grow-sm"
        style={styles}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default Spinner;
