'use client'

import { useState, useRef, useEffect } from 'react'
import styles from "./style.module.scss"
import { mockSongSets } from '@/mocks/mockSongSets'
import { mockUsers } from '@/mocks/mockUsers'

const PlaylistPage = () => {
  let tracks: { id: number; title: string; artist: string; duration: string; cover: string; url: string }[] = []
  if (typeof window !== 'undefined' && localStorage.getItem('user') !== 'secondUser') {
    tracks = mockSongSets.set4.map((song: any, idx: number) => ({
      id: idx + 1,
      title: song.name,
      artist: mockUsers.find(u => u.uuid === song.authorUUID)?.login || song.authorUUID,
      duration: '3:45',
      cover: song.urlImage || '',
      url: song.url || ''
    }))
  }

  const [currentTrack, setCurrentTrack] = useState<typeof tracks[0] | undefined>(
    tracks.length > 0 ? tracks[0] : undefined
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const tracksContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [tracksPerColumn, setTracksPerColumn] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const onTimeUpdate = () => setCurrentTime(Math.floor(audio.currentTime));
    const onLoadedMetadata = () => setDuration(Math.floor(audio.duration));
    const onEnded = () => handleNextTrack();

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    const calculateLayout = () => {
      if (tracksContainerRef.current) {
        const containerHeight = tracksContainerRef.current.clientHeight
        const trackHeight = 80
        const calculatedTracks = Math.floor(containerHeight / trackHeight)
        setTracksPerColumn(Math.max(1, calculatedTracks))
      }
    }
    calculateLayout()
    window.addEventListener('resize', calculateLayout)
    return () => window.removeEventListener('resize', calculateLayout)
  }, [filteredTracks])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const percentage = clickPosition / rect.width
    const newTime = Math.floor(percentage * duration)
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
  }

  const handleTrackClick = (track: typeof tracks[0]) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(track)
      setCurrentTime(0)
      setIsPlaying(true)
    }
  }

  const toggleFavorite = (trackId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites(prev => prev.includes(trackId)
      ? prev.filter(id => id !== trackId)
      : [...prev, trackId]
    )
  }

  const scrollTracks = (direction: 'left' | 'right') => {
    if (tracksContainerRef.current) {
      const container = tracksContainerRef.current
      const scrollAmount = container.clientWidth * 0.8
      const newScrollPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
      setScrollPosition(newScrollPosition)
    }
  }

  const handlePrevTrack = () => {
    if (!currentTrack || filteredTracks.length === 0) return
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id)
    if (currentIndex === -1) return
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredTracks.length - 1
    setCurrentTrack(filteredTracks[prevIndex])
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const handleNextTrack = () => {
    if (!currentTrack || filteredTracks.length === 0) return
    const currentIndex = filteredTracks.findIndex(t => t.id === currentTrack.id)
    if (currentIndex === -1) return
    const nextIndex = currentIndex < filteredTracks.length - 1 ? currentIndex + 1 : 0
    setCurrentTrack(filteredTracks[nextIndex])
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const columns = []
  if (tracksPerColumn > 0) {
    for (let i = 0; i < filteredTracks.length; i += tracksPerColumn) {
      columns.push(filteredTracks.slice(i, i + tracksPerColumn))
    }
  }

  return (
    <div className={styles.playlistPage}>
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        preload="metadata"
        style={{ display: 'none' }}
      />
      <div
        className={styles.player}
        style={{
          backgroundImage: currentTrack?.cover
            ? `url("${currentTrack.cover}")`
            : 'none',
          backgroundSize: 'cover',
          backgroundColor: '#7c192a',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.playerOverlay}>
          <div className={styles.playerInfo}>
            {tracks.length === 0 ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  marginTop: '-110px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  letterSpacing: '2px'
                }}
              >
                Треки не найдены!
              </div>
            ) : (
              <>
                <h2 className={styles.trackTitle}>{currentTrack?.title}</h2>
                <p className={styles.trackArtist}>{currentTrack?.artist}</p>
                <div className={styles.progressContainer} ref={progressRef} onClick={handleProgressClick}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                  <div className={styles.timeInfo}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                <div className={styles.playerControls}>
                  <button className={styles.controlButton} onClick={handlePrevTrack}>
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                    </svg>
                  </button>
                  <button
                    className={styles.playButton}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <button className={styles.controlButton} onClick={handleNextTrack}>
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M16 18h2V6h-2v12zm-4-6l-8.5 6V6l8.5 6z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.tracksWrapper}>
        {tracks.length > 0 && (
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        )}
        <button
          className={`${styles.navButton} ${styles.leftButton}`}
          onClick={() => scrollTracks('left')}
          disabled={scrollPosition === 0 || tracks.length === 0}
          style={tracks.length === 0 ? { display: 'none' } : {}}
        >
          &lt;
        </button>
        <div className={styles.tracksContainer} ref={tracksContainerRef}>
          {columns.length > 0 ? (
            columns.map((column, colIndex) => (
              <div key={colIndex} className={styles.tracksColumn}>
                {column.map(track => {
                  const isCurrent = currentTrack && currentTrack.id === track.id
                  const isHovered = hoveredTrack === track.id
                  const isFavorite = favorites.includes(track.id)
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
                        <p
                          className={`${styles.trackArtist} ${isHovered ? styles.artistHover : ''}`}
                          onClick={e => {
                            e.stopPropagation();
                            window.location.href = `/info/${track.artist}`;
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {track.artist}
                        </p>
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
                  )
                })}
              </div>
            ))
          ) : null}
        </div>
        <button
          className={`${styles.navButton} ${styles.rightButton}`}
          onClick={() => scrollTracks('right')}
          disabled={scrollPosition >= (tracksContainerRef.current?.scrollWidth! - tracksContainerRef.current?.clientWidth!) || tracks.length === 0}
          style={tracks.length === 0 ? { display: 'none' } : {}}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default PlaylistPage