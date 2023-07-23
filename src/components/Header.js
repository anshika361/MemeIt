import React from "react";

export default function Header() {
  return (
    <header className="header">
      <img
        className="trollimg"
        src={require("../images/Troll Face.png")}
        alt=""
      />
      <h2 className="troll_name">MemeIt</h2>
    </header>
  );
}
