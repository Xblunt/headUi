// components/AlbumCard/AlbumCard.tsx
'use client';

import React, { useState } from 'react';
import { Album, User, Song } from '@/models';
import s from './style.module.scss';
import AlbumModal from './modal';
import { FiEdit, FiTrash2, FiInfo } from "react-icons/fi";

interface AlbumCardProps {
  album: Album;
  users: User[];
  songs: Song[];
  onModal?: boolean;
  onPlay?: (song: Song) => void;
  onPause?: () => void;
  onArtistClick?: (login: string) => void;
  onUpdate?: (album: Album) => void;
  onReject?: (album: Album) => void;
  onInfo?: (album: Album) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ 
  album, 
  users, 
  songs, 
  onPlay, 
  onModal,
  onPause,
  onArtistClick,
  onUpdate,
  onReject,
  onInfo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const artist = users.find(user => user.uuid === album.authorUUID);
  const albumSongs = songs.filter(song => album.savedSongsUUIDs.includes(song.uuid));

  // Проверяем, автор ли это author111
  let isAuthor111 = false;
  if (typeof window !== 'undefined') {
    isAuthor111 = localStorage.getItem('user') === 'author111';
  }

  return (
    <>
      <div className={s.albumCard}>
        <div className={s.albumImage}>
          <img 
            src={
              album.urlImage
                ? album.urlImage
                : `/albumImg/${Math.floor(Math.random() * 50) + 1}.jpg`
            }
            alt={album.name}
          />
        </div>
        <div className={s.albumInfo}>
          <h3 className={s.albumTitle}>{album.name}</h3>
          <p 
            className={s.albumArtist}
            onClick={() => onArtistClick && artist?.login ? onArtistClick(artist.login) : undefined}
          >
            {artist?.login || 'Unknown Artist'}
          </p>
          <button 
            className={s.openButton}
            onClick={() => setIsModalOpen(true)}
          >
            Открыть
          </button>
          {/* Только для author111 показываем кнопки */}
          {isAuthor111 && (
            <div className={s.albumActions}>
              <button
                className={s.actionButton}
                title="Информация"
                onClick={e => {
                  e.stopPropagation();
                  onInfo?.(album);
                }}
              >
                <FiInfo size={18} />
              </button>
              <button
                className={s.actionButton}
                title="Редактировать"
                onClick={e => {
                  e.stopPropagation();
                  setShowEdit(true);
                  onUpdate?.(album);
                }}
              >
                <FiEdit size={18} />
              </button>
              <button
                className={s.actionButton}
                title="Удалить"
                onClick={e => {
                  e.stopPropagation();
                  setShowDelete(true);
                  onReject?.(album);
                }}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AlbumModal
          album={album}
          artist={artist}
          songs={albumSongs}
          onModal={onModal}
          onPause={onPause ? onPause : () => {}}
          onClose={() => setIsModalOpen(false)}
          onPlay={onPlay ? onPlay : () => {}}
          onArtistClick={onArtistClick ? onArtistClick : () => {}}
        />
      )}
      {/* Модалка редактирования альбома */}
      {/* {isAuthor111 && showEdit && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <button className={s.closeButton} onClick={() => setShowEdit(false)}>×</button>
            <h3>Редактировать альбом</h3>
            <div style={{ padding: 24, textAlign: 'center' }}>
              [ Форма редактирования альбома ]
            </div>
          </div>
        </div>
      )} */}
      {/* Модалка удаления альбома */}
    
    </>
  );
};

export default AlbumCard;