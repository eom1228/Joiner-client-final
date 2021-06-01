import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';

import axios from 'axios';

// import Footer from './footer';
// import NavBar from './navBar';
axios.defaults.withCredentials = true;

const GroupsByCategoryPage = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios
      .get('/category/GroupList', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        setGroups({
          groups: res.dataValues.title,
          category: res.dataValues.category,
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
  const handleClickGroup = e => {
    axios
      .post('/category/GroupList', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          [group.id]: e.target.id,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        res.dataValues.id;
        history.push('/groupPage');
        // history.push(`/groupPage/${res.dataValues.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  // const handleClickCategory = e => {};

  // const categoryFilter = () => {};

  return (
    <ul>
      {groups.map(group => (
        <li>
          {/* <button onClick={handleClickCategory}>{group.category}</button> */}
          <button onClick={handleClickGroup}>{group.name}</button>
        </li>
      ))}
    </ul>
  );
};
export default GroupsByCategoryPage;
