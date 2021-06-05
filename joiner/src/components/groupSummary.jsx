import React from 'react';

const GroupSummary = ({ group }) => {
  const { title, category, host, memberCount } = group;
  //   const [groupSummaryState, setGroupSummaryState] = useState([
  //     {
  //       groupName: groupName,
  //       category: category,
  //       host: host,
  //       memberCount: memberCount,
  //       location: location,
  //     },
  //   ]);
  if (!group) {
    return null;
  } else {
    console.log(group);
    return (
      <div className="groupSummary">
        <h1>{title}</h1>
        <div>{category}</div>
        <div>{host}</div>
        <div>{memberCount}</div>
      </div>
    );
  }
};
export default GroupSummary;
