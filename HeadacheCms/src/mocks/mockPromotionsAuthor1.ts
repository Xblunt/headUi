import { PromotionRequest, PromotionStatus } from '../models';

export const mockPromotionsAuthor1: PromotionRequest[] = [
  new PromotionRequest({
    uuid: 'promo-author1-1',
    songUUID: 'song-1',
    msg: '🔥 Новый хит от author-1!',
    dispatchTime: '2024-07-01T10:00:00Z',
    confirmationTime: '2024-07-01T12:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-1',
    urlImg: '/promoImg/1.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-2',
    songUUID: 'song-4',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-02T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-4',
    urlImg: '/promoImg/4.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-3',
    songUUID: 'song-15',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-03T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-15',
    urlImg: '/promoImg/15.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-4',
    songUUID: 'song-25',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-04T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-25',
    urlImg: '/promoImg/25.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-5',
    songUUID: 'song-35',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-05T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-35',
    urlImg: '/promoImg/35.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-6',
    songUUID: 'song-45',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-06T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-45',
    urlImg: '/promoImg/45.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-7',
    songUUID: 'song-55',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-07T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-55',
    urlImg: '/promoImg/55.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-8',
    songUUID: 'song-65',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-08T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-65',
    urlImg: '/promoImg/5.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-9',
    songUUID: 'song-19',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-09T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-19',
    urlImg: '/promoImg/19.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-author1-10',
    songUUID: 'song-55',
    msg: 'Ожидает промоушена',
    dispatchTime: '2024-07-10T10:00:00Z',
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-55',
    urlImg: '/promoImg/25.jpg'
  }),
];
