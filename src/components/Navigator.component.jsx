import React from "react";
import { Link } from "react-router-dom";

const Navigator = ({ path, label, type }) => {
  return (
    <Link
      to={`/${path}`}
      className=" text-neutral-800/50 text-sm  capitalize cursor-pointer select-none"
    >
      {label}{" "}
      <span className=" underline text-neutral-800  font-semibold">
        {type} Here
      </span>
    </Link>
  );
};

export default Navigator;
