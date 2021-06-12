//그룹장, 카테고리, 회원, 그룹정보, 그룹이미지, 그룹이름, 이벤트
const groupData = {
  groups: [
    {
      id: 1,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 2,
      groupImg: 'url',
      title: '자동차부수기모임',
      category_id: '자동차',
      members: [
        {
          id: 2,
          userName: 'minjiTheCarBreaker',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'boomTheCars!',
          location: 'Incheon',
        },
      ],
      description:
        '사회로인해 스트레스를받아 스트레스를 풀기 위하여 자동차를 부수고싶은 사람들의 모임입니다.',
    },
    {
      id: 3,
      groupImg: 'url',
      title: '커피에죽고사는불꽃남자들의모임',
      category_id: '커피',
      members: [
        {
          id: 3,
          userName: 'minsuAddictedCaffeine',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'baekDabang gapsida',
          location: 'Incheon',
        },
      ],
      description: '사람들과 함께 카페를가는 모임입니다.(불꽃남자만 가입가능)',
    },
    {
      id: 4,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 5,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 6,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 7,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 8,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 9,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 10,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 11,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 12,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 13,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
    {
      id: 14,
      groupImg: 'url',
      title: '애완동물산책모임',
      category_id: '애완동물',
      members: [
        {
          id: 1,
          userName: 'taehoPouding',
        },
      ],
      events: [
        {
          id: 1,
          eventName: 'goToMountain',
          location: 'Busan',
        },
      ],
      description: '애완동물과 함께 산책하는 모임입니다.',
    },
  ],
};

export default groupData;
