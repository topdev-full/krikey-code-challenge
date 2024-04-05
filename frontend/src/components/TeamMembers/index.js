import React from "react";
import TeamMember from "../TeamMember";
import "./index.css";

const TeamMembers = ({ members }) => (
  <div className="team-members-container">
    <div className="header flex items-center">
      <img src="/arrow.svg" alt="arrow" />
      <div className="flex-1" style={{textAlign: "center"}}>You have {members.length} Team Members</div>
      <div style={{width: 24}}></div>
    </div>
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
