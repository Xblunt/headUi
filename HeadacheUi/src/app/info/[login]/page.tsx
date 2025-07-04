'use client';

import React, { useState, useEffect } from 'react';
import { mockAlbums } from '@/mocks/mockAlbums';
import { mockSongs } from '@/mocks/mockSongs';
import { mockUsers } from '@/mocks/mockUsers';
import TrackRow from '@/components/track';
import AlbumCard from '@/components/album';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { author1Albums, author1Songs } from '@/mocks/mockAuthor1AlbumsAndSongs';

interface ArtistPageProps {
  params: {
    login: string;
  };
}

const statisticsByLogin: Record<string, { plays: number; likes: number; followers: number; albums: number }> = {
  author111: { plays: 120, likes: 4, followers: 789, albums: 12 },
  artist2: { plays: 76, likes: 5, followers: 321, albums: 2 },
  artist3: { plays: 45, likes: 4, followers: 210, albums: 3 },
  artist4: { plays: 32, likes: 6, followers: 111, albums: 1 },
  artist5: { plays: 12, likes: 4, followers: 444, albums: 2 },
  artist6: { plays: 54, likes: 3, followers: 333, albums: 1 },
  artist7: { plays: 76, likes: 4, followers: 666, albums: 2 },
  artist8: { plays: 3, likes: 5, followers: 999, albums: 3 },
  artist9: { plays: 43, likes: 6, followers: 357, albums: 2 },
  artist10: { plays: 32, likes: 7, followers: 864, albums: 1 },
};

const getStatistics = (login: string) => {
  return statisticsByLogin[login] || {
    plays: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 2000),
    followers: Math.floor(Math.random() * 1000),
    albums: Math.floor(Math.random() * 5) + 1,
  };
};

export default function ArtistPage({ params }: ArtistPageProps) {
  const pathname = usePathname();
  const login = pathname?.split('/').pop() || '';
  const [showModal, setShowModal] = useState(false);
  const [requestMsg, setRequestMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracks' | 'albums'>('tracks');
  const [randomImg] = useState(() => `/albumImg/${Math.floor(Math.random() * 50) + 1}.jpg`);
  const artist = mockUsers.find(user => user.login === login);
  const artistSongs = mockSongs.filter(song => song.authorUUID === artist?.uuid);
  const artistAlbums = mockAlbums.filter(album => album.authorUUID === artist?.uuid);

  const [showRequestButton, setShowRequestButton] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userValue = localStorage.getItem('user');
      setShowRequestButton(userValue?.includes('label78') ?? false);
    }
  }, []);

  const statistics = getStatistics(login);

  const handleSendRequest = () => {
    setShowSuccess(true);
    setRequestMsg('');
    setTimeout(() => {
      setShowModal(false);
      setShowSuccess(false);
    }, 2000);
  };

  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

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

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  const handleTrackPlay = (song: any) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTrackPause = () => {
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNext = () => {
    if (!artistSongs.length || !currentSong) return;
    const idx = artistSongs.findIndex((s: any) => s.uuid === currentSong.uuid);
    const nextIdx = (idx + 1) % artistSongs.length;
    const nextSong = artistSongs[nextIdx];
    setCurrentSong(nextSong);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!artistSongs.length || !currentSong) return;
    const idx = artistSongs.findIndex((s: any) => s.uuid === currentSong.uuid);
    const prevIdx = (idx - 1 + artistSongs.length) % artistSongs.length;
    const prevSong = artistSongs[prevIdx];
    setCurrentSong(prevSong);
    setIsPlaying(true);
  };

  if (!artist) {
    return (
      <div className="wrapper">
        <div className={styles.notFound}>
          <h1>Artist not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className={styles.artistPage}>
        <div
          className={styles.headerBlock}
          style={{
            background: `url(${randomImg}) center/cover no-repeat`,
          }}
        >
          <div className={styles.headerOverlay} />
          <div className={styles.headerContent}>
            <h1 className={styles.artistName}>{artist.login}</h1>
            <p className={styles.artistRating}>Рейтинг: {artist.avgRating?.toFixed(1)} ⭐</p>
            {showRequestButton && (
              <button
                className={styles.requestButton}
                onClick={() => setShowModal(true)}
              >
                Отправить заявку
              </button>
            )}
          </div>
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setShowModal(false);
                  setShowSuccess(false);
                  setRequestMsg('');
                }}
              >
                ×
              </button>
              {!showSuccess ? (
                <>
                  <h2 className={styles.modalTitle}>
                    Отправить заявку на сотрудничество автору <span style={{ color: '#7c192a' }}>{artist.login}</span>
                  </h2>
                  <textarea
                    className={styles.modalTextarea}
                    rows={4}
                    placeholder="Ваше сообщение"
                    value={requestMsg}
                    onChange={e => setRequestMsg(e.target.value)}
                  />
                  <button
                    className={styles.modalSendButton}
                    onClick={handleSendRequest}
                    disabled={!requestMsg.trim()}
                  >
                    Отправить
                  </button>
                </>
              ) : (
                <div style={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#22c55e', fontSize: '1.2rem', fontWeight: 600 }}>
                    Заявка успешно отправлена!
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.statisticsBlock}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{statistics.plays}</span>
            <span className={styles.statLabel}>Прослушивания (за неделю)</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{statistics.likes}</span>
            <span className={styles.statLabel}>Лайки</span>
          </div>
          {/* <div className={styles.statItem}>
            <span className={styles.statValue}>{statistics.followers}</span>
            <span className={styles.statLabel}>Подписчики</span>
          </div> */}
          <div className={styles.statItem}>
            <span className={styles.statValue}>{author1Albums.length}</span>
            <span className={styles.statLabel}>Альбомы</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{author1Songs.length}</span>
            <span className={styles.statLabel}>Треки</span>
          </div>
        </div>

        <div className={styles.tabsBlock}>
          <div className={styles.tabsHeader}>
            <button
              className={`${styles.tabButton} ${activeTab === 'tracks' ? styles.active : ''}`}
              onClick={() => setActiveTab('tracks')}
            >
              Треки
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'albums' ? styles.active : ''}`}
              onClick={() => setActiveTab('albums')}
            >
              Альбомы
            </button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'tracks' ? (
              <div className={styles.tracksList}>
                {author1Songs.length > 0 ? (
                  author1Songs.map((song, index) => (
                    <TrackRow
                      key={song.uuid}
                      song={song}
                      currentSong={currentSong}
                      isPlaying={isPlaying && currentSong?.uuid === song.uuid}
                      onPlay={handleTrackPlay}
                      onPause={handleTrackPause}
                      onArtistClick={() => {}}
                      index={index}
                      users={mockUsers}
                    />
                  ))
                ) : (
                  <div className={styles.emptyText}>Нет треков</div>
                )}
              </div>
            ) : (
              <div className={styles.albumsList}>
                {artistAlbums.length > 0 ? (
                  artistAlbums.map(album => (
                    <AlbumCard
                      key={album.uuid}
                      album={album}
                      users={mockUsers}
                      songs={mockSongs}
                      onPlay={handleTrackPlay}
                      onPause={handleTrackPause}
                      onArtistClick={() => {}}
                    />
                  ))
                ) : (
                  <div className={styles.emptyText} style={{ textAlign: 'center', width: '100%' }}>Нет альбомов</div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Мини-плеер */}
        {currentSong && (
          <div style={{
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
    </div>
  );
}