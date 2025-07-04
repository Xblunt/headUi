
import { mockUsers } from './mockUsers';

export interface Chat {
  uuid: string;
  name: string;
  participantUUIDs: string[];
  lastMessage: string;
  lastMessageTime: string;
}

const labelUsers = mockUsers.filter(u => u.roles.includes('LABEL'));
const userUsers = mockUsers.filter(u => u.roles.includes('USER'));

const labelChats: Chat[] = [
  {
    uuid: 'label-chat-1',
    name: 'Лейблы: Электронная сцена',
    participantUUIDs: [labelUsers[0]?.uuid, labelUsers[1]?.uuid, labelUsers[2]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем новый релиз.',
    lastMessageTime: '2023-07-01T12:00:00'
  },
  {
    uuid: 'label-chat-2',
    name: 'Лейблы: Инди и Альтернатива',
    participantUUIDs: [labelUsers[2]?.uuid, labelUsers[3]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Планируем совместный проект.',
    lastMessageTime: '2023-07-02T13:00:00'
  },
  {
    uuid: 'label-chat-3',
    name: 'Лейблы: Джазовые встречи',
    participantUUIDs: [labelUsers[0]?.uuid, labelUsers[3]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем фестиваль.',
    lastMessageTime: '2023-07-03T14:00:00'
  },
  {
    uuid: 'label-chat-4',
    name: 'Лейблы: Классика',
    participantUUIDs: [labelUsers[1]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждение новых исполнителей.',
    lastMessageTime: '2023-07-04T15:00:00'
  },
  {
    uuid: 'label-chat-5',
    name: 'Лейблы: Хип-хоп',
    participantUUIDs: [labelUsers[1]?.uuid, labelUsers[2]?.uuid].filter(Boolean),
    lastMessage: 'Совместный релиз с молодыми артистами.',
    lastMessageTime: '2023-07-05T16:00:00'
  },
  {
    uuid: 'label-chat-6',
    name: 'Лейблы: Новости индустрии',
    participantUUIDs: [labelUsers[0]?.uuid, labelUsers[2]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем изменения в законах.',
    lastMessageTime: '2023-07-06T17:00:00'
  },
  {
    uuid: 'label-chat-7',
    name: 'Лейблы: Новые таланты',
    participantUUIDs: [labelUsers[3]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Поиск новых артистов.',
    lastMessageTime: '2023-07-07T18:00:00'
  },
  {
    uuid: 'label-chat-8',
    name: 'Лейблы: Международное сотрудничество',
    participantUUIDs: [labelUsers[0]?.uuid, labelUsers[1]?.uuid, labelUsers[3]?.uuid].filter(Boolean),
    lastMessage: 'Планируем тур по Европе.',
    lastMessageTime: '2023-07-08T19:00:00'
  },
  {
    uuid: 'label-chat-9',
    name: 'Лейблы: Digital релизы',
    participantUUIDs: [labelUsers[2]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем платформы для релизов.',
    lastMessageTime: '2023-07-09T20:00:00'
  },
  {
    uuid: 'label-chat-10',
    name: 'Лейблы: PR и маркетинг',
    participantUUIDs: [labelUsers[0]?.uuid, labelUsers[1]?.uuid, labelUsers[2]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем рекламные кампании.',
    lastMessageTime: '2023-07-10T21:00:00'
  },
  {
    uuid: 'label-chat-11',
    name: 'Лейблы: Виниловые релизы',
    participantUUIDs: [labelUsers[3]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Планируем выпуск пластинок.',
    lastMessageTime: '2023-07-11T22:00:00'
  },
  {
    uuid: 'label-chat-12',
    name: 'Лейблы: Сотрудничество с артистами',
    participantUUIDs: [labelUsers[0]?.uuid, labelUsers[2]?.uuid, labelUsers[3]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем контракты.',
    lastMessageTime: '2023-07-12T23:00:00'
  },
  {
    uuid: 'label-chat-13',
    name: 'Лейблы: Мастеринг и звук',
    participantUUIDs: [labelUsers[1]?.uuid, labelUsers[3]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем студии звукозаписи.',
    lastMessageTime: '2023-07-13T10:00:00'
  },
  {
    uuid: 'label-chat-14',
    name: 'Лейблы: Права и лицензии',
    participantUUIDs: [labelUsers[2]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем юридические вопросы.',
    lastMessageTime: '2023-07-14T11:00:00'
  },
  {
    uuid: 'label-chat-15',
    name: 'Лейблы: Конференции',
    participantUUIDs: [labelUsers[0]?.uuid, labelUsers[1]?.uuid, labelUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Готовимся к конференции.',
    lastMessageTime: '2023-07-15T12:00:00'
  },
];

const userChats: Chat[] = [
  {
    uuid: 'user-chat-1',
    name: 'Слушатели: Новинки недели',
    participantUUIDs: [userUsers[0]?.uuid, userUsers[1]?.uuid, userUsers[2]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем новые релизы.',
    lastMessageTime: '2023-08-01T18:30:00'
  },
  {
    uuid: 'user-chat-2',
    name: 'Слушатели: Любимые жанры',
    participantUUIDs: [userUsers[1]?.uuid, userUsers[2]?.uuid, userUsers[3]?.uuid].filter(Boolean),
    lastMessage: 'Делимся любимыми треками.',
    lastMessageTime: '2023-08-02T19:00:00'
  },
  {
    uuid: 'user-chat-3',
    name: 'Слушатели: Концерты',
    participantUUIDs: [userUsers[0]?.uuid, userUsers[3]?.uuid, userUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Кто идёт на концерт?',
    lastMessageTime: '2023-08-03T20:00:00'
  },
  {
    uuid: 'user-chat-4',
    name: 'Слушатели: Плейлисты',
    participantUUIDs: [userUsers[2]?.uuid, userUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обмениваемся плейлистами.',
    lastMessageTime: '2023-08-04T21:00:00'
  },
  {
    uuid: 'user-chat-5',
    name: 'Слушатели: Вопросы по сервису',
    participantUUIDs: [userUsers[0]?.uuid, userUsers[1]?.uuid].filter(Boolean),
    lastMessage: 'Как добавить трек в избранное?',
    lastMessageTime: '2023-08-05T22:00:00'
  },
  {
    uuid: 'user-chat-6',
    name: 'Слушатели: Джазовые вечера',
    participantUUIDs: [userUsers[3]?.uuid, userUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем джазовые альбомы.',
    lastMessageTime: '2023-08-06T23:00:00'
  },
  {
    uuid: 'user-chat-7',
    name: 'Слушатели: Классика',
    participantUUIDs: [userUsers[0]?.uuid, userUsers[2]?.uuid, userUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Любимые композиторы.',
    lastMessageTime: '2023-08-07T10:00:00'
  },
  {
    uuid: 'user-chat-8',
    name: 'Слушатели: Инди-музыка',
    participantUUIDs: [userUsers[1]?.uuid, userUsers[3]?.uuid].filter(Boolean),
    lastMessage: 'Советуем инди-группы.',
    lastMessageTime: '2023-08-08T11:00:00'
  },
  {
    uuid: 'user-chat-9',
    name: 'Слушатели: Электроника',
    participantUUIDs: [userUsers[2]?.uuid, userUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем электронные новинки.',
    lastMessageTime: '2023-08-09T12:00:00'
  },
  {
    uuid: 'user-chat-10',
    name: 'Слушатели: Хип-хоп',
    participantUUIDs: [userUsers[0]?.uuid, userUsers[1]?.uuid, userUsers[3]?.uuid].filter(Boolean),
    lastMessage: 'Лучшие рэп-альбомы года.',
    lastMessageTime: '2023-08-10T13:00:00'
  },
  {
    uuid: 'user-chat-11',
    name: 'Слушатели: Фолк и этника',
    participantUUIDs: [userUsers[2]?.uuid, userUsers[3]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем народную музыку.',
    lastMessageTime: '2023-08-11T14:00:00'
  },
  {
    uuid: 'user-chat-12',
    name: 'Слушатели: Музыкальные мемы',
    participantUUIDs: [userUsers[1]?.uuid, userUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Делимся мемами.',
    lastMessageTime: '2023-08-12T15:00:00'
  },
  {
    uuid: 'user-chat-13',
    name: 'Слушатели: Винил и кассеты',
    participantUUIDs: [userUsers[0]?.uuid, userUsers[2]?.uuid].filter(Boolean),
    lastMessage: 'Обсуждаем коллекции.',
    lastMessageTime: '2023-08-13T16:00:00'
  },
  {
    uuid: 'user-chat-14',
    name: 'Слушатели: Музыка для работы',
    participantUUIDs: [userUsers[3]?.uuid, userUsers[4]?.uuid].filter(Boolean),
    lastMessage: 'Делимся фоновыми плейлистами.',
    lastMessageTime: '2023-08-14T17:00:00'
  },
  {
    uuid: 'user-chat-15',
    name: 'Слушатели: Вопросы и ответы',
    participantUUIDs: [userUsers[0]?.uuid, userUsers[1]?.uuid, userUsers[2]?.uuid].filter(Boolean),
    lastMessage: 'Задаём вопросы по сервису.',
    lastMessageTime: '2023-08-15T18:00:00'
  },
];

export const mockChats: Chat[] = [
  ...labelChats,
  ...userChats,
];
