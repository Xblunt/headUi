'use client'

import { useState, useRef, useEffect } from 'react'
import styles from "./style.module.scss";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

const PlaylistPage = () => {
  const tracks: Track[] = [
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", cover: "/covers/queen.jpg" },
    { id: 2, title: "Sweet Child O'Mine", artist: "Guns N' Roses", duration: "5:56", cover: "/covers/guns.jpg" },
    { id: 3, title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01", cover: "/covers/nirvana.jpg" },
    { id: 4, title: "Hotel California", artist: "Eagles", duration: "6:30", cover: "/covers/eagles.jpg" },
    { id: 5, title: "Imagine", artist: "John Lennon", duration: "3:04", cover: "/covers/lennon.jpg" },
    { id: 6, title: "Billie Jean", artist: "Michael Jackson", duration: "4:54", cover: "/covers/mj.jpg" },
    { id: 7, title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02", cover: "/covers/zeppelin.jpg" },
    { id: 8, title: "Like a Rolling Stone", artist: "Bob Dylan", duration: "6:13", cover: "/covers/dylan.jpg" },
    { id: 9, title: "Yesterday", artist: "The Beatles", duration: "2:05", cover: "/covers/beatles.jpg" },
    { id: 10, title: "Purple Haze", artist: "Jimi Hendrix", duration: "2:50", cover: "/covers/hendrix.jpg" },
   { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", cover: "/covers/queen.jpg" },
    { id: 2, title: "Sweet Child O'Mine", artist: "Guns N' Roses", duration: "5:56", cover: "/covers/guns.jpg" },
    { id: 3, title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01", cover: "/covers/nirvana.jpg" },
    { id: 4, title: "Hotel California", artist: "Eagles", duration: "6:30", cover: "/covers/eagles.jpg" },
    { id: 5, title: "Imagine", artist: "John Lennon", duration: "3:04", cover: "/covers/lennon.jpg" },
    { id: 6, title: "Billie Jean", artist: "Michael Jackson", duration: "4:54", cover: "/covers/mj.jpg" },
    { id: 7, title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02", cover: "/covers/zeppelin.jpg" },
    { id: 8, title: "Like a Rolling Stone", artist: "Bob Dylan", duration: "6:13", cover: "/covers/dylan.jpg" },
    { id: 9, title: "Yesterday", artist: "The Beatles", duration: "2:05", cover: "/covers/beatles.jpg" },
    { id: 10, title: "Purple Haze", artist: "Jimi Hendrix", duration: "2:50", cover: "/covers/hendrix.jpg" },
     { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", cover: "/covers/queen.jpg" },
    { id: 2, title: "Sweet Child O'Mine", artist: "Guns N' Roses", duration: "5:56", cover: "/covers/guns.jpg" },
    { id: 3, title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01", cover: "/covers/nirvana.jpg" },
    { id: 4, title: "Hotel California", artist: "Eagles", duration: "6:30", cover: "/covers/eagles.jpg" },
    { id: 5, title: "Imagine", artist: "John Lennon", duration: "3:04", cover: "/covers/lennon.jpg" },
    { id: 6, title: "Billie Jean", artist: "Michael Jackson", duration: "4:54", cover: "/covers/mj.jpg" },
    { id: 7, title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02", cover: "/covers/zeppelin.jpg" },
    { id: 8, title: "Like a Rolling Stone", artist: "Bob Dylan", duration: "6:13", cover: "/covers/dylan.jpg" },
    { id: 9, title: "Yesterday", artist: "The Beatles", duration: "2:05", cover: "/covers/beatles.jpg" },
    { id: 10, title: "Purple Haze", artist: "Jimi Hendrix", duration: "2:50", cover: "/covers/hendrix.jpg" },
     { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55", cover: "/covers/queen.jpg" },
    { id: 2, title: "Sweet Child O'Mine", artist: "Guns N' Roses", duration: "5:56", cover: "/covers/guns.jpg" },
    { id: 3, title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01", cover: "/covers/nirvana.jpg" },
    { id: 4, title: "Hotel California", artist: "Eagles", duration: "6:30", cover: "/covers/eagles.jpg" },
    { id: 5, title: "Imagine", artist: "John Lennon", duration: "3:04", cover: "/covers/lennon.jpg" },
    { id: 6, title: "Billie Jean", artist: "Michael Jackson", duration: "4:54", cover: "/covers/mj.jpg" },
    { id: 7, title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02", cover: "/covers/zeppelin.jpg" },
    { id: 8, title: "Like a Rolling Stone", artist: "Bob Dylan", duration: "6:13", cover: "/covers/dylan.jpg" },
    { id: 9, title: "Yesterday", artist: "The Beatles", duration: "2:05", cover: "/covers/beatles.jpg" },
    { id: 10, title: "Purple Haze", artist: "Jimi Hendrix", duration: "2:50", cover: "/covers/hendrix.jpg" },
  ];

  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const tracksContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [tracksPerColumn, setTracksPerColumn] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация треков по поисковому запросу
  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Эмуляция прогресса трека
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      setDuration(convertToSeconds(currentTrack.duration));
      
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= convertToSeconds(currentTrack.duration)) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Рассчитываем количество треков в колонке
  useEffect(() => {
    const calculateLayout = () => {
      if (tracksContainerRef.current) {
        const containerHeight = tracksContainerRef.current.clientHeight;
        const trackHeight = 80; // Высота одного трека
        const calculatedTracks = Math.floor(containerHeight / trackHeight);
        setTracksPerColumn(Math.max(1, calculatedTracks));
      }
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [filteredTracks]);

  const convertToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const percentage = clickPosition / rect.width;
      const newTime = Math.floor(percentage * duration);
      setCurrentTime(newTime);
    }
  };

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    if (currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  const toggleFavorite = (trackId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(trackId) 
      ? prev.filter(id => id !== trackId) 
      : [...prev, trackId]
    );
  };

  const scrollTracks = (direction: 'left' | 'right') => {
    if (tracksContainerRef.current) {
      const container = tracksContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const handlePrevTrack = () => {
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredTracks.length - 1;
    setCurrentTrack(filteredTracks[prevIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = currentIndex < filteredTracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(filteredTracks[nextIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Разбиваем треки на колонки
  const columns = [];
  if (tracksPerColumn > 0) {
    for (let i = 0; i < filteredTracks.length; i += tracksPerColumn) {
      columns.push(filteredTracks.slice(i, i + tracksPerColumn));
    }
  }

  return (
    <div className={styles.playlistPage}>
      {/* Плеер (1/4 экрана) */}
      <div 
        className={styles.player} 
        style={{
          backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.playerOverlay}>
          <div className={styles.playerInfo}>
            <h2 className={styles.trackTitle}>{currentTrack.title}</h2>
            <p className={styles.trackArtist}>{currentTrack.artist}</p>
            
            {/* Прогресс-бар */}
            <div className={styles.progressContainer} ref={progressRef} onClick={handleProgressClick}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
              <div className={styles.timeInfo}>
                <span>{formatTime(currentTime)}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            <div className={styles.playerControls}>
              <button className={styles.controlButton} onClick={handlePrevTrack}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              <button 
                className={styles.playButton}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              <button className={styles.controlButton} onClick={handleNextTrack}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M16 18h2V6h-2v12zm-4-6l-8.5 6V6l8.5 6z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Список треков (3/4 экрана) */}
      <div className={styles.tracksWrapper}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <button 
          className={`${styles.navButton} ${styles.leftButton}`} 
          onClick={() => scrollTracks('left')}
          disabled={scrollPosition === 0}
        >
          &lt;
        </button>

        <div className={styles.tracksContainer} ref={tracksContainerRef}>
          {columns.length > 0 ? (
            columns.map((column, colIndex) => (
              <div key={colIndex} className={styles.tracksColumn}>
                {column.map(track => {
                  const isCurrent = currentTrack.id === track.id;
                  const isHovered = hoveredTrack === track.id;
                  const isFavorite = favorites.includes(track.id);
                  
                  return (
                    <div 
                      key={track.id}
                      className={`${styles.track} ${isCurrent ? styles.active : ''}`}
                      onClick={() => handleTrackClick(track)}
                      onMouseEnter={() => setHoveredTrack(track.id)}
                      onMouseLeave={() => setHoveredTrack(null)}
                    >
                      <div className={styles.trackImage} style={{
                        backgroundImage: 'url("https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                        <img 
                          src={track.cover} 
                          alt={track.title}
                          className={`${styles.trackThumbnail} ${
                            (isHovered || (isCurrent && isPlaying)) ? styles.imageActive : ''
                          }`}
                        />
                        {(isHovered || (isCurrent && isPlaying)) && (
                          <div className={styles.playPauseOverlay}>
                            {isCurrent && isPlaying ? (
                              <span className={styles.pauseIcon}>❚❚</span>
                            ) : (
                              <span className={styles.playIcon}>▶</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className={styles.trackInfo}>
                        <h4 className={styles.trackTitle}>{track.title}</h4>
                        <p className={styles.trackArtist}>{track.artist}</p>
                      </div>

                      <div className={styles.trackActions}>
                        {isHovered && (
                          <button 
                            className={`${styles.favoriteButton} ${!isFavorite ? styles.favorited : ''}`}
                            onClick={(e) => toggleFavorite(track.id, e)}
                          >
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <path 
                                fill="currentColor" 
                                d={!isFavorite 
                                  ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                  : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                              }
                            />
                            </svg>
                          </button>
                        )}
                        <span className={styles.trackDuration}>{track.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              Треки не найдены!
            </div>
          )}
        </div>

        <button 
          className={`${styles.navButton} ${styles.rightButton}`} 
          onClick={() => scrollTracks('right')}
          disabled={scrollPosition >= (tracksContainerRef.current?.scrollWidth! - tracksContainerRef.current?.clientWidth!)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PlaylistPage;