import { CooperationRequest, CooperationStatus, User } from '../models';

// Моки лейблов, отправивших CooperationRequests author-1
export const cooperationLabelsAuthor1: User[] = [
  new User({
    uuid: 'label-1',
    login: 'SoundWave Records',
    email: 'contact@soundwave.com',
    phoneNumber: '+7 (123) 456-7890',
    roles: ['LABEL'],
    description: 'Крупный лейбл, специализирующийся на электронной музыке',
    urlImage: 'https://example.com/label1.jpg'
  }),
  new User({
    uuid: 'label-2',
    login: 'Urban Beats',
    email: 'info@urbanbeats.com',
    phoneNumber: '+7 (987) 654-3210',
    roles: ['LABEL'],
    description: 'Лейбл, работающий с хип-хоп исполнителями',
    urlImage: 'https://example.com/label2.jpg'
  }),
  new User({
    uuid: 'label-3',
    login: 'Deep House Collective',
    email: 'deep@house.com',
    phoneNumber: '+7 (555) 123-4567',
    roles: ['LABEL'],
    description: 'Специализируется на deep house и техно музыке',
    urlImage: 'https://example.com/label3.jpg'
  }),
  new User({
    uuid: 'label-4',
    login: 'Rock Nation',
    email: 'rock@nation.com',
    phoneNumber: '+7 (111) 222-3333',
    roles: ['LABEL'],
    description: 'Лейбл для рок-исполнителей',
    urlImage: 'https://example.com/label4.jpg'
  }),
  new User({
    uuid: 'label-5',
    login: 'Jazz Masters',
    email: 'jazz@masters.com',
    phoneNumber: '+7 (222) 333-4444',
    roles: ['LABEL'],
    description: 'Лучшие джазовые релизы',
    urlImage: 'https://example.com/label5.jpg'
  }),
];

// CooperationRequests для author-1
export const mockCooperationRequestsAuthor1: CooperationRequest[] = [
  // 5 AWAITING
  new CooperationRequest({
    uuid: 'coop-author1-1',
    msg: 'Хотим добавить ваш трек в наш плейлист!',
    dispatchTime: '2024-07-01T10:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-2',
    msg: 'Сотрудничество по промо-кампании.',
    dispatchTime: '2024-07-02T11:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-3',
    msg: 'Приглашаем на совместный концерт.',
    dispatchTime: '2024-07-03T12:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-4',
    msg: 'Хотим выпустить ваш альбом.',
    dispatchTime: '2024-07-04T13:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-5',
    msg: 'Партнерство для фестиваля.',
    dispatchTime: '2024-07-05T14:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-5'
  }),
  // 3 APPROVED
  new CooperationRequest({
    uuid: 'coop-author1-6',
    msg: 'Ваш трек добавлен в наш плейлист!',
    dispatchTime: '2024-07-06T10:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-1',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-7',
    msg: 'Сотрудничество по промо-кампании одобрено.',
    dispatchTime: '2024-07-07T11:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-1',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-8',
    msg: 'Совместный концерт подтвержден.',
    dispatchTime: '2024-07-08T12:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-1',
    labelUUID: 'label-3'
  }),
  // 3 REJECTED
  new CooperationRequest({
    uuid: 'coop-author1-9',
    msg: 'К сожалению, не можем добавить ваш трек.',
    dispatchTime: '2024-07-09T13:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-1',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-10',
    msg: 'Сотрудничество по промо-кампании отклонено.',
    dispatchTime: '2024-07-10T14:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-1',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-author1-11',
    msg: 'Совместный концерт невозможен.',
    dispatchTime: '2024-07-11T15:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-1',
    labelUUID: 'label-1'
  }),
];
