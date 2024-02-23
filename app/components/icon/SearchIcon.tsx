import React from "react";
export const SearchIcon = ({
  fill = "none",
  height = "22",
  width = "22",
  label = "",
  stroke = "",
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill={fill}
    focusable="false"
    height={height}
    role="presentation"
    viewBox="0 0 24 24"
    width={width}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
