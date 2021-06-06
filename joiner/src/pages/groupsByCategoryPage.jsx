import React, { useState, useEffect } from 'react';
import { useHistory, useParams, withRouter, Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import data from '../dummyData/groupDummy';
import axios from 'axios';

// import Footer from './footer';
// import NavBar from './navBar';
axios.defaults.withCredentials = true;

const GroupsByCategoryPage = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mapId, setMapId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { mapping_id } = groupCurrentState;
  // const { mapping_id } = useParams();
  // const { id } = useParams();
  const getData = () => {
    const getGroupList = axios.get(
      'https://localhost:4000/category/groupList',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossDomain: true,
      },
    );
    const getCategoryList = axios.get(
      'https://localhost:4000/category/categoryList',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossDomain: true,
      },
    );

    axios.all([getGroupList, getCategoryList]).then(
      axios.spread((...allData) => {
        const allDataGroups = allData[0].data;
        const getCategories = allData[1].data;

        console.log(allDataGroups);
        console.log(getCategories);

        setGroups(allDataGroups);
        setCategories(getCategories);
      }),
    );
  };

  useEffect(() => {
    // console.log("1" + )
    getData();
  }, [mapId]);

  // const handleClickGroup = e => {
  //   console.log(e.target.value);
  //   axios
  //     .post('https://localhost:4000/category/groupList', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       data: {
  //         group_id: e.target.value,
  //       },
  //       withCredentials: true,
  //       crossDomain: true,
  //     })
  //     .then(res => {
  //       // res.data.id;
  //       console.log(res.data.group_id);
  //       // history.push('/groupPage');
  //       console.log(res);
  //       if (res.status === 200) {
  //         history.push(`/groupPage/${res.data.group_id}`);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  const handleClickGroup = e => {
    setMapId(e.target.value);
    const id = e.target.value;
    groupDispatch({
      type: 'SET_GROUPID',
      mapping_id: id,
    });

    console.log(e.target.value);

    console.log(mapping_id);

    history.push('/groupPage');
    // setTimeout(() => {
    //   history.push(`/groupPage/${mapping_id}`);
    // }, waitSecs);
  };

  const handleClickCategory = e => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  // const categoryFilter = () => {};

  return selectedCategory ? ( // 클릭된 카테고리가 있을 시
    <div className="categoryGroupBox">
      <h3>원하는 모임에 가입해보세요!</h3>
      <p className="categoryContainer">{selectedCategory}</p>
      <div className="groupContainer">
        <ul>
          {groups
            .filter(group => {
              // console.log(group.category_id);
              // console.log(group.category_id == selectedCategory);
              return group.category_id == selectedCategory;
            })
            .map(filteredGroup => {
              return (
                <>
                  {console.log(filteredGroup)}
                  <li key={filteredGroup.id}>
                    {/* <Link
                      to={`/groupPage/${filteredGroup.id}`}
                      // 그룹명 클릭 -> 해당 그룹페이지로
                      value={filteredGroup.id}
                    > */}
                    <button onClick={handleClickGroup} value={filteredGroup.id}>
                      {filteredGroup.title}
                    </button>
                    {/* </Link> */}
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </div> // -----------------------------------------------------------
  ) : (
    // 첫화면: 카테고리 목록, 그룹 목록 불러오기
    <div className="categoryGroupBox">
      <h3>원하는 모임에 가입해보세요!</h3>
      <div className="categoryContainer">
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <button onClick={handleClickCategory} value={category.id}>
                {' '}
                {category.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="groupContainer">
        <ul>
          {groups.map(group => (
            <li key={group.id}>
              {/* <Link to={`/groupPage/${group.id}`} value={group.id}> */}{' '}
              <button onClick={handleClickGroup} value={group.id}>
                {group.title}
              </button>
              {/* </Link> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default withRouter(GroupsByCategoryPage);
