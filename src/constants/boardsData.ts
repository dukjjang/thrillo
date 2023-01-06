export const boardsData = [
  {
    id: 0,
    state: 'todo',
    name: '할일',
    cards: [
      {
        id: 0,
        title: '원티드 프리온보딩',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        deadLine: '23-01-25',
        state: 'todo',
        manager: '뉴진스',
        image: '/images/profile_image_1.png',
      },
    ],
  },
  {
    id: 1,
    state: 'inProgress',
    name: '진행중',
    cards: [
      {
        id: 0,
        title: '1000km 달리기 프로젝트',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        deadLine: '23-02-25',
        state: 'inProgress',
        manager: '주우재',
        image: '/images/profile_image_2.png',
      },
      {
        id: 1,
        title: '등산하기',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        deadLine: '23-04-25',

        state: 'inProgress',
        manager: '주호민',
        image: '/images/profile_image_3.png',
      },
    ],
  },
  {
    id: 2,
    state: 'completed',
    name: '완료',
    cards: [
      {
        id: 0,
        title: '축구대회 나가기',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        deadLine: '23-05-25',
        state: 'completed',
        manager: '진현덕',
        image: '/images/profile_image_0.png',
      },
    ],
  },
];

export const emptyCard = {
  id: Math.random(),
  title: '제목없음',
  content: '',
  state: 'todo',
  deadLine: '',
  manager: '',
  image: '/images/profile_image_unknown.png',
};
