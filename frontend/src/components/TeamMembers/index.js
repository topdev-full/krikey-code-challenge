import React from "react";
import TeamMember from "../TeamMember";
import './index.css';

const TeamMembers = ({ members }) => (
  <div className="team-members-container">
    <div className="header">You have {members.length} Team Members</div>
    <div className="team-members-list">
      {members.map((member) => (
        <TeamMember
          key={member.email}
          name={member.name}
          email={member.email}
        />
      ))}
    </div>
  </div>
);

export default TeamMembers;
