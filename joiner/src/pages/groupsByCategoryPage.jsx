import React, { useState, useEffect } from 'react';
import { useHistory, useParams, withRouter, Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import axios from 'axios';
import '../styles/groupsByCategoryPage.scss';

axios.defaults.withCredentials = true;

const GroupsByCategoryPage = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mapId, setMapId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    name: '',
    fileName: '',
  });
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { mapping_id } = groupCurrentState;

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
    getData();
  }, [mapId]);

  useEffect(() => {}, [selectedCategory]);
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
  };

  const handleClickCategory = e => {
    setSelectedCategory({
      name: e.target.name,  
      fileName: e.target.fileName,
    });
    console.log(e.target);
  };

  return (
    <div className="categoryGroupBoxNotSelected">
      <h3>원하는 카테고리의 그룹을 선택해 보아요!</h3>

      <div className="categoryGroupLists">
        <div className="categoryContainerNotSelected">
          <div className="categoryRow">
            {categories.map(category => (
              <div id="categoryPair">
                <img
                  name={category.id}
                  id="categoryIcon"
                  src={`https://localhost:4000/categoryImgs/${category.fileName}`}
                  style={{ width: '100%', height: '100%' }}
                  onClick={handleClickCategory}
                ></img>
              </div>
            ))}
          </div>
        </div>
        <div className="groupContainerNotSelected">
          <ul>
            {console.log('Categ1' + groups)}
            {console.log(
              'Categ2',
              groups
                .map(group => group.category_id)
                .filter(id => id == selectedCategory.name)[0],
            )}
            {console.log('Categ3' + selectedCategory.name)}
            {groups
              .map(group => group.category_id)
              .filter(group => group == selectedCategory.name)[0] ==
            selectedCategory.name ? (
              <>
                {groups
                  .filter(group => {
                    return group.category_id == selectedCategory.name;
                  })
                  .map(group => {
                    return (
                      <li key={group.id}>
                        <button
                          className="groupTitle"
                          onClick={handleClickGroup}
                          value={group.id}
                        >
                          {group.title}
                        </button>
                      </li>
                    );
                  })}
              </>
            ) : (
              <>
                {groups.map(
                  (
                    group,  
                  ) => (
                    <li key={group.id}>
                      <button
                        className="groupTitle"
                        onClick={handleClickGroup}
                        value={group.id}
                      >
                        {group.title}
                      </button>
                    </li>
                  ),
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default withRouter(GroupsByCategoryPage);
