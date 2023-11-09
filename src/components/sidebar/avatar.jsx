import React from "react";
import Avatar from "react-avatar";

const SidebarAvatar = ({
  name,
  src,
  size = "42px",
  className = "left-bar__avatar",
}) => {
  return (
    <div className={className}>
      <Avatar maxInitials={2} size={size} round={true} name={name} src={src} />
    </div>
  );
};

export default SidebarAvatar;
