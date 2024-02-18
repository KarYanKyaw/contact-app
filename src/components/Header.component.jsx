import React from "react";

const Header = ({ header, text, style }) => {
  return (
    <div className="register-header space-y-1">
      <p
        className={`text-3xl mb-2 font-semibold ${style} text-neutral-900 font-serif`}
      >
        {header}
      </p>
      <p className="text-neutral-900/70 font-sans">{text}</p>
    </div>
  );
};

export default Header;
