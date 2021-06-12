import React, { useState, useEffect } from 'react';
import { useHistory, useParams, withRouter, Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import axios from 'axios';
import '../styles/groupsByCategoryPage.scss';
// import Footer from './footer';
// import NavBar from './navBar';
axios.defaults.withCredentials = true;

const GroupsByCategoryPage = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mapId, setMapId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    name: '',
    filePath: '',
  });
  const [userInputs, setUserInputs] = useState({ searchedGroup: '' });
  const [groupFilter, setGroupFilter] = useState(false);
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
    setSelectedCategory({ name: e.target.name, filePath: e.target.filePath });
    console.log(e.target);
  };
  const searchFilter = () => {
    setGroupFilter(true);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  return selectedCategory ? ( // 클릭된 카테고리가 있을 시
    <div className="categoryGroupBox">
      // 카테고리와 그룹을 포함한 전체 컨테이너
      <h3>원하는 카테고리를 선택해 보아요!</h3>
      <div className="searchInterface">
        // 그룹명 검색창
        <input
          value={userInputs.searchedGroup}
          name="searchedGroup"
          className="searchbox"
          type="text"
          placeholder="그룹을 검색하세요"
          onChange={handleChange}
          style={{ marginTop: '20px' }}
        />
        <button id="searchBtn" onClick={searchFilter}>
          검색
        </button>
      </div>
      <div className="categoryContainer">
        // 카테고리 목록 컨테이너
        <div className="selectedCategory">
          <div className="selectedCategoryIcon">
            <img
              src={`http://localhost:4000/${selectedCategory.filePath}`}
            ></img>
          </div>
          <div className="selectedCategoryName">{selectedCategory.name}</div>
        </div>
        <div>
          {categories // 클릭된 카테고리를 제외한 나머지 카테고리 (이미지 + 사진)
            .filter(category => category.title !== selectedCategory.name)
            .map(filteredCategory => (
              <li key={filteredCategory.id}>
                <img
                  src={`http://localhost:4000/${filteredCategory.filePath}`}
                  onClick={handleClickCategory}
                ></img>
                <button
                  onClick={handleClickCategory}
                  value={filteredCategory.id}
                >
                  {filteredCategory.title}
                </button>
              </li>
            ))}
        </div>
      </div>
      {groupFilter ? ( // 그룹명 검색 시 :
        <ul className="searchResults">
          {groups
            .filter(group => {
              // 그룹명 중 검색한 그룹명과 일치하는 그룹을 반환
              if (group.title.includes(userInputs.searchedGroup)) {
                return group;
              }
            })
            .map(filteredGroup => {
              return (
                <li>
                  <div style={{ display: 'flex' }}>
                    <img src={filteredGroup.filePath}></img>
                    <button onClick={handleClickGroup} value={filteredGroup.id}>
                      {filteredGroup.title}
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      ) : (
        // 그룹명 검색을 안했다면  :
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
                      <button
                        onClick={handleClickGroup}
                        value={filteredGroup.id}
                      >
                        {filteredGroup.title}
                      </button>
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
      )}
    </div> // -----------------------------------------------------------
  ) : (
    // 첫화면: 카테고리 목록, 그룹 목록 불러오기  (카테고리 선택 안한 상황)
    <div className="categoryGroupBoxNotSelected">
      <h3>원하는 카테고리를 선택해 보아요!</h3>
      <div className="searchInterface">
        <input
          value={userInputs.searchedGroup}
          name="searchedGroup"
          className="searchbox"
          type="text"
          placeholder="이름을 검색하세요"
          onChange={handleChange}
          style={{ marginTop: '20px' }}
        />
        <button id="searchBtn" onClick={searchFilter}>
          검색
        </button>
      </div>
      <div className="categoryGroupLists">
        <div className="categoryContainerNotSelected">
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                <img
                  src={`http://localhost:4000/${category.filePath}`}
                  onClick={handleClickCategory}
                ></img>
                <button onClick={handleClickCategory} value={category.id}>
                  {category.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {groupFilter ? (
          <ul className="searchResults">
            {groups
              .filter(group => {
                if (group.title.includes(userInputs.searchedGroup)) {
                  return group;
                }
              })
              .map(filteredGroup => {
                return (
                  <li>
                    <div style={{ display: 'flex' }}>
                      <button
                        onClick={handleClickGroup}
                        value={filteredGroup.id}
                      >
                        {filteredGroup.title}
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        ) : (
          <div className="groupContainerNotSelected">
            <ul>
              {groups.map(group => (
                <li key={group.id}>
                  <button onClick={handleClickGroup} value={group.id}>
                    {group.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default withRouter(GroupsByCategoryPage);
