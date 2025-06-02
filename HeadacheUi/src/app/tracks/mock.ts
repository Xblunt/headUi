import { PromotionRequest, PromotionStatus } from '@/models';

export const mockPromotions: PromotionRequest[] = [
  {
    uuid: 'promo-1',
    songUUID: 'song-1',
    msg: '🔥 Новый хит от DJ Sunrise!',
    dispatchTime: '2025-05-01T10:00:00Z',
    confirmationTime: '2025-05-02T12:00:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-2',
    songUUID: 'song-2',
    msg: '🎶 Релакс с новым треком Chill Vibes.',
    dispatchTime: '2025-05-03T14:30:00Z',
    confirmationTime: '2025-05-04T09:15:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-3',
    songUUID: 'song-3',
    msg: '💃 Танцуем под ритмы Latin Fiesta!',
    dispatchTime: '2025-05-05T16:45:00Z',
    confirmationTime: '2025-05-06T11:20:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-4',
    songUUID: 'song-4',
    msg: '🎸 Рок-н-ролл возвращается с Rock Legends.',
    dispatchTime: '2025-05-07T09:00:00Z',
    confirmationTime: '2025-05-08T13:50:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-5',
    songUUID: 'song-5',
    msg: '🎧 Электронные вибрации от Electro Pulse.',
    dispatchTime: '2025-05-09T18:20:00Z',
    confirmationTime: '2025-05-10T10:10:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-6',
    songUUID: 'song-6',
    msg: '🎹 Классика в современном исполнении.',
    dispatchTime: '2025-05-11T11:30:00Z',
    confirmationTime: '2025-05-12T14:25:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-7',
    songUUID: 'song-7',
    msg: '🎤 Хип-хоп от нового артиста Street Flow.',
    dispatchTime: '2025-05-13T15:15:00Z',
    confirmationTime: '2025-05-14T12:40:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-8',
    songUUID: 'song-8',
    msg: '🌌 Амбиент для медитации и релакса.',
    dispatchTime: '2025-05-15T17:50:00Z',
    confirmationTime: '2025-05-16T09:30:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-9',
    songUUID: 'song-9',
    msg: '🎺 Джазовые импровизации от Jazz Masters.',
    dispatchTime: '2025-05-17T13:40:00Z',
    confirmationTime: '2025-05-18T11:05:00Z',
    status: PromotionStatus.PROMOTED
  },
  {
    uuid: 'promo-10',
    songUUID: 'song-10',
    msg: '🎮 Саундтрек для геймеров от Game Beats.',
    dispatchTime: '2025-05-19T08:10:00Z',
    confirmationTime: '2025-05-20T10:55:00Z',
    status: PromotionStatus.PROMOTED
  }
];


import { Song, SongStatus, Tag } from '@/models';

// const tags: Tag[] = [
//   { uuid: 'tag-1', tagName: 'Electronic' },
//   { uuid: 'tag-2', tagName: 'Ambient' },
//   { uuid: 'tag-3', tagName: 'Rock' },
//   { uuid: 'tag-4', tagName: 'Jazz' },
//   { uuid: 'tag-5', tagName: 'Classical' }
// ];

export const mockTags: Tag[] = [
  new Tag({ uuid: '1', tagName: 'Pop' }),
  new Tag({ uuid: '2', tagName: 'Rock' }),
  new Tag({ uuid: '3', tagName: 'Hip-Hop' }),
  new Tag({ uuid: '4', tagName: 'R&B' }),
  new Tag({ uuid: '5', tagName: 'Electronic' }),
  new Tag({ uuid: '6', tagName: 'Jazz' }),
  new Tag({ uuid: '7', tagName: 'Classical' }),
  new Tag({ uuid: '8', tagName: 'Reggae' }),
  new Tag({ uuid: '9', tagName: 'Country' }),
  new Tag({ uuid: '10', tagName: 'Metal' }),
];


// export const mockSongs: Song[] = Array.from({ length: 50 }, (_, i) => {
//   const id = i + 1;
//   return new Song({
//     uuid: `song-${id}`,
//     name: `Трек ${id}`,
//     avgRating: Math.floor(Math.random() * 5) + 1,
//     url: `https://pixabay.com/music/id-${id}`,
//     urlImage: `https://picsum.photos/seed/song${id}/600/400`,
//     status: SongStatus.APPROVED,
//     authorUUID: `user-${(id % 10) + 1}`,
//     tags: [tags[id % tags.length]],
//     fileUUID: `file-${id}`
//   });
// });

// MainMocks.ts


