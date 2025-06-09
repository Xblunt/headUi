import { Album } from '../models';

export const mockAlbums: Album[] = [
  new Album({
    uuid: 'album-1',
    name: 'Electronic Sunrise',
    authorUUID: 'author-1',
    fileUuid: 'file-101',
    urlImage: '/albumImg/1.jpg',
    createdAt: '2024-01-01T10:00:00Z',
    savedSongsUUIDs: ['song-1', 'song-2', 'song-3', 'song-4', 'song-5']
  }),
  new Album({
    uuid: 'album-2',
    name: 'Jazz Vibes',
    authorUUID: 'author-2',
    fileUuid: 'file-102',
    urlImage: '/albumImg/2.jpg',
    createdAt: '2024-01-10T10:00:00Z',
    savedSongsUUIDs: ['song-6', 'song-7', 'song-8', 'song-9']
  }),
  new Album({
    uuid: 'album-3',
    name: 'Classical Evenings',
    authorUUID: 'author-3',
    fileUuid: 'file-103',
    urlImage: '/albumImg/3.jpg',
    createdAt: '2024-02-01T10:00:00Z',
    savedSongsUUIDs: ['song-10', 'song-11', 'song-12']
  }),
  new Album({
    uuid: 'album-4',
    name: 'Pop Parade',
    authorUUID: 'author-4',
    fileUuid: 'file-104',
    urlImage: '/albumImg/4.jpg',
    createdAt: '2024-02-15T10:00:00Z',
    savedSongsUUIDs: ['song-13', 'song-14', 'song-15', 'song-16']
  }),
  new Album({
    uuid: 'album-5',
    name: 'Indie Dreams',
    authorUUID: 'author-5',
    fileUuid: 'file-105',
    urlImage: '/albumImg/5.jpg',
    createdAt: '2024-03-01T10:00:00Z',
    savedSongsUUIDs: ['song-17', 'song-18', 'song-19']
  }),
  new Album({
    uuid: 'album-6',
    name: 'Night Drive',
    authorUUID: 'author-1',
    fileUuid: 'file-106',
    urlImage: '/albumImg/6.jpg',
    createdAt: '2024-03-10T10:00:00Z',
    savedSongsUUIDs: ['song-20', 'song-21', 'song-22', 'song-23']
  }),
  new Album({
    uuid: 'album-7',
    name: 'Lo-Fi Chill',
    authorUUID: 'author-2',
    fileUuid: 'file-107',
    urlImage: '/albumImg/7.jpg',
    createdAt: '2024-03-20T10:00:00Z',
    savedSongsUUIDs: ['song-24', 'song-25', 'song-26']
  }),
  new Album({
    uuid: 'album-8',
    name: 'Retro Wave',
    authorUUID: 'author-3',
    fileUuid: 'file-108',
    urlImage: '/albumImg/8.jpg',
    createdAt: '2024-04-01T10:00:00Z',
    savedSongsUUIDs: ['song-27', 'song-28', 'song-29', 'song-30']
  }),
  new Album({
    uuid: 'album-9',
    name: 'Synthwave Nights',
    authorUUID: 'author-4',
    fileUuid: 'file-109',
    urlImage: '/albumImg/9.jpg',
    createdAt: '2024-04-10T10:00:00Z',
    savedSongsUUIDs: ['song-1', 'song-11', 'song-21']
  }),
  new Album({
    uuid: 'album-10',
    name: 'Folk Stories',
    authorUUID: 'author-5',
    fileUuid: 'file-110',
    urlImage: '/albumImg/10.jpg',
    createdAt: '2024-04-20T10:00:00Z',
    savedSongsUUIDs: ['song-2', 'song-12', 'song-22']
  }),

  // Дополнительные альбомы для каждого автора (примерно по 10 на каждого)
  // author-1
  new Album({
    uuid: 'album-11',
    name: 'Morning Beats',
    authorUUID: 'author-1',
    fileUuid: 'file-111',
    urlImage: '/albumImg/11.jpg',
    createdAt: '2024-05-01T10:00:00Z',
    savedSongsUUIDs: ['song-3', 'song-5', 'song-7']
  }),
  new Album({
    uuid: 'album-12',
    name: 'Sunset Grooves',
    authorUUID: 'author-1',
    fileUuid: 'file-112',
    urlImage: '/albumImg/12.jpg',
    createdAt: '2024-05-10T10:00:00Z',
    savedSongsUUIDs: ['song-9', 'song-13', 'song-17']
  }),
  new Album({
    uuid: 'album-13',
    name: 'City Lights',
    authorUUID: 'author-1',
    fileUuid: 'file-113',
    urlImage: '/albumImg/13.jpg',
    createdAt: '2024-05-20T10:00:00Z',
    savedSongsUUIDs: ['song-21', 'song-23', 'song-25']
  }),
  new Album({
    uuid: 'album-14',
    name: 'Deep Space',
    authorUUID: 'author-1',
    fileUuid: 'file-114',
    urlImage: '/albumImg/14.jpg',
    createdAt: '2024-06-01T10:00:00Z',
    savedSongsUUIDs: ['song-27', 'song-29']
  }),
  new Album({
    uuid: 'album-15',
    name: 'Electro Pulse',
    authorUUID: 'author-1',
    fileUuid: 'file-115',
    urlImage: '/albumImg/15.jpg',
    createdAt: '2024-06-10T10:00:00Z',
    savedSongsUUIDs: ['song-1', 'song-6', 'song-11']
  }),
  new Album({
    uuid: 'album-16',
    name: 'Urban Flow',
    authorUUID: 'author-1',
    fileUuid: 'file-116',
    urlImage: '/albumImg/16.jpg',
    createdAt: '2024-06-20T10:00:00Z',
    savedSongsUUIDs: ['song-16', 'song-18', 'song-20']
  }),
  new Album({
    uuid: 'album-17',
    name: 'Dreamscape',
    authorUUID: 'author-1',
    fileUuid: 'file-117',
    urlImage: '/albumImg/17.jpg',
    createdAt: '2024-07-01T10:00:00Z',
    savedSongsUUIDs: ['song-22', 'song-24', 'song-26']
  }),
  new Album({
    uuid: 'album-18',
    name: 'Pulse City',
    authorUUID: 'author-1',
    fileUuid: 'file-118',
    urlImage: '/albumImg/18.jpg',
    createdAt: '2024-07-10T10:00:00Z',
    savedSongsUUIDs: ['song-28', 'song-30']
  }),
  new Album({
    uuid: 'album-19',
    name: 'Nightlife',
    authorUUID: 'author-1',
    fileUuid: 'file-119',
    urlImage: '/albumImg/19.jpg',
    createdAt: '2024-07-20T10:00:00Z',
    savedSongsUUIDs: ['song-2', 'song-4', 'song-6']
  }),
  new Album({
    uuid: 'album-20',
    name: 'Bassline',
    authorUUID: 'author-1',
    fileUuid: 'file-120',
    urlImage: '/albumImg/20.jpg',
    createdAt: '2024-08-01T10:00:00Z',
    savedSongsUUIDs: ['song-8', 'song-10', 'song-12']
  }),

  // author-2
  new Album({
    uuid: 'album-21',
    name: 'Jazz Cafe',
    authorUUID: 'author-2',
    fileUuid: 'file-121',
    urlImage: '/albumImg/21.jpg',
    createdAt: '2024-08-10T10:00:00Z',
    savedSongsUUIDs: ['song-14', 'song-15', 'song-16']
  }),
  new Album({
    uuid: 'album-22',
    name: 'Blue Note',
    authorUUID: 'author-2',
    fileUuid: 'file-122',
    urlImage: '/albumImg/22.jpg',
    createdAt: '2024-08-20T10:00:00Z',
    savedSongsUUIDs: ['song-17', 'song-18', 'song-19']
  }),
  new Album({
    uuid: 'album-23',
    name: 'Smooth Jazz',
    authorUUID: 'author-2',
    fileUuid: 'file-123',
    urlImage: '/albumImg/23.jpg',
    createdAt: '2024-09-01T10:00:00Z',
    savedSongsUUIDs: ['song-20', 'song-21', 'song-22']
  }),
  new Album({
    uuid: 'album-24',
    name: 'Late Night Jazz',
    authorUUID: 'author-2',
    fileUuid: 'file-124',
    urlImage: '/albumImg/24.jpg',
    createdAt: '2024-09-10T10:00:00Z',
    savedSongsUUIDs: ['song-23', 'song-24', 'song-25']
  }),
  new Album({
    uuid: 'album-25',
    name: 'Jazz Classics',
    authorUUID: 'author-2',
    fileUuid: 'file-125',
    urlImage: '/albumImg/25.jpg',
    createdAt: '2024-09-20T10:00:00Z',
    savedSongsUUIDs: ['song-26', 'song-27', 'song-28']
  }),
  new Album({
    uuid: 'album-26',
    name: 'Jazz Fusion',
    authorUUID: 'author-2',
    fileUuid: 'file-126',
    urlImage: '/albumImg/26.jpg',
    createdAt: '2024-10-01T10:00:00Z',
    savedSongsUUIDs: ['song-29', 'song-30', 'song-1']
  }),
  new Album({
    uuid: 'album-27',
    name: 'Jazz Lounge',
    authorUUID: 'author-2',
    fileUuid: 'file-127',
    urlImage: '/albumImg/27.jpg',
    createdAt: '2024-10-10T10:00:00Z',
    savedSongsUUIDs: ['song-2', 'song-3', 'song-4']
  }),
  new Album({
    uuid: 'album-28',
    name: 'Jazz Essentials',
    authorUUID: 'author-2',
    fileUuid: 'file-128',
    urlImage: '/albumImg/28.jpg',
    createdAt: '2024-10-20T10:00:00Z',
    savedSongsUUIDs: ['song-5', 'song-6', 'song-7']
  }),
  new Album({
    uuid: 'album-29',
    name: 'Jazz Collection',
    authorUUID: 'author-2',
    fileUuid: 'file-129',
    urlImage: '/albumImg/29.jpg',
    createdAt: '2024-11-01T10:00:00Z',
    savedSongsUUIDs: ['song-8', 'song-9', 'song-10']
  }),
  new Album({
    uuid: 'album-30',
    name: 'Jazz Universe',
    authorUUID: 'author-2',
    fileUuid: 'file-130',
    urlImage: '/albumImg/30.jpg',
    createdAt: '2024-11-10T10:00:00Z',
    savedSongsUUIDs: ['song-11', 'song-12', 'song-13']
  }),

  // author-3
  new Album({
    uuid: 'album-31',
    name: 'Classical Moods',
    authorUUID: 'author-3',
    fileUuid: 'file-131',
    urlImage: '/albumImg/31.jpg',
    createdAt: '2024-11-20T10:00:00Z',
    savedSongsUUIDs: ['song-14', 'song-15', 'song-16']
  }),
  new Album({
    uuid: 'album-32',
    name: 'Baroque Nights',
    authorUUID: 'author-3',
    fileUuid: 'file-132',
    urlImage: '/albumImg/32.jpg',
    createdAt: '2024-12-01T10:00:00Z',
    savedSongsUUIDs: ['song-17', 'song-18', 'song-19']
  }),
  new Album({
    uuid: 'album-33',
    name: 'Romantic Era',
    authorUUID: 'author-3',
    fileUuid: 'file-133',
    urlImage: '/albumImg/33.jpg',
    createdAt: '2024-12-10T10:00:00Z',
    savedSongsUUIDs: ['song-20', 'song-21', 'song-22']
  }),
  new Album({
    uuid: 'album-34',
    name: 'Piano Classics',
    authorUUID: 'author-3',
    fileUuid: 'file-134',
    urlImage: '/albumImg/34.jpg',
    createdAt: '2024-12-20T10:00:00Z',
    savedSongsUUIDs: ['song-23', 'song-24', 'song-25']
  }),
  new Album({
    uuid: 'album-35',
    name: 'Symphonic Tales',
    authorUUID: 'author-3',
    fileUuid: 'file-135',
    urlImage: '/albumImg/35.jpg',
    createdAt: '2025-01-01T10:00:00Z',
    savedSongsUUIDs: ['song-26', 'song-27', 'song-28']
  }),
  new Album({
    uuid: 'album-36',
    name: 'Opera Gala',
    authorUUID: 'author-3',
    fileUuid: 'file-136',
    urlImage: '/albumImg/36.jpg',
    createdAt: '2025-01-10T10:00:00Z',
    savedSongsUUIDs: ['song-29', 'song-30', 'song-1']
  }),
  new Album({
    uuid: 'album-37',
    name: 'String Quartet',
    authorUUID: 'author-3',
    fileUuid: 'file-137',
    urlImage: '/albumImg/37.jpg',
    createdAt: '2025-01-20T10:00:00Z',
    savedSongsUUIDs: ['song-2', 'song-3', 'song-4']
  }),
  new Album({
    uuid: 'album-38',
    name: 'Orchestral Works',
    authorUUID: 'author-3',
    fileUuid: 'file-138',
    urlImage: '/albumImg/38.jpg',
    createdAt: '2025-02-01T10:00:00Z',
    savedSongsUUIDs: ['song-5', 'song-6', 'song-7']
  }),
  new Album({
    uuid: 'album-39',
    name: 'Solo Piano',
    authorUUID: 'author-3',
    fileUuid: 'file-139',
    urlImage: '/albumImg/39.jpg',
    createdAt: '2025-02-10T10:00:00Z',
    savedSongsUUIDs: ['song-8', 'song-9', 'song-10']
  }),
  new Album({
    uuid: 'album-40',
    name: 'Chamber Music',
    authorUUID: 'author-3',
    fileUuid: 'file-140',
    urlImage: '/albumImg/40.jpg',
    createdAt: '2025-02-20T10:00:00Z',
    savedSongsUUIDs: ['song-11', 'song-12', 'song-13']
  }),

  // author-4
  new Album({
    uuid: 'album-41',
    name: 'Pop Universe',
    authorUUID: 'author-4',
    fileUuid: 'file-141',
    urlImage: '/albumImg/41.jpg',
    createdAt: '2025-03-01T10:00:00Z',
    savedSongsUUIDs: ['song-14', 'song-15', 'song-16']
  }),
  new Album({
    uuid: 'album-42',
    name: 'Pop Hits',
    authorUUID: 'author-4',
    fileUuid: 'file-142',
    urlImage: '/albumImg/42.jpg',
    createdAt: '2025-03-10T10:00:00Z',
    savedSongsUUIDs: ['song-17', 'song-18', 'song-19']
  }),
  new Album({
    uuid: 'album-43',
    name: 'Pop Ballads',
    authorUUID: 'author-4',
    fileUuid: 'file-143',
    urlImage: '/albumImg/43.jpg',
    createdAt: '2025-03-20T10:00:00Z',
    savedSongsUUIDs: ['song-20', 'song-21', 'song-22']
  }),
  new Album({
    uuid: 'album-44',
    name: 'Pop Classics',
    authorUUID: 'author-4',
    fileUuid: 'file-144',
    urlImage: '/albumImg/44.jpg',
    createdAt: '2025-04-01T10:00:00Z',
    savedSongsUUIDs: ['song-23', 'song-24', 'song-25']
  }),
  new Album({
    uuid: 'album-45',
    name: 'Pop Party',
    authorUUID: 'author-4',
    fileUuid: 'file-145',
    urlImage: '/albumImg/45.jpg',
    createdAt: '2025-04-10T10:00:00Z',
    savedSongsUUIDs: ['song-26', 'song-27', 'song-28']
  }),
  new Album({
    uuid: 'album-46',
    name: 'Pop Sensation',
    authorUUID: 'author-4',
    fileUuid: 'file-146',
    urlImage: '/albumImg/46.jpg',
    createdAt: '2025-04-20T10:00:00Z',
    savedSongsUUIDs: ['song-29', 'song-30', 'song-1']
  }),
  new Album({
    uuid: 'album-47',
    name: 'Pop Legends',
    authorUUID: 'author-4',
    fileUuid: 'file-147',
    urlImage: '/albumImg/17.jpg', // <= заменено на <= 50
    createdAt: '2025-05-01T10:00:00Z',
    savedSongsUUIDs: ['song-2', 'song-3', 'song-4']
  }),
  new Album({
    uuid: 'album-48',
    name: 'Pop Anthems',
    authorUUID: 'author-4',
    fileUuid: 'file-148',
    urlImage: '/albumImg/23.jpg', // <= заменено на <= 50
    createdAt: '2025-05-10T10:00:00Z',
    savedSongsUUIDs: ['song-5', 'song-6', 'song-7']
  }),
  new Album({
    uuid: 'album-49',
    name: 'Pop Collection',
    authorUUID: 'author-4',
    fileUuid: 'file-149',
    urlImage: '/albumImg/31.jpg', // <= заменено на <= 50
    createdAt: '2025-05-20T10:00:00Z',
    savedSongsUUIDs: ['song-8', 'song-9', 'song-10']
  }),
  new Album({
    uuid: 'album-50',
    name: 'Pop World',
    authorUUID: 'author-4',
    fileUuid: 'file-150',
    urlImage: '/albumImg/42.jpg', // <= заменено на <= 50
    createdAt: '2025-06-01T10:00:00Z',
    savedSongsUUIDs: ['song-11', 'song-12', 'song-13']
  }),

  // author-5
  new Album({
    uuid: 'album-51',
    name: 'Indie Universe',
    authorUUID: 'author-5',
    fileUuid: 'file-151',
    urlImage: '/albumImg/7.jpg', // <= заменено на <= 50
    createdAt: '2025-06-10T10:00:00Z',
    savedSongsUUIDs: ['song-14', 'song-15', 'song-16']
  }),
  new Album({
    uuid: 'album-52',
    name: 'Indie Hits',
    authorUUID: 'author-5',
    fileUuid: 'file-152',
    urlImage: '/albumImg/12.jpg', // <= заменено на <= 50
    createdAt: '2025-06-20T10:00:00Z',
    savedSongsUUIDs: ['song-17', 'song-18', 'song-19']
  }),
  new Album({
    uuid: 'album-53',
    name: 'Indie Ballads',
    authorUUID: 'author-5',
    fileUuid: 'file-153',
    urlImage: '/albumImg/25.jpg', // <= заменено на <= 50
    createdAt: '2025-07-01T10:00:00Z',
    savedSongsUUIDs: ['song-20', 'song-21', 'song-22']
  }),
  new Album({
    uuid: 'album-54',
    name: 'Indie Classics',
    authorUUID: 'author-5',
    fileUuid: 'file-154',
    urlImage: '/albumImg/33.jpg', // <= заменено на <= 50
    createdAt: '2025-07-10T10:00:00Z',
    savedSongsUUIDs: ['song-23', 'song-24', 'song-25']
  }),
  new Album({
    uuid: 'album-55',
    name: 'Indie Party',
    authorUUID: 'author-5',
    fileUuid: 'file-155',
    urlImage: '/albumImg/41.jpg', // <= заменено на <= 50
    createdAt: '2025-07-20T10:00:00Z',
    savedSongsUUIDs: ['song-26', 'song-27', 'song-28']
  }),
  new Album({
    uuid: 'album-56',
    name: 'Indie Sensation',
    authorUUID: 'author-5',
    fileUuid: 'file-156',
    urlImage: '/albumImg/8.jpg', // <= заменено на <= 50
    createdAt: '2025-08-01T10:00:00Z',
    savedSongsUUIDs: ['song-29', 'song-30', 'song-1']
  }),
  new Album({
    uuid: 'album-57',
    name: 'Indie Legends',
    authorUUID: 'author-5',
    fileUuid: 'file-157',
    urlImage: '/albumImg/19.jpg', // <= заменено на <= 50
    createdAt: '2025-08-10T10:00:00Z',
    savedSongsUUIDs: ['song-2', 'song-3', 'song-4']
  }),
  new Album({
    uuid: 'album-58',
    name: 'Indie Anthems',
    authorUUID: 'author-5',
    fileUuid: 'file-158',
    urlImage: '/albumImg/27.jpg', // <= заменено на <= 50
    createdAt: '2025-08-20T10:00:00Z',
    savedSongsUUIDs: ['song-5', 'song-6', 'song-7']
  }),
  new Album({
    uuid: 'album-59',
    name: 'Indie Collection',
    authorUUID: 'author-5',
    fileUuid: 'file-159',
    urlImage: '/albumImg/38.jpg', // <= заменено на <= 50
    createdAt: '2025-09-01T10:00:00Z',
    savedSongsUUIDs: ['song-8', 'song-9', 'song-10']
  }),
  new Album({
    uuid: 'album-60',
    name: 'Indie World',
    authorUUID: 'author-5',
    fileUuid: 'file-160',
    urlImage: '/albumImg/44.jpg', // <= заменено на <= 50
    createdAt: '2025-09-10T10:00:00Z',
    savedSongsUUIDs: ['song-11', 'song-12', 'song-13']
  }),
];
