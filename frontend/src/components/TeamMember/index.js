import React from "react";
import "./index.css";

const TeamMember = ({ name, email }) => (
  <div className="team-member">
    <div className="flex">
      <img src="/avatar.jpg" alt={name} className="avatar" />
      <div>
        <div className="name">{name}</div>
        <div className="email">{email}</div>
      </div>
    </div>
    <img className="remove-button" src="/cross.svg" />
  </div>
);

export default TeamMember;
