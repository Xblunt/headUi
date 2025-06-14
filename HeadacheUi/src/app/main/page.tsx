'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import s from './style.module.scss';
import { useRouter } from 'next/navigation';
import { Album, Song, User } from '@/models';
import AlbumCard from '@/components/album';
import TrackRow from '@/components/track';
import { mockPromotions } from '@/mocks/mockPromotions';
import { mockSongs } from '@/mocks/mockSongs';
import { mockUsers } from '@/mocks/mockUsers';
import { mockSongSets } from '@/mocks/mockSongSets';
import { mockAlbumSets } from '@/mocks/mockAlbumSets';

export default function MainPage() {
  const router = useRouter();

  // --- Глобальный плеер ---
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // --- Данные ---
  let tracksSet = mockSongSets.set5;
  let albumsSet = mockAlbumSets.albumSet2;
  if (typeof window !== 'undefined' && localStorage.getItem('user') === 'secondUser') {
    tracksSet = mockSongSets.set6;
    albumsSet = mockAlbumSets.albumSet1;
  }
  const promotions = mockPromotions.filter((promo: any) => promo.status === 'PROMOTED');

  // --- Глобальный плеер: эффекты ---
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  // Сохраняем ref на текущий Audio, чтобы гарантировать что только один трек играет
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Остановить и удалить предыдущий audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setProgress(0);
    setDuration(0);

    if (currentIndex >= 0 && playlist[currentIndex]) {
      const newAudio = new Audio(playlist[currentIndex].url);
      audioRef.current = newAudio;
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

      return () => {
        newAudio.pause();
        newAudio.removeEventListener('timeupdate', updateProgress);
        newAudio.removeEventListener('ended', handleEnded);
      };
    }
    // eslint-disable-next-line
  }, [currentIndex, playlist]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // --- Глобальный плеер: управление ---
  const handlePlaySong = (song: Song, list?: Song[], idx?: number) => {
    let playList = list || tracksSet;
    let index = typeof idx === 'number' ? idx : playList.findIndex(s => s.uuid === song.uuid);
    setPlaylist(playList);
    setCurrentIndex(index);
    setIsPlaying(true);
    // Сохраняем uuid текущего трека в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentTrackUuid', song.uuid);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (newProgress: number) => {
    if (audioRef.current && duration) {
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const getArtistName = (authorUUID: string) => {
    return mockUsers.find((user: any) => user.uuid === authorUUID)?.login || 'Unknown Artist';
  };

  const handleArtistClick = (login: string) => {
    router.push(`/info/${login}`);
  };

  // --- UI ---
  const currentSong = playlist[currentIndex] || null;

  return (
    <div className={"wrapper"}>
      <Header />
      <div className={s.musicApp}>
        <section className={s.swiperSection}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            className={s.swiper}
            slidesPerView={1.2}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}" style="background-color: #000; width: 40px; height: 4px; border-radius: 10px; margin: 0 5px;"></span>`;
              }
            }}
            centeredSlides
            loop
          >
            <SwiperSlide className={s.swiperSlide}>
              <div className={s.newReleasesSlide}>
                <h2>НОВИНКИ</h2>
              </div>
            </SwiperSlide>
            {promotions.map((promo) => {
              const song = mockSongs.find((s: any) => s.uuid === promo.songUUID);
              if (!song) return null;
              const isCurrent = currentSong?.uuid === song.uuid;
              const playing = isCurrent && isPlaying;
              return (
                <SwiperSlide key={promo.uuid} className={s.swiperSlide}>
                  <div
                    className={s.promotionSlide}
                    style={{
                      backgroundImage: `url(${promo.urlImg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className={s.promotionOverlay}>
                      <div className={s.promotionContent}>
                        <h3>{song.name}</h3>
                        <p
                          className={s.artist}
                          onClick={() => handleArtistClick(getArtistName(song.authorUUID))}
                        >
                          {getArtistName(song.authorUUID)}
                        </p>
                        {promo.msg && <p className={s.promotionMsg}>{promo.msg}</p>}
                        <button
                          className={s.playButton}
                          onClick={e => {
                            e.stopPropagation();
                            if (playing) {
                              setIsPlaying(false); // Остановить трек если уже играет
                            } else {
                              handlePlaySong(
                                song,
                                mockSongs,
                                mockSongs.findIndex((s: any) => s.uuid === song.uuid)
                              );
                            }
                          }}
                        >
                          {playing ? (
                            <>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
                                <rect x="6" y="5" width="4" height="14" fill="#fff"/>
                                <rect x="14" y="5" width="4" height="14" fill="#fff"/>
                              </svg>
                              <span style={{ marginLeft: 3, color: "#fff", fontWeight: 200, fontSize: 14, verticalAlign: 'middle' }}>Pause</span>
                            </>
                          ) : (
                            <>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle' }}>
                                <polygon points="8,5 8,19 19,12" fill="#fff"/>
                              </svg>
                              <span style={{ marginLeft: 3, color: "#fff", fontWeight: 200, fontSize: 14, verticalAlign: 'middle' }}>Play</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Рекомендованные треки</h2>
          <div className={s.songsGrid}>
            {tracksSet.slice(0, 5).map((song: Song) => {
              const isCurrent = currentSong?.uuid === song.uuid;
              const playing = isCurrent && isPlaying;
              return (
                <div
                  key={song.uuid}
                  className={s.songCard}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${song.urlImage || 'https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg'}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onClick={() =>
                    handlePlaySong(song, tracksSet, tracksSet.findIndex(s => s.uuid === song.uuid))
                  }
                >
                  <div className={s.songInfo}>
                    <p
                      className={s.artist}
                      onClick={e => {
                        e.stopPropagation();
                        handleArtistClick(getArtistName(song.authorUUID));
                      }}
                    >
                      {getArtistName(song.authorUUID)}
                    </p>
                    <h3 className={s.songTitle}>{song.name}</h3>
                    <div className={s.tags}>
                      {song.tags.map(tag => (
                        <span key={tag.uuid} className={s.tag}>
                          {tag.tagName}
                        </span>
                      ))}
                    </div>
                    <button
                      className={s.playButton}
                      onClick={e => {
                        e.stopPropagation();
                        if (playing) {
                          handlePlayPause();
                        } else {
                          handlePlaySong(song, tracksSet, tracksSet.findIndex(s => s.uuid === song.uuid));
                        }
                      }}
                    >
                      {playing ? '❚❚' : '▶'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={s.tracksList}>
            {tracksSet.slice(5).map((song: Song, index: number) => (
              <TrackRow
                key={`${song.uuid}-${index+5}`}
                song={song}
                useGlobalPlayer={false}
                showProgressBar={false}
                // playLine={true}
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlay={() => handlePlaySong(song, tracksSet, tracksSet.findIndex(s => s.uuid === song.uuid))}
                onPause={handlePlayPause}
                onArtistClick={handleArtistClick}
                index={index+5}
                users={mockUsers}
              />
            ))}
          </div>
        </section>
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Также может понравиться</h2>
          <div className={s.albumsGrid}>
            {albumsSet.map((album: any) => (
              <AlbumCard
                key={album.uuid}
                album={album}
                onPause={()=>{}}
                users={mockUsers}
                songs={mockSongs}
                onPlay={(song: any) => {
                  // Найти все треки альбома
                  const albumSongs = mockSongs.filter((s: any) => album.savedSongsUUIDs.includes(s.uuid));
                  const songIndex = albumSongs.findIndex((s: any) => s.uuid === song.uuid);
                  // Передать именно albumSongs как плейлист, чтобы плеер играл треки альбома
                  handlePlaySong(song, albumSongs, songIndex);
                }}
                onArtistClick={handleArtistClick}
              />
            ))}
          </div>
        </section>
      </div>
      {/* Глобальный плеер */}
      {currentSong && (
        <div
          style={{
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
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 900,
              borderRadius: 8,
              background: 'rgba(51,51,51,0.97)',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              minHeight: 72,
              padding: '12px 24px',
            }}
          >
            <img
              src={currentSong.urlImage}
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
                {getArtistName(currentSong.authorUUID)}
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
                onClick={handlePlayPause}
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
                  const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percent = clickX / rect.width;
                  handleProgressChange(percent * 100);
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
                onChange={e => handleVolumeChange(Number(e.target.value))}
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
}

// Вспомогательная функция для форматирования времени
function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}