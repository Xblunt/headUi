'use client'

import React, { useState, useMemo } from 'react';
import { Song, Album, User, Tag, FileExtension, FileType, SongStatus } from '@/models';

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
  
  // Обработчики для треков
  const handleTrackPlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const handleTrackPause = () => {
    setIsPlaying(false);
  };
  
  const handleArtistClick = (login: string) => {
    console.log(`Navigate to artist: ${login}`);
  };
  
  // Обработчики для альбомов
  const handleAlbumPlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const handleAlbumPause = () => {
    setIsPlaying(false);
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
        <div className={styles.miniPlayer}>
          <div className={styles.playerInfo}>
            <img 
              src={currentSong.urlImage || '/default-cover.jpg'} 
              alt={currentSong.name}
              className={styles.playerCover}
            />
            <div>
              <h4>{currentSong.name}</h4>
              <p>{mockUsers.find(u => u.uuid === currentSong.authorUUID)?.login || 'Unknown Artist'}</p>
            </div>
          </div>
          
          <div className={styles.playerControls}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={styles.playButton}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TracksPage;