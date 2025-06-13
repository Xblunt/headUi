// components/AlbumModal/AlbumModal.tsx
'use client';

import React from 'react';
import { Album, User, Song } from '@/models';
import s from './style.module.scss';
import TrackRow from '@/components/track';


interface AlbumModalProps {
  album: Album;
  artist?: User;
  songs: Song[];
  onClose: () => void;
  onPlay: (song: Song) => void;
  onPause: () => void;
  onArtistClick: (login: string) => void;
}

const AlbumModal: React.FC<AlbumModalProps> = ({ 
  album, 
  artist, 
  songs, 
  onClose, 
  onPlay, 
  onPause,
  onArtistClick 
}) => {
  // Создаем fallback пользователя с минимальными данными
  const fallbackUser = new User({
    uuid: 'unknown',
    login: 'Unknown Artist',
    roles: ['ARTIST'],
    imgFileUUID: '',
    description: ''
  });

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <button className={s.closeButton} onClick={onClose}>×</button>
        
        <div className={s.modalHeader}>
          <img 
            src={album.urlImage || "https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg"}  
            alt={album.name}
            className={s.modalAlbumImage}
          />
          <div className={s.modalAlbumInfo}>
            <h2 className={s.modalAlbumTitle}>{album.name}</h2>
            <p 
              className={s.modalAlbumArtist}
              onClick={() => onArtistClick(artist?.login || 'unknown')}
            >
              {artist?.login || 'Unknown Artist'}
            </p>
            <p className={s.modalAlbumStats}>{songs.length} треков</p>
          </div>
        </div>

        <div className={s.modalTracks}>
          {songs.map((song, index) => (
            <TrackRow
              key={song.uuid}
              song={song}
              currentSong={null}
              isPlaying={false}
              onPlay={onPlay}
              onPause={onPause}
              onArtistClick={onArtistClick}
              index={index}
              users={[artist || fallbackUser]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;