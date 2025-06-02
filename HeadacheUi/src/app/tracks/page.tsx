'use client'

import React, { useState, useMemo } from 'react';
import { Song, Album, User } from '@/models';

import styles from './style.module.scss';
import TrackRow from '@/components/track';
import AlbumCard from '@/components/album';

interface TracksPageProps {
  songs: Song[];
  albums: Album[];
  users: User[];
}

const TracksPage: React.FC<TracksPageProps> = ({ songs, albums, users }) => {
  // Состояния для активной вкладки
  const [activeTab, setActiveTab] = useState<'tracks' | 'albums'>('tracks');
  
  // Состояния для фильтрации и сортировки треков
  const [trackSearchQuery, setTrackSearchQuery] = useState('');
  const [selectedTrackTags, setSelectedTrackTags] = useState<string[]>([]);
  const [trackSortOption, setTrackSortOption] = useState<'rating' | 'title' | 'artist' | 'duration'>('rating');
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
    const tags = new Set<string>();
    songs.forEach(song => {
      song.tags?.forEach(tag => tags.add(typeof tag === 'string' ? tag : String(tag)));
    });
    return Array.from(tags);
  }, [songs]);
  
  // Получаем все уникальные теги для альбомов (из треков)
  const allAlbumTags = useMemo(() => {
    const tags = new Set<string>();
    albums.forEach(album => {
      const albumSongs = songs.filter(song => album.savedSongsUUIDs.includes(song.uuid));
      albumSongs.forEach(song => {
        song.tags?.forEach(tag => tags.add(typeof tag === 'string' ? tag : String(tag)));
      });
    });
    return Array.from(tags);
  }, [albums, songs]);
  
  // Функция для вычисления рейтинга альбома
  const getAlbumRating = (album: Album) => {
    const albumSongs = songs.filter(song => album.savedSongsUUIDs.includes(song.uuid));
    if (albumSongs.length === 0) return 0;
    
    // If Song does not have a 'rating' property, use 0 as default or replace with actual property if available
    const totalRating = albumSongs.reduce((sum, song) => sum + (typeof (song as any).rating === 'number' ? (song as any).rating : 0), 0);
    return totalRating / albumSongs.length;
  };
  
  // Фильтрация и сортировка треков
  const filteredTracks = useMemo(() => {
    return songs
      .filter(song => {
        // Фильтр по поиску
        const matchesSearch = 
          song.name.toLowerCase().includes(trackSearchQuery.toLowerCase()) || 
          users.find(u => u.uuid === song.authorUUID)?.login.toLowerCase().includes(trackSearchQuery.toLowerCase());
        
        // Фильтр по тегам
        const matchesTags = selectedTrackTags.length === 0 || 
          selectedTrackTags.some(tag => song.tags?.includes(tag as any));
        
        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        // Сортировка
        let comparison = 0;
        
        switch (trackSortOption) {
          case 'rating':
            // If Song does not have a 'rating' property, fallback to 0 or use another property
            comparison = (typeof (a as any).rating === 'number' ? (a as any).rating : 0) - (typeof (b as any).rating === 'number' ? (b as any).rating : 0);
            break;
          case 'title':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'artist':
            const artistA = users.find(u => u.uuid === a.authorUUID)?.login || '';
            const artistB = users.find(u => u.uuid === b.authorUUID)?.login || '';
            comparison = artistA.localeCompare(artistB);
            break;
          case 'duration':
            // comparison = (a.duration || 0) - (b.duration || 0);
            // Replace 'duration' with the correct property name if it exists, e.g. 'length' or 'time':
            // comparison = (a.length || 0) - (b.length || 0);
            // Or, if no such property exists, remove the 'duration' case:
            comparison = 0; // No duration property on Song
            break;
        }
        
        return trackSortDirection === 'desc' ? -comparison : comparison;
      });
  }, [songs, users, trackSearchQuery, selectedTrackTags, trackSortOption, trackSortDirection]);
  
  // Фильтрация и сортировка альбомов
  const filteredAlbums = useMemo(() => {
    return albums
      .filter(album => {
        // Фильтр по поиску
        const matchesSearch = 
          album.name.toLowerCase().includes(albumSearchQuery.toLowerCase()) || 
          users.find(u => u.uuid === album.authorUUID)?.login.toLowerCase().includes(albumSearchQuery.toLowerCase());
        
        // Фильтр по тегам
        const matchesTags = selectedAlbumTags.length === 0;
        if (!matchesTags) {
          const albumSongs = songs.filter(song => album.savedSongsUUIDs.includes(song.uuid));
          return albumSongs.some(song => selectedAlbumTags.some(tag => song.tags?.includes(tag as any)));
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
            const artistA = users.find(u => u.uuid === a.authorUUID)?.login || '';
            const artistB = users.find(u => u.uuid === b.authorUUID)?.login || '';
            comparison = artistA.localeCompare(artistB);
            break;
        }
        
        return albumSortDirection === 'desc' ? -comparison : comparison;
      });
  }, [albums, songs, users, albumSearchQuery, selectedAlbumTags, albumSortOption, albumSortDirection]);
  
  // Обработчики для треков
  const handleTrackPlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const handleTrackPause = () => {
    setIsPlaying(false);
  };
  
  const handleArtistClick = (login: string) => {
    // Навигация к странице артиста
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
    <div className={styles.pageContainer}>
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
              <h4>Теги:</h4>
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
                <option value="duration">По длительности</option>
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
                  users={users}
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
              <h4>Теги:</h4>
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
                  users={users}
                  songs={songs}
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
              src="https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg" 
              alt={currentSong.name}
              className={styles.playerCover}
            />
            <div>
              <h4>{currentSong.name}</h4>
              <p>{users.find(u => u.uuid === currentSong.authorUUID)?.login || 'Unknown Artist'}</p>
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