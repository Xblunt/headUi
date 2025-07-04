import { SongStatus } from '../models';
import { mockAlbums } from './mockAlbums';
import { mockSongs } from './mockSongs';

export const author1Albums = mockAlbums.filter(
  album => album.authorUUID === 'author-1'
);

export const author1Songs = mockSongs.filter(
  song => song.authorUUID === 'author-1' && song.status === SongStatus.APPROVED
);
