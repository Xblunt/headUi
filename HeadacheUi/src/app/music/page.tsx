'use client';

import React, { useState, useMemo } from 'react';
import { Song, Album, SongStatus, User, Tag } from '@/models';
import { mockSongs, tags } from '@/mocks/mockSongs';
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
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [promoteSong, setPromoteSong] = useState<Song | null>(null);
  const [promoteMessage, setPromoteMessage] = useState('');

  // --- CRUD handlers (реализация) ---
  const [songs, setSongs] = useState<Song[]>(allAuthorSongs);
  const [albums, setAlbums] = useState<Album[]>(allAuthorAlbums);

  // Форма для трека
  const [trackForm, setTrackForm] = useState<Partial<Song & { urlImageFile?: File; audioFile?: File; tagList?: Tag[] | string[] }>>({});

  // Форма для альбома
  const [albumForm, setAlbumForm] = useState<Partial<Album & { coverFile?: File; trackUuids?: string[] }>>({});

  // Открыть модал создания трека
  const handleCreateTrack = () => {
    setTrackForm({
      name: '',
      url: '',
      urlImage: '',
      authorUUID: author?.uuid,
      status: SongStatus.AWAITING,
      uuid: Math.random().toString(36).slice(2),
      tagList: [],
    });
    setTrackToEdit(null);
    setShowTrackModal(true);
  };

   const handleSubmitPromotion = () => {
    // Здесь будет логика отправки на сервер
    console.log('Отправка на продвижение:', {
      song: promoteSong?.name,
      message: promoteMessage
    });
    setShowPromoteModal(false);
  };

  const handlePromoteTrack = (song: Song) => {
    setPromoteSong(song);
    setPromoteMessage(`"${song.name}" - иновационный продукт нашего времени`);
    setShowPromoteModal(true);
  };


  // Открыть модал редактирования трека
  const handleEditTrack = (song: Song) => {
    setTrackForm({
      ...song,
      tagList: song.tags || [],
      urlImageFile: undefined,
      audioFile: undefined,
    });
    setTrackToEdit(song);
    setShowTrackModal(true);
  };

  // Сохранить трек (создать или обновить)
  const handleSaveTrack = () => {
    if (!trackForm.name || (!trackForm.url && !trackForm.audioFile)) return;
    // Обработка файлов (заглушка, обычно upload на сервер)
    let urlImageUrl = trackForm.urlImage;
    let audioUrl = trackForm.url;
    if (trackForm.urlImageFile) {
      urlImageUrl = URL.createObjectURL(trackForm.urlImageFile);
    }
    if (trackForm.audioFile) {
      audioUrl = URL.createObjectURL(trackForm.audioFile);
    }
    // Преобразование tagList в массив Tag если нужно
    let tagsResult: Tag[] = [];
    if (trackForm.tagList && typeof trackForm.tagList[0] === 'string') {
      tagsResult = tags.filter(t => (trackForm.tagList as string[]).includes(t.tagName));
    } else if (trackForm.tagList) {
      tagsResult = trackForm.tagList as Tag[];
    }
    const newSong: Song = {
      ...trackForm,
      urlImage: urlImageUrl || '',
      url: audioUrl || '',
      tags: tagsResult,
      status: trackToEdit ? trackToEdit.status : SongStatus.AWAITING,
      uuid: trackToEdit ? trackToEdit.uuid : (trackForm.uuid as string),
      authorUUID: author?.uuid || '',
    } as Song;
    if (trackToEdit) {
      setSongs(songs =>
        songs.map(s => (s.uuid === trackToEdit.uuid ? newSong : s))
      );
    } else {
      setSongs(songs => [newSong, ...songs]);
    }
    setShowTrackModal(false);
    setTrackToEdit(null);
    setTrackForm({});
  };

  // Удалить трек
  const handleDeleteTrack = (song: Song) => {
    setTrackToDelete(song);
  };
  const handleConfirmDeleteTrack = () => {
    setSongs(songs => songs.filter(s => s.uuid !== trackToDelete?.uuid));
    setTrackToDelete(null);
  };

  // Просмотр информации о треке
  const handleInfoTrack = (song: Song) => {
    setInfoTrack(song);
  };

  // Открыть модал создания альбома
  const handleCreateAlbum = () => {
    setAlbumForm({
      name: '',
      urlImage: '',
      authorUUID: author?.uuid,
      uuid: Math.random().toString(36).slice(2),
      trackUuids: [],
    });
    setAlbumToEdit(null);
    setShowAlbumModal(true);
  };

  // Открыть модал редактирования альбома
  const handleEditAlbum = (album: Album) => {
    setAlbumForm({
      ...album,
      trackUuids: album.savedSongsUUIDs  || [],
      coverFile: undefined,
    });
    setAlbumToEdit(album);
    setShowAlbumModal(true);
  };

  // Сохранить альбом (создать или обновить)
  const handleSaveAlbum = () => {
    if (!albumForm.name) return;
    let coverUrl = albumForm.urlImage;
    if (albumForm.coverFile) {
      coverUrl = URL.createObjectURL(albumForm.coverFile);
    }
    const newAlbum: Album = {
      ...albumForm,
      cover: coverUrl || '',
      urlImage: coverUrl || '',
      tracks: albumForm.trackUuids || [],
      savedSongsUUIDs: albumForm.trackUuids || [],
      uuid: albumToEdit ? albumToEdit.uuid : (albumForm.uuid as string),
      authorUUID: author?.uuid || '',
    } as Album;
    if (albumToEdit) {
      setAlbums(albums =>
        albums.map(a => (a.uuid === albumToEdit.uuid ? newAlbum : a))
      );
    } else {
      setAlbums(albums => [newAlbum, ...albums]);
    }
    setShowAlbumModal(false);
    setAlbumToEdit(null);
    setAlbumForm({});
  };

  // Удалить альбом
  const handleDeleteAlbum = (album: Album) => {
    setAlbumToDelete(album);
  };
  const handleConfirmDeleteAlbum = () => {
    setAlbums(albums => albums.filter(a => a.uuid !== albumToDelete?.uuid));
    setAlbumToDelete(null);
  };

  // Просмотр информации об альбоме
  const [infoAlbum, setInfoAlbum] = useState<Album | null>(null);
  const handleInfoAlbum = (album: Album) => {
    setInfoAlbum(album);
  };

  // Фильтрация треков по статусу и поиску
  const filteredTracks = useMemo(() => {
    return songs
      .filter(song => song.status === activeTrackTab)
      .filter(song =>
        song.name.toLowerCase().includes(trackSearch.toLowerCase()) ||
        (mockUsers.find(u => u.uuid === song.authorUUID)?.login.toLowerCase().includes(trackSearch.toLowerCase()))
      );
  }, [songs, activeTrackTab, trackSearch]);

  // Фильтрация альбомов по поиску
  const filteredAlbums = useMemo(() => {
    return albums.filter(album =>
      album.name.toLowerCase().includes(albumSearch.toLowerCase())
    );
  }, [albums, albumSearch]);

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
                onPromote={() => handlePromoteTrack(song)}
                users={mockUsers}
                onEdit={handleEditTrack}
                onDelete={() => handleDeleteTrack(song)}
                onInfo={handleInfoTrack}
                progress={currentSong?.uuid === song.uuid && duration > 0 ? (progress / duration) * 100 : 0}
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
                onUpdate={() => handleEditAlbum(album)}
                onReject={() => handleDeleteAlbum(album)}
                onInfo={() => handleInfoAlbum(album)}
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
          <form
            style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 320 }}
            onSubmit={e => {
              e.preventDefault();
              handleSaveTrack();
            }}
          >
            {/* Название */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Название трека</label>
              <input
                type="text"
                placeholder="Название трека"
                value={trackForm.name || ''}
                onChange={e => setTrackForm(f => ({ ...f, name: e.target.value }))}
                required
                className={s.input}
                style={{ width: '100%' }}
              />
            </div>
            {/* Обложка */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Обложка</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  setTrackForm(f => ({
                    ...f,
                    urlImageFile: file,
                    urlImage: file ? URL.createObjectURL(file) : f.urlImage,
                  }));
                }}
                className={s.input}
              />
              {(trackForm.urlImage || trackForm.urlImageFile) && (
                <img
                  src={trackForm.urlImageFile ? URL.createObjectURL(trackForm.urlImageFile) : trackForm.urlImage}
                  alt="urlImage"
                  style={{ marginTop: 8, width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                />
              )}
            </div>
            {/* Трек файл */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Трек файл</label>
              <input
                type="file"
                accept="audio/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  setTrackForm(f => ({
                    ...f,
                    audioFile: file,
                    url: file ? URL.createObjectURL(file) : f.url,
                  }));
                }}
                className={s.input}
              />
              {(trackForm.url || trackForm.audioFile) && (
                <audio
                  controls
                  src={trackForm.audioFile ? URL.createObjectURL(trackForm.audioFile) : trackForm.url}
                  style={{ marginTop: 8, width: '100%' }}
                />
              )}
            </div>
            {/* Теги */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Теги</label>
              <select
                multiple
                value={
                  (trackForm.tagList && typeof trackForm.tagList[0] === 'string')
                    ? (trackForm.tagList as string[])
                    : (trackForm.tagList ? (trackForm.tagList as Tag[]).map(t => t.tagName) : [])
                }
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                  setTrackForm(f => ({ ...f, tagList: selected }));
                }}
                className={s.input}
                style={{ minHeight: 60 }}
              >
                {tags.map(tag => (
                  <option key={tag.uuid} value={tag.tagName}>{tag.tagName}</option>
                ))}
              </select>
              <div style={{ marginTop: 4, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(trackForm.tagList && typeof trackForm.tagList[0] === 'string'
                  ? tags.filter(t => (trackForm.tagList as string[]).includes(t.tagName))
                  : (trackForm.tagList as Tag[] || [])
                ).map(tag =>
                  <span key={tag.uuid} style={{
                    background: '#f0f0f0',
                    borderRadius: 8,
                    padding: '2px 10px',
                    fontSize: 13,
                    color: '#333'
                  }}>{typeof tag === 'string' ? tag : tag.tagName}</span>
                )}
              </div>
            </div>
            {/* Статус только при создании */}
            {/* {!trackToEdit && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <label style={{ fontWeight: 500 }}>Статус</label>
                <select
                  value={trackForm.status || SongStatus.AWAITING}
                  onChange={e => setTrackForm(f => ({ ...f, status: e.target.value as SongStatus }))}
                  className={s.input}
                >
                  <option value={SongStatus.APPROVED}>Одобрен</option>
                  <option value={SongStatus.AWAITING}>На модерации</option>
                  <option value={SongStatus.DISAPPROVED}>Отклонён</option>
                </select>
              </div>
            )} */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
              <button type="button" className={s.cancelButton} onClick={() => setShowTrackModal(false)}>
                Отмена
              </button>
              <button type="submit" className={s.saveButton}>
                {trackToEdit ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {showPromoteModal && promoteSong && (
  <Modal 
    isOpen={showPromoteModal} 
    onClose={() => setShowPromoteModal(false)} 
    title="Отправить на продвижение"
  >
    <div style={{ padding: 24, minWidth: 400 }}>
      <div style={{ marginBottom: 16 }}>
        <strong>Трек:</strong> {promoteSong.name}
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          Сообщение:
        </label>
        <textarea
          value={promoteMessage}
          onChange={(e) => setPromoteMessage(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button 
          className={s.cancelButton}
          onClick={() => setShowPromoteModal(false)}
        >
          Отмена
        </button>
        <button 
          className={s.saveButton}
          onClick={handleSubmitPromotion}
        >
          Отправить
        </button>
      </div>
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
      {infoTrack && (
        <Modal isOpen={!!infoTrack} onClose={() => setInfoTrack(null)} title="Информация о треке">
          <div style={{ padding: 24, minWidth: 320 }}>
            {/* Название */}
            <div style={{ marginBottom: 12 }}>
              <b>Название:</b> {infoTrack.name}
            </div>
            {/* Обложка */}
            {infoTrack.urlImage && (
              <div style={{ marginBottom: 12 }}>
                <b>Обложка:</b><br />
                <img src={infoTrack.urlImage} alt="urlImage" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
              </div>
            )}
            {/* Теги */}
            <div style={{ marginBottom: 12 }}>
              <b>Теги:</b>{' '}
              {(infoTrack.tags || []).length > 0
                ? infoTrack.tags.map(tag => (
                    <span key={tag.uuid} style={{
                      background: '#f0f0f0',
                      borderRadius: 8,
                      padding: '2px 10px',
                      fontSize: 13,
                      color: '#333',
                      marginRight: 4
                    }}>{tag.tagName}</span>
                  ))
                : <span style={{ color: '#aaa' }}>нет</span>
              }
            </div>
            {/* Статус */}
            <div style={{ marginBottom: 12 }}>
              <b>Статус:</b> {statusTabs.find(t => t.key === infoTrack.status)?.label}
            </div>
            {/* Ссылка на трек */}
            <div style={{ marginBottom: 12 }}>
              <b>Трек:</b><br />
              <audio controls src={infoTrack.url} style={{ width: '100%' }} />
            </div>
          </div>
        </Modal>
      )}
      {showAlbumModal && (
        <Modal isOpen={showAlbumModal} onClose={() => setShowAlbumModal(false)} title={albumToEdit ? 'Редактировать альбом' : 'Создать альбом'}>
          <form
            style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 320 }}
            onSubmit={e => {
              e.preventDefault();
              handleSaveAlbum();
            }}
          >
            {/* Название */}
            <div className={s.formRow}>
              <label className={s.formLabel}>Название альбома</label>
              <input
                type="text"
                placeholder="Название альбома"
                value={albumForm.name || ''}
                onChange={e => setAlbumForm(f => ({ ...f, name: e.target.value }))}
                required
                className={s.input}
              />
            </div>
            {/* Обложка */}
            <div className={s.formRow}>
              <label className={s.formLabel}>Обложка</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  setAlbumForm(f => ({
                    ...f,
                    coverFile: file,
                    urlImage: file ? URL.createObjectURL(file) : f.urlImage,
                  }));
                }}
                className={s.input}
              />
              {(albumForm.urlImage || albumForm.coverFile) && (
                <img
                  src={albumForm.coverFile ? URL.createObjectURL(albumForm.coverFile) : albumForm.urlImage}
                  alt="cover"
                  className={s.trackCoverPreview}
                />
              )}
            </div>
            {/* Треки */}
            <div className={s.formRow}>
              <label className={s.formLabel}>Треки</label>
              <select
                multiple
                value={albumForm.trackUuids || []}
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                  setAlbumForm(f => ({ ...f, trackUuids: selected }));
                }}
                className={`${s.input} ${s.selectInput}`}
                style={{ minHeight: 60 }}
              >
                {mockSongs.map(song => (
                  <option key={song.uuid} value={song.uuid}>{song.name}</option>
                ))}
              </select>
              <div style={{ marginTop: 4, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(albumForm.trackUuids || []).map(uuid => {
                  const song = mockSongs.find(s => s.uuid === uuid);
                  return song ? (
                    <span key={uuid} className={s.tagPill}>{song.name}</span>
                  ) : null;
                })}
              </div>
            </div>
            <div className={s.formButtons}>
              <button type="button" className={s.cancelButton} onClick={() => setShowAlbumModal(false)}>
                Отмена
              </button>
              <button type="submit" className={s.saveButton}>
                {albumToEdit ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </form>
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
      {infoAlbum && (
        <Modal isOpen={!!infoAlbum} onClose={() => setInfoAlbum(null)} title="Информация об альбоме">
          <div className={s.infoModalContent} style={{ color: "#111" }}>
            {/* Название */}
            <div className={s.infoTitle}>{infoAlbum.name}</div>
            {/* Обложка */}
            {infoAlbum.urlImage && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <img src={infoAlbum.urlImage} alt="cover" className={s.infoCover} />
              </div>
            )}
            {/* Автор */}
            <div className={s.infoRow}>
              <span className={s.infoLabel}>Автор:</span>
              <span>
                {mockUsers.find(u => u.uuid === infoAlbum.authorUUID)?.login || '—'}
              </span>
            </div>
            {/* Треки */}
            <div className={s.infoRow} style={{ alignItems: 'flex-start' }}>
              <span className={s.infoLabel} style={{ marginTop: 2 }}>Треки:</span>
              <div className={s.infoTags}>
                {(infoAlbum.savedSongsUUIDs || []).map(uuid => {
                  const song = mockSongs.find(s => s.uuid === uuid);
                  return song ? (
                    <span key={uuid} className={s.infoTagPill}>{song.name}</span>
                  ) : null;
                })}
                {((infoAlbum.savedSongsUUIDs || []).length === 0) && (
                  <span style={{ color: '#aaa', fontSize: 14 }}>Нет треков</span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyMusicPage;
