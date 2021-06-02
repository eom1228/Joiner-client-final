import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const [selectedCategory, setSelectedCategory] = useState('');

  //   const catData = {
  //     categories: [
  //       {
  //         id: 1,
  //         name: '축구',
  //       },
  //       {
  //         id: 2,
  //         name: '공부',
  //       },
  //       {
  //         id: 3,
  //         name: '카페',
  //       },
  //       {
  //         id: 4,
  //         name: '애완동물',
  //       },
  //     ],
  //   };

  const getData = () => {
    const getGroupList = axios.get('https://localhost:4000/category/GroupList');
    const getCategoryList = axios.get(
      'https://localhost:4000/category/categoryList',
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
  }, []);
  // axios
  //   .get('https://localhost:4000/category/GroupList', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     withCredentials: true,
  //     crossDomain: true,
  //   })
  //   .then(res => {
  //     setGroups({
  //       groups: res.data.title,
  //       category: res.data.category,
  //     });
  //     console.log(groups);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });


  const handleClickGroup = e => {
    console.log(e.target.value);
    axios
      .post('https://localhost:4000/category/GroupList', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: e.target.id,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        res.dataValues.id;
        history.push('/groupPage');
        console.log(res);
        // history.push(`/groupPage/${res.dataValues.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleClickCategory = e => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  // const categoryFilter = () => {};

  return selectedCategory ? (
    <>
      <div className="categoryContainer">{selectedCategory}</div>
      <div className="groupContainer">
        <ul>
          {groups
            .filter(group => group.category === selectedCategory)
            .map(filteredGroup => (
              <li key={filteredGroup.id}>
                <button onClick={handleClickGroup}>{filteredGroup.name}</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  ) : (
    <>
      <div className="categoryContainer">
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <button onClick={handleClickCategory} value={category.name}>
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="groupContainer">
        <ul>
          {groups.map(group => (
            <li key={group.id}>
              <button onClick={handleClickGroup} value={group.id}>
                {group.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
    //     <>
    //       <div className="categoryContainer">{selectedCategory}</div>
    //       <div className="groupContainer">
    //         <ul>
    //           {data.groups
    //             .filter(group => group.category === selectedCategory)
    //             .map(filteredGroup => (
    //               <li key={filteredGroup.id}>
    //                 <button onClick={handleClickGroup}>
    //                   {filteredGroup.groupName}
    //                 </button>
    //               </li>
    //             ))}
    //         </ul>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //       <div className="categoryContainer">
    //         <ul>
    //           {catData.categories.map(category => (
    //             <li key={category.id}>
    //               <button onClick={handleClickCategory} value={category.name}>
    //                 {category.name}
    //               </button>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       <div className="groupContainer">
    //         <ul>
    //           {data.groups.map(group => (
    //             <li key={group.id}>
    //               <button onClick={handleClickGroup} value={group.id}>
    //                 {group.groupName}
    //               </button>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </>
  );
};
export default GroupsByCategoryPage;