// export const mockSongs: Song[] = [
//   new Song({
//     uuid: '1',
//     name: 'Espresso',
//     avgRating: 4.8,
//     url: 'https://open.spotify.com/track/4iJyoBOLtHqaGxP12qzhQI',
//     urlImage: 'https://i.scdn.co/image/ab67616d0000b273d8f0b5c9e5c6f5e1f8e4e5e6',
//     status: SongStatus.APPROVED,
//     authorUUID: 'artist1',
//     tags: [new Tag({ uuid: 'tag1', tagName: 'Pop' })],
//     fileUUID: 'file1',
//   }),
//   new Song({
//     uuid: '2',
//     name: 'Beautiful Things',
//     avgRating: 4.7,
//     url: 'https://open.spotify.com/track/5fVZC9GiM4e8vu99W0Xf6J',
//     urlImage: 'https://i.scdn.co/image/ab67616d0000b273b0f0b5c9e5c6f5e1f8e4e5e7',
//     status: SongStatus.APPROVED,
//     authorUUID: 'artist2',
//     tags: [new Tag({ uuid: 'tag2', tagName: 'Indie' })],
//     fileUUID: 'file2',
//   }),
//   // ...добавьте остальные 48 треков по аналогии
// ];



export const mockSongs: Song[] = [
  new Song({
    uuid: 's1',
    name: 'Shake It Off',
    avgRating: 4.9,
    url: 'https://www.youtube.com/watch?v=nfWlot6h_JM',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_Shake_It_Off.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u1',
    tags: [mockTags[0]],
    fileUUID: 'f1',
  }),
  new Song({
    uuid: 's2',
    name: 'God\'s Plan',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=xpVfcZ0ZcFM',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Drake_-_God%27s_Plan.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u2',
    tags: [mockTags[2]],
    fileUUID: 'f2',
  }),
  new Song({
    uuid: 's3',
    name: 'Single Ladies',
    avgRating: 4.9,
    url: 'https://www.youtube.com/watch?v=4m1EFMoRFvY',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Beyonce_-_Single_Ladies.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u3',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f3',
  }),
  new Song({
    uuid: 's4',
    name: 'Shape of You',
    avgRating: 4.7,
    url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/4/45/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u4',
    tags: [mockTags[0], mockTags[4]],
    fileUUID: 'f4',
  }),
  new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
    new Song({
    uuid: 's5',
    name: 'Umbrella',
    avgRating: 4.8,
    url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
    urlImage: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Rihanna_-_Umbrella.png',
    status: SongStatus.APPROVED,
    authorUUID: 'u5',
    tags: [mockTags[0], mockTags[3]],
    fileUUID: 'f5',
  }),
  
];



import { Album } from '@/models';

export const mockAlbums: Album[] = Array.from({ length: 25 }, (_, i) => {
  const id = i + 1;
  const songCount = Math.floor(Math.random() * 11) + 5; // от 5 до 15
  const savedSongsUUIDs = Array.from({ length: songCount }, (_, j) => `song-${(i * 2 + j) % 50 + 1}`);

  return new Album({
    uuid: `album-${id}`,
    name: `Альбом ${id}`,
    urlImage: `https://picsum.photos/seed/album${id}/600/400`,
    authorUUID: `user-${(id % 10) + 1}`,
    savedSongsUUIDs
  });
});


import { User } from '@/models';

// export const mockUsers: User[] = Array.from({ length: 10 }, (_, i) => {
//   const id = i + 1;
//   return new User({
//     uuid: `user-${id}`,
//     login: `user${id}`,
//     roles: ['USER'],
//     urlImage: `https://i.pravatar.cc/150?img=${id}`
//   });
// });


export const mockUsers: User[] = [
  new User({
    uuid: 'u1',
    login: 'taylor_swift',
    roles: ['ARTIST'],
    urlImage: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Taylor_Swift_2_-_2019_by_Glenn_Francis.jpg',
    avgRating: 4.9,
  }),
  new User({
    uuid: 'u2',
    login: 'drake',
    roles: ['ARTIST'],
    urlImage: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Drake_at_the_2016_Summer_Sixteen_Tour.jpg',
    avgRating: 4.8,
  }),
  new User({
    uuid: 'u3',
    login: 'beyonce',
    roles: ['ARTIST'],
    urlImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Beyonce_-_The_Formati..._Tour_-_2016.jpg',
    avgRating: 4.9,
  }),
  new User({
    uuid: 'u4',
    login: 'ed_sheeran',
    roles: ['ARTIST'],
    urlImage: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Ed_Sheeran_2013.jpg',
    avgRating: 4.7,
  }),
  new User({
    uuid: 'u5',
    login: 'rihanna',
    roles: ['ARTIST'],
    urlImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Rihanna_Fenty_2018.png',
    avgRating: 4.8,
  }),
];
