import { CooperationRequest, CooperationStatus } from '../models';
import { mockCooperationRequestsAuthor1 } from './mockCooperationRequestsAuthor1';

export const mockCooperationRequests: CooperationRequest[] = [
  // 20 AWAITING
  new CooperationRequest({
    uuid: 'coop-1',
    msg: 'Хотим добавить ваш трек в наш плейлист!',
    dispatchTime: '2024-06-01T10:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-2',
    msg: 'Сотрудничество по промо-кампании.',
    dispatchTime: '2024-06-02T11:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-2',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-3',
    msg: 'Приглашаем на совместный концерт.',
    dispatchTime: '2024-06-03T12:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-3',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-4',
    msg: 'Хотим выпустить ваш альбом.',
    dispatchTime: '2024-06-04T13:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-4',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-5',
    msg: 'Партнерство для фестиваля.',
    dispatchTime: '2024-06-05T14:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-5',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-6',
    msg: 'Совместный релиз с нашим лейблом.',
    dispatchTime: '2024-06-06T15:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-7',
    msg: 'Участие в сборнике лучших треков.',
    dispatchTime: '2024-06-07T16:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-2',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-8',
    msg: 'Промоушен вашего нового сингла.',
    dispatchTime: '2024-06-08T17:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-3',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-9',
    msg: 'Съемка клипа совместно с лейблом.',
    dispatchTime: '2024-06-09T18:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-4',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-10',
    msg: 'Промо-тур по городам России.',
    dispatchTime: '2024-06-10T19:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-5',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-11',
    msg: 'Совместная запись с нашими артистами.',
    dispatchTime: '2024-06-11T10:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-12',
    msg: 'Участие в благотворительном концерте.',
    dispatchTime: '2024-06-12T11:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-2',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-13',
    msg: 'Промоушен в соцсетях лейбла.',
    dispatchTime: '2024-06-13T12:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-3',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-14',
    msg: 'Сотрудничество по мерчу.',
    dispatchTime: '2024-06-14T13:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-4',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-15',
    msg: 'Участие в подкасте лейбла.',
    dispatchTime: '2024-06-15T14:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-5',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-16',
    msg: 'Промоушен на радио.',
    dispatchTime: '2024-06-16T15:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-1',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-17',
    msg: 'Участие в музыкальном конкурсе.',
    dispatchTime: '2024-06-17T16:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-2',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-18',
    msg: 'Промоушен в плейлистах Spotify.',
    dispatchTime: '2024-06-18T17:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-3',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-19',
    msg: 'Съемка интервью для YouTube.',
    dispatchTime: '2024-06-19T18:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-4',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-20',
    msg: 'Промоушен на ТВ.',
    dispatchTime: '2024-06-20T19:00:00Z',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author-5',
    labelUUID: 'label-3'
  }),

  // 20 APPROVED
  new CooperationRequest({
    uuid: 'coop-21',
    msg: 'Ваш трек добавлен в наш плейлист!',
    dispatchTime: '2024-05-01T10:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-1',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-22',
    msg: 'Сотрудничество по промо-кампании одобрено.',
    dispatchTime: '2024-05-02T11:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-2',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-23',
    msg: 'Совместный концерт подтвержден.',
    dispatchTime: '2024-05-03T12:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-3',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-24',
    msg: 'Выпуск альбома согласован.',
    dispatchTime: '2024-05-04T13:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-4',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-25',
    msg: 'Партнерство для фестиваля подтверждено.',
    dispatchTime: '2024-05-05T14:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-5',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-26',
    msg: 'Совместный релиз одобрен.',
    dispatchTime: '2024-05-06T15:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-1',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-27',
    msg: 'Вы участвуете в сборнике лучших треков.',
    dispatchTime: '2024-05-07T16:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-2',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-28',
    msg: 'Промоушен вашего сингла одобрен.',
    dispatchTime: '2024-05-08T17:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-3',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-29',
    msg: 'Съемка клипа согласована.',
    dispatchTime: '2024-05-09T18:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-4',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-30',
    msg: 'Промо-тур по городам подтвержден.',
    dispatchTime: '2024-05-10T19:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-5',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-31',
    msg: 'Совместная запись с артистами лейбла одобрена.',
    dispatchTime: '2024-05-11T10:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-1',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-32',
    msg: 'Вы участвуете в благотворительном концерте.',
    dispatchTime: '2024-05-12T11:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-2',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-33',
    msg: 'Промоушен в соцсетях лейбла одобрен.',
    dispatchTime: '2024-05-13T12:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-3',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-34',
    msg: 'Сотрудничество по мерчу подтверждено.',
    dispatchTime: '2024-05-14T13:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-4',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-35',
    msg: 'Вы приглашены в подкаст лейбла.',
    dispatchTime: '2024-05-15T14:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-5',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-36',
    msg: 'Промоушен на радио одобрен.',
    dispatchTime: '2024-05-16T15:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-1',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-37',
    msg: 'Вы участвуете в музыкальном конкурсе.',
    dispatchTime: '2024-05-17T16:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-2',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-38',
    msg: 'Промоушен в плейлистах Spotify одобрен.',
    dispatchTime: '2024-05-18T17:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-3',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-39',
    msg: 'Съемка интервью для YouTube согласована.',
    dispatchTime: '2024-05-19T18:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-4',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-40',
    msg: 'Промоушен на ТВ одобрен.',
    dispatchTime: '2024-05-20T19:00:00Z',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author-5',
    labelUUID: 'label-3'
  }),

  // 20 REJECTED
  new CooperationRequest({
    uuid: 'coop-41',
    msg: 'К сожалению, не можем добавить ваш трек.',
    dispatchTime: '2024-04-01T10:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-1',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-42',
    msg: 'Сотрудничество по промо-кампании отклонено.',
    dispatchTime: '2024-04-02T11:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-2',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-43',
    msg: 'Совместный концерт невозможен.',
    dispatchTime: '2024-04-03T12:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-3',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-44',
    msg: 'Выпуск альбома отклонен.',
    dispatchTime: '2024-04-04T13:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-4',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-45',
    msg: 'Партнерство для фестиваля невозможно.',
    dispatchTime: '2024-04-05T14:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-5',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-46',
    msg: 'Совместный релиз отклонен.',
    dispatchTime: '2024-04-06T15:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-1',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-47',
    msg: 'Вы не участвуете в сборнике лучших треков.',
    dispatchTime: '2024-04-07T16:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-2',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-48',
    msg: 'Промоушен вашего сингла отклонен.',
    dispatchTime: '2024-04-08T17:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-3',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-49',
    msg: 'Съемка клипа невозможна.',
    dispatchTime: '2024-04-09T18:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-4',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-50',
    msg: 'Промо-тур по городам невозможен.',
    dispatchTime: '2024-04-10T19:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-5',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-51',
    msg: 'Совместная запись с артистами лейбла невозможна.',
    dispatchTime: '2024-04-11T10:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-1',
    labelUUID: 'label-3'
  }),
  new CooperationRequest({
    uuid: 'coop-52',
    msg: 'Вы не участвуете в благотворительном концерте.',
    dispatchTime: '2024-04-12T11:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-2',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-53',
    msg: 'Промоушен в соцсетях лейбла отклонен.',
    dispatchTime: '2024-04-13T12:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-3',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-54',
    msg: 'Сотрудничество по мерчу невозможно.',
    dispatchTime: '2024-04-14T13:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-4',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-55',
    msg: 'Вы не приглашены в подкаст лейбла.',
    dispatchTime: '2024-04-15T14:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-5',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-56',
    msg: 'Промоушен на радио невозможен.',
    dispatchTime: '2024-04-16T15:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-1',
    labelUUID: 'label-4'
  }),
  new CooperationRequest({
    uuid: 'coop-57',
    msg: 'Вы не участвуете в музыкальном конкурсе.',
    dispatchTime: '2024-04-17T16:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-2',
    labelUUID: 'label-5'
  }),
  new CooperationRequest({
    uuid: 'coop-58',
    msg: 'Промоушен в плейлистах Spotify невозможен.',
    dispatchTime: '2024-04-18T17:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-3',
    labelUUID: 'label-1'
  }),
  new CooperationRequest({
    uuid: 'coop-59',
    msg: 'Съемка интервью для YouTube невозможна.',
    dispatchTime: '2024-04-19T18:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-4',
    labelUUID: 'label-2'
  }),
  new CooperationRequest({
    uuid: 'coop-60',
    msg: 'Промоушен на ТВ невозможен.',
    dispatchTime: '2024-04-20T19:00:00Z',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author-5',
    labelUUID: 'label-3'
  }),
  // Добавляем моки author-1
  ...mockCooperationRequestsAuthor1
];
