// components/AlbumCard/AlbumCard.tsx
'use client';

import React, { useState } from 'react';
import { Album, User, Song } from '@/models';
import s from './style.module.scss';
import AlbumModal from './modal';

interface AlbumCardProps {
  album: Album;
  users: User[];
  songs: Song[];
  onPlay: (song: Song) => void;
  onPause: () => void;
  onArtistClick: (login: string) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ 
  album, 
  users, 
  songs, 
  onPlay, 
  onPause,
  onArtistClick 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const artist = users.find(user => user.uuid === album.authorUUID);
  const albumSongs = songs.filter(song => album.savedSongsUUIDs.includes(song.uuid));

  return (
    <>
      <div className={s.albumCard}>
        <div className={s.albumImage}>
          <img 
            src="https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg" 
            alt={album.name}
          />
        </div>
        <div className={s.albumInfo}>
          <h3 className={s.albumTitle}>{album.name}</h3>
          <p 
            className={s.albumArtist}
            onClick={() => onArtistClick(artist?.login || '')}
          >
            {artist?.login || 'Unknown Artist'}
          </p>
          <button 
            className={s.openButton}
            onClick={() => setIsModalOpen(true)}
          >
            Открыть
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AlbumModal
          album={album}
          artist={artist}
          songs={albumSongs}
          onPause={onPause}
          onClose={() => setIsModalOpen(false)}
          onPlay={onPlay}
          onArtistClick={onArtistClick}
        />
      )}
    </>
  );
};

export default AlbumCard;