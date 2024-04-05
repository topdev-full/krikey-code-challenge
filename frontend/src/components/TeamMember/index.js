import React from "react";
import './index.css';

const TeamMember = ({ name, email }) => (
  <div className="team-member">
    <svg src="path_to_avatar_image" alt={name} className="avatar" />
    <div className="member-info">
      <div className="name">{name}</div>
      <div className="email">{email}</div>
    </div>
    <button className="remove-button">X</button>
  </div>
);

export default TeamMember;
