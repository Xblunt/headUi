import { PromotionRequest, PromotionStatus } from '../models';
import { mockPromotionsAuthor1 } from './mockPromotionsAuthor1';

export const mockPromotions: PromotionRequest[] = [
  mockPromotionsAuthor1[0],
  new PromotionRequest({
    uuid: 'promo-2',
    songUUID: 'song-2',
    msg: '🎶 Satie Remix теперь в топе!',
    dispatchTime: '2024-06-02T11:00:00Z',
    confirmationTime: '2024-06-02T13:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-2',
    urlImg: '/promoImg/2.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-3',
    songUUID: 'song-3',
    msg: '💼 The Office — музыка для работы.',
    dispatchTime: '2024-06-03T12:00:00Z',
    confirmationTime: '2024-06-03T14:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-3',
    urlImg: '/promoImg/3.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-4',
    songUUID: 'song-4',
    msg: '🎤 Amazing Grace — вдохновляющий вокал.',
    dispatchTime: '2024-06-04T13:00:00Z',
    confirmationTime: '2024-06-04T15:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-4',
    urlImg: '/promoImg/4.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-5',
    songUUID: 'song-5',
    msg: '🌙 Moonlight Sonata — классика вечера.',
    dispatchTime: '2024-06-05T14:00:00Z',
    confirmationTime: '2024-06-05T16:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-5',
    urlImg: '/promoImg/5.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-6',
    songUUID: 'song-6',
    msg: '💖 Heartfelt — трогательный поп-хит.',
    dispatchTime: '2024-06-06T15:00:00Z',
    confirmationTime: '2024-06-06T17:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-6',
    urlImg: '/promoImg/6.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-7',
    songUUID: 'song-7',
    msg: '🎸 Track Seven — рок для всех!',
    dispatchTime: '2024-06-07T16:00:00Z',
    confirmationTime: '2024-06-07T18:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-7',
    urlImg: '/promoImg/7.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-8',
    songUUID: 'song-8',
    msg: '🌅 Track Eight — встречай рассвет с музыкой.',
    dispatchTime: '2024-06-08T17:00:00Z',
    confirmationTime: '2024-06-08T19:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-8',
    urlImg: '/promoImg/8.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-9',
    songUUID: 'song-9',
    msg: '🎷 Track Nine — джазовые импровизации.',
    dispatchTime: '2024-06-09T18:00:00Z',
    confirmationTime: '2024-06-09T20:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-9',
    urlImg: '/promoImg/9.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-10',
    songUUID: 'song-10',
    msg: '🔥 Track Ten — новый танцевальный хит!',
    dispatchTime: '2024-06-10T19:00:00Z',
    confirmationTime: '2024-06-10T21:00:00Z',
    status: PromotionStatus.PROMOTED,
    fileUUID: 'file-10',
    urlImg: '/promoImg/10.jpg'
  }),

  new PromotionRequest({
    uuid: 'promo-11',
    songUUID: 'song-11',
    msg: '🔥 Processing: Track Eleven!',
    dispatchTime: '2024-06-11T10:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-11',
    urlImg: '/promoImg/11.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-12',
    songUUID: 'song-12',
    msg: '🎶 Processing: Track Twelve!',
    dispatchTime: '2024-06-12T11:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-12',
    urlImg: '/promoImg/12.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-13',
    songUUID: 'song-13',
    msg: '💼 Processing: Track Thirteen.',
    dispatchTime: '2024-06-13T12:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-13',
    urlImg: '/promoImg/13.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-14',
    songUUID: 'song-14',
    msg: '🎤 Processing: Track Fourteen.',
    dispatchTime: '2024-06-14T13:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-14',
    urlImg: '/promoImg/14.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-15',
    songUUID: 'song-15',
    msg: '🌙 Processing: Track Fifteen.',
    dispatchTime: '2024-06-15T14:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-15',
    urlImg: '/promoImg/15.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-16',
    songUUID: 'song-16',
    msg: '💖 Processing: Track Sixteen.',
    dispatchTime: '2024-06-16T15:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-16',
    urlImg: '/promoImg/16.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-17',
    songUUID: 'song-17',
    msg: '🎸 Processing: Track Seventeen!',
    dispatchTime: '2024-06-17T16:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-17',
    urlImg: '/promoImg/17.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-18',
    songUUID: 'song-18',
    msg: '🌅 Processing: Track Eighteen.',
    dispatchTime: '2024-06-18T17:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-18',
    urlImg: '/promoImg/18.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-19',
    songUUID: 'song-19',
    msg: '🎷 Processing: Track Nineteen.',
    dispatchTime: '2024-06-19T18:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-19',
    urlImg: '/promoImg/19.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-20',
    songUUID: 'song-20',
    msg: '🔥 Processing: Track Twenty!',
    dispatchTime: '2024-06-20T19:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.PROCESSING,
    fileUUID: 'file-20',
    urlImg: '/promoImg/20.jpg'
  }),

  new PromotionRequest({
    uuid: 'promo-21',
    songUUID: 'song-21',
    msg: '🔥 Awaiting: Track Twenty-One!',
    dispatchTime: '2024-06-21T10:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-21',
    urlImg: '/promoImg/21.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-22',
    songUUID: 'song-22',
    msg: '🎶 Awaiting: Track Twenty-Two!',
    dispatchTime: '2024-06-22T11:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-22',
    urlImg: '/promoImg/22.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-23',
    songUUID: 'song-23',
    msg: '💼 Awaiting: Track Twenty-Three.',
    dispatchTime: '2024-06-23T12:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-23',
    urlImg: '/promoImg/23.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-24',
    songUUID: 'song-24',
    msg: '🎤 Awaiting: Track Twenty-Four.',
    dispatchTime: '2024-06-24T13:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-24',
    urlImg: '/promoImg/24.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-25',
    songUUID: 'song-25',
    msg: '🌙 Awaiting: Track Twenty-Five.',
    dispatchTime: '2024-06-25T14:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-25',
    urlImg: '/promoImg/25.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-26',
    songUUID: 'song-26',
    msg: '💖 Awaiting: Track Twenty-Six.',
    dispatchTime: '2024-06-26T15:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-26',
    urlImg: '/promoImg/26.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-27',
    songUUID: 'song-27',
    msg: '🎸 Awaiting: Track Twenty-Seven!',
    dispatchTime: '2024-06-27T16:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-27',
    urlImg: '/promoImg/27.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-28',
    songUUID: 'song-28',
    msg: '🌅 Awaiting: Track Twenty-Eight.',
    dispatchTime: '2024-06-28T17:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-28',
    urlImg: '/promoImg/28.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-29',
    songUUID: 'song-29',
    msg: '🎷 Awaiting: Track Twenty-Nine.',
    dispatchTime: '2024-06-29T18:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-29',
    urlImg: '/promoImg/29.jpg'
  }),
  new PromotionRequest({
    uuid: 'promo-30',
    songUUID: 'song-30',
    msg: '🔥 Awaiting: Track Thirty!',
    dispatchTime: '2024-06-30T19:00:00Z',
    confirmationTime: undefined,
    status: PromotionStatus.AWAITING_PROMOTION,
    fileUUID: 'file-30',
    urlImg: '/promoImg/30.jpg'
  }),
];
