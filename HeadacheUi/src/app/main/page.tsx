'use client';

import { usePlayerStore } from '@/stores/playerStore';
import { Header } from '@/components/header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import s from './style.module.scss';
import { useRouter } from 'next/navigation';
import { Album, PromotionRequest, PromotionStatus, Song, SongStatus, Tag, User } from '@/models';
import { GlobalPlayer } from '@/components/player';
import AlbumCard from '@/components/album';
import TrackRow from '@/components/track';
import { mockAlbums } from '@/mocks/mockAlbums';
import { mockPromotions } from '@/mocks/mockPromotions';
import { mockSongs } from '@/mocks/mockSongs';
import { mockUsers } from '@/mocks/mockUsers';
import { mockSongSets } from '@/mocks/mockSongSets';
import { mockAlbumSets } from '@/mocks/mockAlbumSets';

export default function MainPage() {
  const router = useRouter();
  const {
    currentSong: globalCurrentSong,
    isPlaying: globalIsPlaying,
    setPlaylist,
    togglePlay: globalTogglePlay
  } = usePlayerStore();

  const handlePlaySong = (song: Song, playlist?: Song[], index?: number) => {
    // setPlaylist(playlist, index);
  };

  const togglePlayPause = () => {
    globalTogglePlay();
  };

  const getArtistName = (authorUUID: string) => {
    return mockUsers.find((user: any) => user.uuid === authorUUID)?.login || 'Unknown Artist';
  };

  const handleArtistClick = (login: string) => {
    router.push(`/info/${login}`);
  };

  let tracksSet = mockSongSets.set5;
  let albumsSet = mockAlbumSets.albumSet2;
  if (typeof window !== 'undefined' && localStorage.getItem('user') === 'secondUser') {
    tracksSet = mockSongSets.set6;
    albumsSet = mockAlbumSets.albumSet1;
  }

  const promotions = mockPromotions.filter((promo: any) => promo.status === 'PROMOTED');

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
              return (
                <SwiperSlide key={promo.uuid} className={s.swiperSlide}>
                  <div className={s.promotionSlide} style={{
                      backgroundImage: `url(${promo.urlImg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}>
                    <div className={s.promotionOverlay}>
                      <div className={s.promotionContent}>
                        <h3>{song.name}</h3>
                        <p className={s.artist} onClick={() => handleArtistClick(getArtistName(song.authorUUID))}>
                          {getArtistName(song.authorUUID)}
                        </p>
                        {promo.msg && <p className={s.promotionMsg}>{promo.msg}</p>}
                        <button 
                          className={s.playButton}
                          onClick={() => handlePlaySong(song, tracksSet, tracksSet.findIndex((s: any) => s.uuid === song.uuid))}
                        >
                          ▶ Play
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
              const isCurrent = globalCurrentSong?.uuid === song.uuid;
              const isPlaying = isCurrent && globalIsPlaying;
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
                        if (isPlaying) {
                          globalTogglePlay();
                        } else {
                          handlePlaySong(song, tracksSet, tracksSet.findIndex(s => s.uuid === song.uuid));
                        }
                      }}
                    >
                      {isPlaying ? '❚❚' : '▶'}
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
                useGlobalPlayer={true}
                showProgressBar={false}
                currentSong={globalCurrentSong}
                isPlaying={globalIsPlaying}
                onPlay={handlePlaySong}
                onPause={globalTogglePlay}
                onArtistClick={handleArtistClick}
                index={index+5}
                users={mockUsers}
              />
            ))}
          </div>
        </section>
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Рекомендованные альбомы</h2>
          <div className={s.albumsGrid}>
            {albumsSet.map((album: any) => (
              <AlbumCard
                key={album.uuid}
                album={album}
                onPause={()=>{}}
                users={mockUsers}
                songs={mockSongs}
                onPlay={(song: any) => {
                  const songIndex = tracksSet.findIndex((s: any)=> s.uuid === song.uuid);
                  handlePlaySong(song, tracksSet, songIndex);
                }}
                onArtistClick={handleArtistClick}
              />
            ))}
          </div>
        </section>
      </div>
      <GlobalPlayer
        currentSong={globalCurrentSong}
        isPlaying={globalIsPlaying}
        progress={0}
        onPlayPause={globalTogglePlay}
        onProgressChange={()=>{}}
        onNext={() => {}}
        onPrev={() => {}}
      />
    </div>
  );
}