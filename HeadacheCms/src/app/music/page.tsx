'use client';

import { useState, useRef } from "react";
import { tabsMusic } from "@/mocks/other.mock";
import { PfTabMenu } from "@/components/ui/tabmenu";
import { Song, SongStatus, Tag } from "@/models";
import { User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import TrackRow from "@/components/track";
import { Pagination } from "@/components/pagination";
import { mockSongs, tags } from '@/mocks/mockSongs';
import { mockUsers } from '@/mocks/mockUsers';
import { TabMenuNoBg } from "../users/TabMenuNoBg";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

type SortOption = {
  label: string;
  value: string;
};

const MusicPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const itemsPerPage = 5;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [editSong, setEditSong] = useState<Song | null>(null);
  const [editSongData, setEditSongData] = useState<Partial<Song>>({});
  const [showModal, setShowModal] = useState<Song | null>(null);

  const sortOptions: SortOption[] = [
    { label: 'По названию (А-Z)', value: 'name-asc' },
    { label: 'По названию (Z-А)', value: 'name-desc' },
    { label: 'По рейтингу (↑)', value: 'rating-asc' },
    { label: 'По рейтингу (↓)', value: 'rating-desc' },
  ];

  const sortSongs = (songs: Song[]) => {
    return [...songs].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-asc':
          return (a.avgRating || 0) - (b.avgRating || 0);
        case 'rating-desc':
          return (b.avgRating || 0) - (a.avgRating || 0);
        default:
          return 0;
      }
    });
  };

  const filteredSongs = sortSongs(
    songs.filter(song => {
      let statusMatch = false;
      switch (activeTab) {
        case 0: statusMatch = song.status === SongStatus.AWAITING; break;
        case 1: statusMatch = song.status === SongStatus.APPROVED; break;
        case 2: statusMatch = song.status === SongStatus.DISAPPROVED; break;
        default: statusMatch = true;
      }
      
      const artistName = mockUsers.find(u => u.uuid === song.authorUUID)?.login || '';
      const searchMatch = searchQuery === '' || 
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        artistName.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && searchMatch;
    })
  );

  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 0);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current && currentSong) {
      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleArtistClick = (login: string) => {
    console.log(`Artist clicked: ${login}`);
  };

  const handleApprove = (songId: string) => {
    setSongs(songs.map(song => 
      song.uuid === songId ? { ...song, status: SongStatus.APPROVED } : song
    ));
  };

  const handleReject = (songId: string) => {
    setSongs(songs.map(song => 
      song.uuid === songId ? { ...song, status: SongStatus.DISAPPROVED } : song
    ));
  };

  const handleUpdate = (updatedSong: Song) => {
    setSongs(songs.map(song => 
      song.uuid === updatedSong.uuid ? updatedSong : song
    ));
  };

  const handleSaveEditSong = () => {
    if (!editSong) return;
    setSongs(songs =>
      songs.map(song =>
        song.uuid === editSong.uuid
          ? { ...song, ...editSongData }
          : song
      )
    );
    setEditSong(null);
    setEditSongData({});
  };

   const handleTabChange = (e: any) => {
    setActiveTab(e.index);
    setCurrentPage(1);
  };


  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        {/* <PfTabMenu 
          list={tabsMusic} 
          activeIndex={activeTab} 
          onTabChange={(e) => {
            setActiveTab(e.index);
            setCurrentPage(1);
          }} 
        /> */}

           <TabMenuNoBg
                          model={tabsMusic}
                          activeIndex={activeTab}
                          onTabChange={handleTabChange}
                        />
        
         <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
              onChange={(e) => setSearchQuery(e.target.value)}
              title="Поиск..."
              placeholder="запрос"
            />
          </div>
          
          <div className={s.sortContainer}>
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={(e) => setSortOption(e.value)}
              placeholder="Сортировка"
              className={s.sortDropdown}
            />
          </div>
        </div>
      </div>

      {/* Глобальный аудиоплеер (скрытый) */}
      <audio
        ref={audioRef}
        src={currentSong?.url}
        style={{ display: "none" }}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        autoPlay={isPlaying}
      />

      <div className={s.trackList}>
        {paginatedSongs.length > 0 ? (
          paginatedSongs.map((song, index) => {
            const isCurrent = currentSong?.uuid === song.uuid;
            return (
              <div
                key={song.uuid}
                className={s.trackRowWrapper}
                style={{
                  position: "relative",
                  borderTop: isCurrent ? "4px solid #7c192a" : undefined,
                  ...(isCurrent
                    ? {
                        "--progress": `${progress}%`,
                        borderTop: "4px solid transparent",
                        background:
                          "linear-gradient(to right, #7c192a var(--progress), transparent var(--progress))",
                        backgroundClip: "padding-box",
                      }
                    : {}),
                }}
              >
                {isCurrent && (
                  <div
                    className={s.progressBar}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: 4,
                      width: `${progress}%`,
                      background: "#7c192a",
                      borderRadius: "8px 8px 0 0",
                      transition: "width 0.2s linear",
                      zIndex: 2,
                    }}
                  />
                )}
                <TrackRow
                  song={song}
                  currentSong={currentSong}
                  isPlaying={isCurrent && isPlaying}
                  onPlay={() => handlePlay(song)}
                  onPause={handlePause}
                  onArtistClick={handleArtistClick}
                  index={index}
                  users={mockUsers}
                  onApprove={activeTab !== 1 ? handleApprove : undefined}
                  onReject={activeTab !== 2 ? handleReject : undefined}
                  onUpdate={() => {
                    setEditSong(song);
                    setEditSongData({ ...song });
                  }}
                  onInfo={() => setShowModal(song)}
                />
              </div>
            );
          })
        ) : (
          <div className={s.emptyState}>
            {searchQuery ? (
              <p>Ничего не найдено по запросу "{searchQuery}"</p>
            ) : (
              <p>Нет треков в этой категории</p>
            )}
          </div>
        )}
      </div>
      <div className={s.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Модальное окно информации о треке */}
      <Dialog
        visible={!!showModal}
        onHide={() => setShowModal(null)}
        header="Информация о треке"
        style={{ minWidth: 750, width: 750 }}
        className={s.trackInfoModal}
      >
        {showModal && (
          <div style={{ display: 'flex', gap: 32 }}>
            <img
              src={showModal.urlImage || 'https://via.placeholder.com/150'}
              alt={showModal.name}
              style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 12 }}>
                <b>Название:&nbsp;</b>{showModal.name}
              </div>
              <div style={{ marginBottom: 12 }}>
                <b>Артист:&nbsp;</b>{mockUsers.find(u => u.uuid === showModal.authorUUID)?.login || 'Неизвестный'}
              </div>
              <div style={{ marginBottom: 12 }}>
                <b>Статус:&nbsp;</b>{
                  showModal.status === SongStatus.AWAITING ? 'Ожидает модерации' :
                  showModal.status === SongStatus.APPROVED ? 'Одобрен' :
                  showModal.status === SongStatus.DISAPPROVED ? 'Отклонён' : '-'
                }
              </div>
              <div style={{ marginBottom: 12 }}>
                <b>Рейтинг:&nbsp;</b>{showModal.avgRating ?? '-'}
              </div>
              <div style={{ marginBottom: 12 }}>
                <b>Дата загрузки:&nbsp;</b>{showModal.createdAt ? new Date(showModal.createdAt).toLocaleDateString() : '-'}
              </div>
              <div style={{ marginBottom: 12 }}>
                <b>Файл:&nbsp;</b>{showModal.fileUUID || '—'}
              </div>
              <div style={{ marginBottom: 12 }}>
                <b>Теги:&nbsp;</b>
                {showModal.tags && showModal.tags.length > 0 ? (
                  <ul style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
                    {showModal.tags.map((tag, idx) => (
                      <li key={typeof tag === "string" ? tag : tag.tagName || idx} style={{
                        display: 'inline-block',
                        background: '#e0e0e0',
                        color: '#444',
                        borderRadius: 999,
                        padding: '2px 12px',
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        userSelect: 'none'
                      }}>
                        {typeof tag === "string" ? tag : tag.tagName}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ color: '#888' }}>Нет</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {/* Модальное окно редактирования трека */}
      <Dialog
        visible={!!editSong}
        onHide={() => { setEditSong(null); setEditSongData({}); }}
        header="Редактировать трек"
        style={{ minWidth: 750, width: 750 }}
        className={s.trackInfoModal}
      >
        {editSong && (
          <div style={{ display: 'flex', gap: 32 }}>
            {/* Картинка убрана, осталась только форма */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Название</label>
                <InputText
                  value={editSongData.name || ''}
                  onChange={e => setEditSongData({ ...editSongData, name: e.target.value })}
                  className={s.formInput}
                  placeholder="Название трека"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Артист</label>
                <InputText
                  value={mockUsers.find(u => u.uuid === editSong.authorUUID)?.login || 'Неизвестный'}
                  readOnly
                  className={s.formInput}
                  placeholder="Автор"
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Аудиофайл</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setEditSongData({
                          ...editSongData,
                          url: URL.createObjectURL(file),
                        });
                        // @ts-ignore
                        setEditSongData(prev => ({ ...prev, _fileName: file.name }));
                      }
                    }}
                  />
                  <span style={{ color: editSongData.url || editSong.url ? '#222' : '#888' }}>
                    {
                      // @ts-ignore
                      editSongData._fileName ||
                      (editSong.url
                        ? (() => {
                            try {
                              return decodeURIComponent(editSong.url.split('/').pop() || '');
                            } catch {
                              return 'Нет файла';
                            }
                          })()
                        : 'Нет файла')
                    }
                  </span>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Обложка</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setEditSongData({ ...editSongData, urlImage: ev.target?.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {(editSongData.urlImage || editSong.urlImage) ? (
                    <img
                      src={editSongData.urlImage || editSong.urlImage}
                      alt="Обложка"
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
                    />
                  ) : (
                    <div style={{ width: 60, height: 60, background: '#eee', borderRadius: 8, border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                      Нет обложки
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Теги</label>
                <MultiSelect
                  value={editSongData.tags || []}
                  options={tags}
                  optionLabel="tagName"
                  onChange={e => setEditSongData({ ...editSongData, tags: e.value })}
                  placeholder="Выберите теги"
                  display="chip"
                  style={{ width: '100%' }}
                  className={s.formInput}
                />
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 24, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => { setEditSong(null); setEditSongData({}); }}
                  className={s.cancelButton}
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveEditSong}
                  className={s.saveButton}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default MusicPage;