'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { Song, Album, User, Tag, FileExtension, FileType, SongStatus } from '@/models';
import { useRouter } from 'next/navigation';

import styles from './style.module.scss';
import AlbumCard from '@/components/album';
import TrackRow from '@/components/track';
import { mockSongs } from '@/mocks/mockSongs';
import { mockAlbums } from '@/mocks/mockAlbums';
import { mockUsers } from '@/mocks/mockUsers';

// Собираем все уникальные теги из моков треков
const allTags: Tag[] = Array.from(
  mockSongs.reduce((acc, song) => {
    song.tags.forEach(tag => acc.set(tag.uuid, tag));
    return acc;
  }, new Map<string, Tag>())
).map(([_, tag]) => tag);

// Используем только одобренные треки
const approvedSongs: Song[] = mockSongs.filter(song => song.status === SongStatus.APPROVED);

const TracksPage = () => {
  // Состояния для активной вкладки
  const [activeTab, setActiveTab] = useState<'tracks' | 'albums'>('tracks');
  
  // Состояния для фильтрации и сортировки треков
  const [trackSearchQuery, setTrackSearchQuery] = useState('');
  const [selectedTrackTags, setSelectedTrackTags] = useState<string[]>([]);
  const [trackSortOption, setTrackSortOption] = useState<'rating' | 'title' | 'artist'>('rating');
  const [trackSortDirection, setTrackSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Состояния для фильтрации и сортировки альбомов
  const [albumSearchQuery, setAlbumSearchQuery] = useState('');
  const [selectedAlbumTags, setSelectedAlbumTags] = useState<string[]>([]);
  const [albumSortOption, setAlbumSortOption] = useState<'rating' | 'title' | 'artist'>('rating');
  const [albumSortDirection, setAlbumSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Состояния плеера
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const router = useRouter();
  
  // Получаем все уникальные теги для треков
  const allTrackTags = useMemo(() => {
    return Array.from(new Set(approvedSongs.flatMap(song => song.tags.map(tag => tag.tagName))));
  }, []);
  
  // Получаем все уникальные теги для альбомов (из треков)
  const allAlbumTags = useMemo(() => {
    return Array.from(new Set(mockAlbums.flatMap(album => {
      const albumSongs = approvedSongs.filter(song => album.savedSongsUUIDs.includes(song.uuid));
      return albumSongs.flatMap(song => song.tags.map(tag => tag.tagName));
    })));
  }, []);
  
  // Функция для вычисления рейтинга альбома
  const getAlbumRating = (album: Album) => {
    const albumSongs = approvedSongs.filter(song => album.savedSongsUUIDs.includes(song.uuid));
    if (albumSongs.length === 0) return 0;
    
    const totalRating = albumSongs.reduce((sum, song) => sum + song.avgRating, 0);
    return totalRating / albumSongs.length;
  };
  
  // Фильтрация и сортировка треков
  const filteredTracks = useMemo(() => {
    return approvedSongs
      .filter(song => {
        // Фильтр по поиску
        const matchesSearch = 
          song.name.toLowerCase().includes(trackSearchQuery.toLowerCase()) || 
          mockUsers.find(u => u.uuid === song.authorUUID)?.login.toLowerCase().includes(trackSearchQuery.toLowerCase());
        
        // Фильтр по тегам
        const matchesTags = selectedTrackTags.length === 0 || 
          selectedTrackTags.some(tagName => song.tags.some(tag => tag.tagName === tagName));
        
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        // Сортировка
        let comparison = 0;
        
        switch (trackSortOption) {
          case 'rating':
            comparison = a.avgRating - b.avgRating;
            break;
          case 'title':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'artist':
            const artistA = mockUsers.find(u => u.uuid === a.authorUUID)?.login || '';
            const artistB = mockUsers.find(u => u.uuid === b.authorUUID)?.login || '';
            comparison = artistA.localeCompare(artistB);
            break;
        }
        
        return trackSortDirection === 'desc' ? -comparison : comparison;
      });
  }, [trackSearchQuery, selectedTrackTags, trackSortOption, trackSortDirection]);
  
  // Фильтрация и сортировка альбомов
  const filteredAlbums = useMemo(() => {
    return mockAlbums
      .filter(album => {
        // Фильтр по поиску
        const matchesSearch = 
          album.name.toLowerCase().includes(albumSearchQuery.toLowerCase()) || 
          mockUsers.find(u => u.uuid === album.authorUUID)?.login.toLowerCase().includes(albumSearchQuery.toLowerCase());
        
        // Фильтр по тегам
        const matchesTags = selectedAlbumTags.length === 0;
        if (!matchesTags) {
          const albumSongs = approvedSongs.filter(song => album.savedSongsUUIDs.includes(song.uuid));
          return albumSongs.some(song => 
            selectedAlbumTags.some(tagName => 
              song.tags.some(tag => tag.tagName === tagName)
            )
          );
        }
        
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        // Сортировка
        let comparison = 0;
        
        switch (albumSortOption) {
          case 'rating':
            comparison = getAlbumRating(a) - getAlbumRating(b);
            break;
          case 'title':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'artist':
            const artistA = mockUsers.find(u => u.uuid === a.authorUUID)?.login || '';
            const artistB = mockUsers.find(u => u.uuid === b.authorUUID)?.login || '';
            comparison = artistA.localeCompare(artistB);
            break;
        }
        
        return albumSortDirection === 'desc' ? -comparison : comparison;
      });
  }, [albumSearchQuery, selectedAlbumTags, albumSortOption, albumSortDirection]);
  
  // --- Синхронизация с глобальным плеером (localStorage) ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const uuid = localStorage.getItem('currentTrackUuid');
    if (uuid) {
      const found = mockSongs.find(s => s.uuid === uuid);
      if (found) {
        setCurrentSong(found);
        setIsPlaying(true);
      }
    }
    // eslint-disable-next-line
  }, []);

  // --- Audio logic ---
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  useEffect(() => {
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
        handleNext();
      };

      newAudio.addEventListener('timeupdate', updateProgress);
      newAudio.addEventListener('ended', handleEnded);

      if (isPlaying) newAudio.play();

      // ВАЖНО: возвращаем функцию очистки, чтобы гарантировать,
      // что предыдущий audio всегда полностью уничтожается
      return () => {
        newAudio.pause();
        newAudio.removeEventListener('timeupdate', updateProgress);
        newAudio.removeEventListener('ended', handleEnded);
        newAudio.src = '';
      };
    }
    // eslint-disable-next-line
  }, [currentSong]);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  // --- Кнопки следующий/предыдущий трек ---
  const handleNext = () => {
    if (!filteredTracks.length || !currentSong) return;
    const idx = filteredTracks.findIndex(s => s.uuid === currentSong.uuid);
    const nextIdx = (idx + 1) % filteredTracks.length;
    const nextSong = filteredTracks[nextIdx];
    setCurrentSong(nextSong);
    setIsPlaying(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentTrackUuid', nextSong.uuid);
    }
  };

  const handlePrev = () => {
    if (!filteredTracks.length || !currentSong) return;
    const idx = filteredTracks.findIndex(s => s.uuid === currentSong.uuid);
    const prevIdx = (idx - 1 + filteredTracks.length) % filteredTracks.length;
    const prevSong = filteredTracks[prevIdx];
    setCurrentSong(prevSong);
    setIsPlaying(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentTrackUuid', prevSong.uuid);
    }
  };

  const handleArtistClick = (login: string) => {
    router.push(`/info/${login}`);
  };
  
  // Обработчики для альбомов
  const handleAlbumPlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentTrackUuid', song.uuid);
    }
  };
  
  const handleAlbumPause = () => {
    setIsPlaying(false);
  };
  
  // --- При смене трека записываем uuid в localStorage ---
  const handleTrackPlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentTrackUuid', song.uuid);
    }
  };

  const handleTrackPause = () => {
    setIsPlaying(false);
  };

  // Мини-плеер
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={'wrapper'}>
      {/* Переключение вкладок */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'tracks' ? styles.active : ''}`}
          onClick={() => setActiveTab('tracks')}
        >
          Треки
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'albums' ? styles.active : ''}`}
          onClick={() => setActiveTab('albums')}
        >
          Альбомы
        </button>
      </div>
      
      {/* Контент вкладки "Треки" */}
      {activeTab === 'tracks' && (
        <div className={styles.tabContent}>
          {/* Поиск и фильтры для треков */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Поиск треков или исполнителей..."
              value={trackSearchQuery}
              onChange={(e) => setTrackSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filters}>
            {/* Фильтр по тегам */}
            <div className={styles.tagFilter}>
              {/* <h4>Теги:</h4> */}
              <div className={styles.tagsList}>
                {allTrackTags.map(tag => (
                  <button
                    key={tag}
                    className={`${styles.tag} ${selectedTrackTags.includes(tag) ? styles.selected : ''}`}
                    onClick={() => setSelectedTrackTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag) 
                        : [...prev, tag]
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Сортировка треков */}
            <div className={styles.sortControls}>
              <select
                value={trackSortOption}
                onChange={(e) => setTrackSortOption(e.target.value as any)}
                className={styles.sortSelect}
              >
                <option value="rating">По рейтингу</option>
                <option value="title">По названию</option>
                <option value="artist">По исполнителю</option>
              </select>
              
              <button
                onClick={() => setTrackSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className={styles.sortDirectionButton}
              >
                {trackSortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
          
          {/* Список треков */}
          <div className={styles.tracksList}>
            {filteredTracks.length > 0 ? (
              filteredTracks.map((song, index) => (
                <TrackRow
                  key={song.uuid}
                  song={song}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlay={handleTrackPlay}
                  onPause={handleTrackPause}
                  onArtistClick={handleArtistClick}
                  index={index}
                  users={mockUsers}
                />
              ))
            ) : (
              <div className={styles.noResults}>Треки не найдены</div>
            )}
          </div>
        </div>
      )}
      
      {/* Контент вкладки "Альбомы" */}
      {activeTab === 'albums' && (
        <div className={styles.tabContent}>
          {/* Поиск и фильтры для альбомов */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Поиск альбомов или исполнителей..."
              value={albumSearchQuery}
              onChange={(e) => setAlbumSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filters}>
            {/* Фильтр по тегам */}
            <div className={styles.tagFilter}>
              {/* <h4>Теги:</h4> */}
              <div className={styles.tagsList}>
                {allAlbumTags.map(tag => (
                  <button
                    key={tag}
                    className={`${styles.tag} ${selectedAlbumTags.includes(tag) ? styles.selected : ''}`}
                    onClick={() => setSelectedAlbumTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag) 
                        : [...prev, tag]
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Сортировка альбомов */}
            <div className={styles.sortControls}>
              <select
                value={albumSortOption}
                onChange={(e) => setAlbumSortOption(e.target.value as any)}
                className={styles.sortSelect}
              >
                <option value="rating">По рейтингу</option>
                <option value="title">По названию</option>
                <option value="artist">По исполнителю</option>
              </select>
              
              <button
                onClick={() => setAlbumSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                className={styles.sortDirectionButton}
              >
                {albumSortDirection === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
          
          {/* Список альбомов */}
          <div className={styles.albumsGrid}>
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map(album => (
                <AlbumCard
                  key={album.uuid}
                  album={album}
                  users={mockUsers}
                  songs={mockSongs}
                  onPlay={handleAlbumPlay}
                  onPause={handleAlbumPause}
                  onArtistClick={handleArtistClick}
                />
              ))
            ) : (
              <div className={styles.noResults}>Альбомы не найдены</div>
            )}
          </div>
        </div>
      )}
      
      {/* Мини-плеер */}
      {currentSong && (
        <div className={styles.miniPlayer} style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'auto',
          background: 'rgba(51,51,51,0.97)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          padding: '0 0 8px 0',
        }}>
          <div style={{
            width: '100%',
            maxWidth: 900,
            borderRadius: 8,
            background: 'rgba(51,51,51,0.97)',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            minHeight: 72,
            padding: '12px 24px',
          }}>
            <img
              src={currentSong.urlImage || '/default-cover.jpg'}
              alt={currentSong.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: 6,
                objectFit: 'cover',
                background: '#222',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentSong.name}
              </div>
              <div style={{ color: '#bbb', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {mockUsers.find(u => u.uuid === currentSong.authorUUID)?.login || 'Unknown Artist'}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: 24,
                  cursor: 'pointer',
                  borderRadius: 4,
                  padding: 4,
                }}
                onClick={handlePrev}
                aria-label="Prev"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/>
                </svg>
              </button>
              <button
                style={{
                  background: '#7c192a',
                  border: 'none',
                  color: '#fff',
                  fontSize: 28,
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 8px',
                }}
                onClick={() => setIsPlaying((prev) => !prev)}
                aria-label="Play/Pause"
              >
                {isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="5" width="4" height="14" fill="#fff"/>
                    <rect x="14" y="5" width="4" height="14" fill="#fff"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <polygon points="8,5 8,19 19,12" fill="#fff"/>
                  </svg>
                )}
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: 24,
                  cursor: 'pointer',
                  borderRadius: 4,
                  padding: 4,
                }}
                onClick={handleNext}
                aria-label="Next"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M16 18h2V6h-2v12zm-4-6l-8.5 6V6l8.5 6z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 2, minWidth: 0 }}>
              <span style={{ color: '#bbb', fontSize: 15, minWidth: 48, textAlign: 'right' }}>
                {formatTime(progress)}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  background: 'rgba(255,255,255,0.18)',
                  borderRadius: 4,
                  cursor: 'pointer',
                  position: 'relative',
                  minWidth: 80,
                  maxWidth: 420,
                }}
                onClick={e => {
                  if (!audio || !duration) return;
                  const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percent = clickX / rect.width;
                  const newTime = percent * duration;
                  audio.currentTime = newTime;
                  setProgress(newTime);
                }}
              >
                <div
                  style={{
                    width: duration ? `${(progress / duration) * 100}%` : '0%',
                    height: '100%',
                    background: '#7c192a',
                    borderRadius: 4,
                    transition: 'width 0.1s linear',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                  }}
                />
              </div>
              <span style={{ color: '#bbb', fontSize: 15, minWidth: 48, textAlign: 'left' }}>
                {formatTime(duration)}
              </span>
            </div>
            <div style={{ minWidth: 110, marginLeft: 24 }}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                style={{
                  width: 110,
                  accentColor: '#7c192a',
                  verticalAlign: 'middle',
                }}
                title="Громкость"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TracksPage;