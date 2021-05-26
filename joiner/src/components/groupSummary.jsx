import React, { useState, useReducer, useContext, useEffect } from 'react';

const GroupSummary = ({ group }) => {
  const { groupName, category, host, memberCount, location } = group;
  //   const [groupSummaryState, setGroupSummaryState] = useState([
  //     {
  //       groupName: groupName,
  //       category: category,
  //       host: host,
  //       memberCount: memberCount,
  //       location: location,
  //     },
  //   ]);

  return (
    <div className="groupSummary">
      <h1>{groupName}</h1>
      <div>{category}</div>
      <div>{host}</div>
      <div>{memberCount}</div>
      <div>{location}</div>
    </div>
  );
};
export default GroupSummary;
