'use client';

import React, { useState, useMemo } from 'react';
import { Song, Album, SongStatus, User } from '@/models';
import { mockSongs } from '@/mocks/mockSongs';
import { mockAlbums } from '@/mocks/mockAlbums';
import { mockUsers } from '@/mocks/mockUsers';
import TrackRow from '@/components/track';
import AlbumCard from '@/components/album';
import Modal from '@/components/modal';
import s from './style.module.scss';

const AUTHOR_LOGIN = 'author111';
const author = mockUsers.find(u => u.login === AUTHOR_LOGIN);

const allAuthorSongs: Song[] = mockSongs.filter(song => song.authorUUID === author?.uuid);
const allAuthorAlbums: Album[] = mockAlbums.filter(album => album.authorUUID === author?.uuid);

const statusTabs: { key: SongStatus; label: string }[] = [
  { key: SongStatus.APPROVED, label: 'Одобренные' },
  { key: SongStatus.AWAITING, label: 'На модерации' },
  { key: SongStatus.DISAPPROVED, label: 'Отклонённые' },
];

const MyMusicPage = () => {
  const [activeTrackTab, setActiveTrackTab] = useState<SongStatus>(SongStatus.APPROVED);
  const [trackSearch, setTrackSearch] = useState('');
  const [albumSearch, setAlbumSearch] = useState('');
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [trackToEdit, setTrackToEdit] = useState<Song | null>(null);
  const [albumToEdit, setAlbumToEdit] = useState<Album | null>(null);
  const [trackToDelete, setTrackToDelete] = useState<Song | null>(null);
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);
  const [infoTrack, setInfoTrack] = useState<Song | null>(null);

  // Фильтрация треков по статусу и поиску
  const filteredTracks = useMemo(() => {
    return allAuthorSongs
      .filter(song => song.status === activeTrackTab)
      .filter(song =>
        song.name.toLowerCase().includes(trackSearch.toLowerCase()) ||
        (mockUsers.find(u => u.uuid === song.authorUUID)?.login.toLowerCase().includes(trackSearch.toLowerCase()))
      );
  }, [activeTrackTab, trackSearch]);

  // Фильтрация альбомов по поиску
  const filteredAlbums = useMemo(() => {
    return allAuthorAlbums.filter(album =>
      album.name.toLowerCase().includes(albumSearch.toLowerCase())
    );
  }, [albumSearch]);

  // --- CRUD handlers (заглушки) ---
  const handleCreateTrack = () => {
    setTrackToEdit(null);
    setShowTrackModal(true);
  };
  const handleEditTrack = (song: Song) => {
    setTrackToEdit(song);
    setShowTrackModal(true);
  };
  const handleDeleteTrack = (song: Song) => {
    setTrackToDelete(song);
  };
  const handleConfirmDeleteTrack = () => {
    // Здесь логика удаления трека
    setTrackToDelete(null);
  };

  const handleCreateAlbum = () => {
    setAlbumToEdit(null);
    setShowAlbumModal(true);
  };
  const handleEditAlbum = (album: Album) => {
    setAlbumToEdit(album);
    setShowAlbumModal(true);
  };
  const handleDeleteAlbum = (album: Album) => {
    setAlbumToDelete(album);
  };
  const handleConfirmDeleteAlbum = () => {
    // Здесь логика удаления альбома
    setAlbumToDelete(null);
  };

  // --- Локальный плеер для TrackRow ---
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // --- Audio logic для треков и альбомов ---
  React.useEffect(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setProgress(0);
      setDuration(0);
      setAudio(null);
    }
    if (currentSong) {
      const newAudio = new Audio(currentSong.url);
      setAudio(newAudio);

      const updateProgress = () => {
        setProgress(newAudio.currentTime);
        setDuration(newAudio.duration || 0);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      newAudio.addEventListener('timeupdate', updateProgress);
      newAudio.addEventListener('ended', handleEnded);

      if (isPlaying) newAudio.play();

      return () => {
        newAudio.pause();
        newAudio.removeEventListener('timeupdate', updateProgress);
        newAudio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSong]);

  React.useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  const handleTrackPlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTrackPause = () => {
    setIsPlaying(false);
  };

  return (
    <div className={"wrapper"}>
      {/* <div className={s.myMusicHeader}>
        <h1>Моя музыка</h1>
      </div> */}

      {/* Треки */}
      <div className={s.tracksBlock}>
        <div className={s.tabsHeader}>
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              className={`${s.tabButton} ${activeTrackTab === tab.key ? s.active : ''}`}
              onClick={() => setActiveTrackTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
          <div className={s.createTrackButton} onClick={handleCreateTrack}>+</div>
        </div>
        <div className={s.trackSearchRow}>
          <input
            type="text"
            placeholder="Поиск треков..."
            value={trackSearch}
            onChange={e => setTrackSearch(e.target.value)}
            className={s.trackSearchInput}
          />
        </div>
        <div className={s.tracksList}>
          {filteredTracks.length > 0 ? (
            filteredTracks.map((song, idx) => (
              <TrackRow
                key={song.uuid}
                song={song}
                currentSong={currentSong}
                isModal={true}
                isPlaying={currentSong?.uuid === song.uuid && isPlaying}
                onPlay={handleTrackPlay}
                onPause={handleTrackPause}
                onArtistClick={() => {}}
                index={idx}
                users={mockUsers}
                onEdit={handleEditTrack}
                onDelete={() => handleDeleteTrack(song)}
                onInfo={setInfoTrack}
                // Прогресс бар для текущего трека
                progress={currentSong?.uuid === song.uuid && duration > 0 ? (progress / duration) * 100 : 0}
                // duration={duration}
                // currentTime={progress}
                showProgressBar={false}
              />
            ))
          ) : (
            <div className={s.noResults}>Нет треков</div>
          )}
        </div>
      </div>

      {/* Альбомы */}
      <div className={s.albumsBlock}>
        <div className={s.albumsHeader}>
          <h2>Альбомы</h2>
          <div className={s.createAlbumButton} onClick={handleCreateAlbum}>+</div>
        </div>
        <div className={s.albumSearchRow}>
          <input
            type="text"
            placeholder="Поиск альбомов..."
            value={albumSearch}
            onChange={e => setAlbumSearch(e.target.value)}
            className={s.albumSearchInput}
          />
        </div>
        {/* Сетка альбомов как в main */}
        <div className={s.albumsGridMain}>
          {filteredAlbums.length > 0 ? (
            filteredAlbums.map(album => (
              <AlbumCard
                key={album.uuid}
                album={album}
                users={mockUsers}
                songs={mockSongs}
                onPlay={handleTrackPlay}
                onPause={handleTrackPause}
                onArtistClick={() => {}}
                onUpdate={handleEditAlbum}
                onReject={() => handleDeleteAlbum(album)}
                // Можно добавить onInfo если нужно
              />
            ))
          ) : (
            <div className={s.noResults}>Нет альбомов</div>
          )}
        </div>
      </div>

      {/* Модальные окна */}
      {showTrackModal && (
        <Modal isOpen={showTrackModal} onClose={() => setShowTrackModal(false)} title={trackToEdit ? 'Редактировать трек' : 'Создать трек'}>
          <div style={{ padding: 24, textAlign: 'center' }}>
            [ Форма создания/редактирования трека ]
          </div>
        </Modal>
      )}
      {trackToDelete && (
        <Modal isOpen={!!trackToDelete} onClose={() => setTrackToDelete(null)} title="Удалить трек?">
          <div style={{ padding: 24, textAlign: 'center' }}>
            <p>Вы уверены, что хотите удалить трек <b>{trackToDelete.name}</b>?</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button className={s.cancelButton} onClick={() => setTrackToDelete(null)}>Отмена</button>
              <button className={s.deleteButton} onClick={handleConfirmDeleteTrack}>Удалить</button>
            </div>
          </div>
        </Modal>
      )}
      {showAlbumModal && (
        <Modal isOpen={showAlbumModal} onClose={() => setShowAlbumModal(false)} title={albumToEdit ? 'Редактировать альбом' : 'Создать альбом'}>
          <div style={{ padding: 24, textAlign: 'center' }}>
            [ Форма создания/редактирования альбома ]
          </div>
        </Modal>
      )}
      {albumToDelete && (
        <Modal isOpen={!!albumToDelete} onClose={() => setAlbumToDelete(null)} title="Удалить альбом?">
          <div style={{ padding: 24, textAlign: 'center' }}>
            <p>Вы уверены, что хотите удалить альбом <b>{albumToDelete.name}</b>?</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button className={s.cancelButton} onClick={() => setAlbumToDelete(null)}>Отмена</button>
              <button className={s.deleteButton} onClick={handleConfirmDeleteAlbum}>Удалить</button>
            </div>
          </div>
        </Modal>
      )}
      {infoTrack && (
        <Modal isOpen={!!infoTrack} onClose={() => setInfoTrack(null)} title="Информация о треке">
          <div style={{ padding: 24 }}>
            <pre style={{ textAlign: 'left', fontSize: 14 }}>{JSON.stringify(infoTrack, null, 2)}</pre>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyMusicPage;
