'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import s from './style.module.scss';
// import { Song, PromotionRequest, Album, User, Tag, SongStatus, PromotionStatus } from '@/models';
// import { useRouter } from 'next/navigation';
// import TrackRow from '@/components/track';
// import AlbumCard from '@/components/album';

// // import { Song, PromotionRequest, Album, User, Tag } from './types';

// export const mockUsers: User[] = [
//   new User({
//     uuid: '1',
//     login: 'artist1',
//     roles: ['ARTIST'],
//     imgFileUUID: 'img1',
//     description: 'Professional musician'
//   }),
//   new User({
//     uuid: '2',
//     login: 'artist2',
//     roles: ['ARTIST'],
//     imgFileUUID: 'img2',
//     description: 'Indie artist'
//   })
// ];

// export const mockTags: Tag[] = [
//   new Tag({ uuid: '1', tagName: 'Rock' }),
//   new Tag({ uuid: '2', tagName: 'Pop' }),
//   new Tag({ uuid: '3', tagName: 'Electronic' })
// ];

// export const mockSongs: Song[] = [
//   new Song({
//     uuid: '1',
//     name: 'Midnight City',
//     avgRating: 4.5,
//     url: '/songs/1.mp3',
//     status: SongStatus.APPROVED,
//     authorUUID: '1',
//     tags: [mockTags[0], mockTags[2]],
//     fileUUID: 'file1'
//   }),
//     new Song({
//     uuid: '1',
//     name: 'Midnight City',
//     avgRating: 4.5,
//     url: '/songs/1.mp3',
//     status: SongStatus.APPROVED,
//     authorUUID: '1',
//     tags: [mockTags[0], mockTags[2]],
//     fileUUID: 'file1'
//   }),
//     new Song({
//     uuid: '1',
//     name: 'Midnight City',
//     avgRating: 4.5,
//     url: '/songs/1.mp3',
//     status: SongStatus.APPROVED,
//     authorUUID: '1',
//     tags: [mockTags[0], mockTags[2]],
//     fileUUID: 'file1'
//   }),
//     new Song({
//     uuid: '1',
//     name: 'Midnight City',
//     avgRating: 4.5,
//     url: '/songs/1.mp3',
//     status: SongStatus.APPROVED,
//     authorUUID: '1',
//     tags: [mockTags[0], mockTags[2]],
//     fileUUID: 'file1'
//   }),
//     new Song({
//     uuid: '1',
//     name: 'Midnight City',
//     avgRating: 4.5,
//     url: '/songs/1.mp3',
//     status: SongStatus.APPROVED,
//     authorUUID: '1',
//     tags: [mockTags[0], mockTags[2]],
//     fileUUID: 'file1'
//   }),
//   new Song({
//     uuid: '2',
//     name: 'Summer Vibes',
//     avgRating: 4.2,
//     url: '/songs/2.mp3',
//     status:  SongStatus.APPROVED,
//     authorUUID: '2',
//     tags: [mockTags[1]],
//     fileUUID: 'file2'
//   }),
//     new Song({
//     uuid: '2',
//     name: 'Summer Vibes',
//     avgRating: 4.2,
//     url: '/songs/2.mp3',
//     status:  SongStatus.APPROVED,
//     authorUUID: '2',
//     tags: [mockTags[1]],
//     fileUUID: 'file2'
//   }),
//     new Song({
//     uuid: '2',
//     name: 'Summer Vibes',
//     avgRating: 4.2,
//     url: '/songs/2.mp3',
//     status:  SongStatus.APPROVED,
//     authorUUID: '2',
//     tags: [mockTags[1]],
//     fileUUID: 'file2'
//   }),
//     new Song({
//     uuid: '2',
//     name: 'Summer Vibes',
//     avgRating: 4.2,
//     url: '/songs/2.mp3',
//     status:  SongStatus.APPROVED,
//     authorUUID: '2',
//     tags: [mockTags[1]],
//     fileUUID: 'file2'
//   })
// ];

// export const mockPromotions: PromotionRequest[] = [
//   new PromotionRequest({
//     uuid: '1',
//     songUUID: '1',
//     msg: 'Check out my new track!',
//     dispatchTime: '2023-05-01T10:00:00Z',
//     status: PromotionStatus.PROMOTED
//   }),
//   new PromotionRequest({
//     uuid: '2',
//     songUUID: '2',
//     msg: 'Fresh summer beats!',
//     dispatchTime: '2023-05-02T11:00:00Z',
//     status: PromotionStatus.PROMOTED
//   })
// ];

// export const mockAlbums: Album[] = [
//   new Album({
//     uuid: '1',
//     name: 'Night Drive',
//     authorUUID: '1',
//     savedSongsUUIDs: ['1', '1', '1', '1', '1'] // 5 треков Midnight City
//   }),
//   new Album({
//     uuid: '2',
//     name: 'Summer Hits',
//     authorUUID: '2',
//     savedSongsUUIDs: ['2', '2', '2', '2'] // 4 трека Summer Vibes
//   })
// ];

// const MainPage = () => {
//     const router = useRouter(); 
//   const [currentSong, setCurrentSong] = useState<Song | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);

//   // Get promoted songs
//   const promotedSongs = mockPromotions
//     .filter(promo => promo.status === 'PROMOTED')
//     .map(promo => mockSongs.find(song => song.uuid === promo.songUUID))
//     .filter(Boolean) as Song[];

//   useEffect(() => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.play().catch(e => console.error("Play error:", e));
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying, currentSong]);

//   const handlePlaySong = (song: Song) => {
//     setCurrentSong(song);
//     setIsPlaying(true);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//      setCurrentSong(null);
//   };

//   const getArtistName = (authorUUID: string) => {
//     return mockUsers.find(user => user.uuid === authorUUID)?.login || 'Unknown Artist';
//   };

//    const handleArtistClick = (login: string) => {
//     router.push(`/author/info/${login}`);
//   };

//   return (
//     <div className={"wrapper"}>
//       <div className={s.musicApp}>
    

// <section className={s.swiperSection}>
//   <Swiper
//     modules={[Pagination]} 
//     spaceBetween={20}
//     //   autoplay={{
//     //   delay: 4000,
//     // }}
//     className={s.swiper}
//     slidesPerView={1.2}
    
//     pagination={{
//       clickable: true,
//       renderBullet: (index, className) => {
//         return `<span class="${className}" style="background-color: #000; width: 40px; height: 4px; border-radius: 10px; margin: 0 5px;"></span>`;
//       }
//     }}
//     centeredSlides
//     loop
//   >
//     {/* Hardcoded first slide */}
//     <SwiperSlide className={s.swiperSlide}>
//       <div className={s.newReleasesSlide}>
//         <h2>НОВИНКИ</h2>
//       </div>
//     </SwiperSlide>

//     {/* Promotion slides */}
//     {promotedSongs.map((song) => {
//       const promotion = mockPromotions.find(p => p.songUUID === song.uuid);
//       const artistName = getArtistName(song.authorUUID);
//       return (
//         <SwiperSlide key={song.uuid} className={s.swiperSlide}>
//           <div 
//             className={s.promotionSlide}
//             style={{
//               backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg)`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}
//           >
//             <div className={s.promotionOverlay}>
//               <div className={s.promotionContent}>
//                 <h3>{song.name}</h3>
//                 <p className={s.artist}
//                   onClick={() => handleArtistClick(artistName)}
//                       style={{ cursor: 'pointer' }}
//                 >{artistName}</p>
//                 {promotion?.msg && <p className={s.promotionMsg}>{promotion.msg}</p>}
//                 <button 
//                   className={s.playButton}
//                   onClick={() => handlePlaySong(song)}
//                 >
//                   ▶ Play
//                 </button>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       );
//     })}
//   </Swiper>
// </section>

//         {/* Songs List */}
// <section className={s.section}>
//   {/* Первые 5 песен в виде карточек */}
//   <h2 className={s.sectionTitle}>Рекомендованные треки</h2>
//   <div className={s.songsGrid}>
//     {mockSongs.slice(0, 5).map(song => {
//       const artistName = getArtistName(song.authorUUID);
//       return (
//         <div 
//           key={song.uuid} 
//           onClick={() => handlePlaySong(song)}
//           className={s.songCard}
//           style={{
//             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg)`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center'
//           }}
//         >
//           <div className={s.songInfo}>
//             <p className={s.artist}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleArtistClick(artistName);
//               }}
//               style={{ cursor: 'pointer' }}
//             >{artistName}</p>
//             <h3 className={s.songTitle}>{song.name}</h3>
//             <div className={s.tags}>
//               {song.tags.map(tag => (
//                 <span key={tag.uuid} className={s.tag}>{tag.tagName}</span>
//               ))}
//             </div>
//             <button 
//               className={s.playButton}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handlePlaySong(song);
//               }}
//             >
//               ▶
//             </button>
//           </div>
//         </div>
//       );
//     })}
//   </div>

//   {/* Остальные песни в виде списка */}
//   <div className={s.tracksList}>
//     {mockSongs.slice(5).map((song, index) => (
//       <TrackRow
//         key={song.uuid}
//         song={song}
//         currentSong={currentSong}
//         isPlaying={isPlaying}
//         onPlay={handlePlaySong}
//         onPause={togglePlayPause}
//         onArtistClick={handleArtistClick}
//         index={index + 5} // Добавляем 5, чтобы индексы продолжались
//         users={mockUsers}
//       />
//     ))}
//   </div>
// </section>

//         {/* Albums List */}
//  {/* Albums List */}
// <section className={s.section}>
//   <h2 className={s.sectionTitle}>Рекомендованные альбомы</h2>
//   <div className={s.albumsGrid}>
//     {mockAlbums.map(album => (
//       <AlbumCard
//         key={album.uuid}
//         album={album}
//         users={mockUsers}
//         songs={mockSongs}
//         onPause={togglePlayPause}
//         onPlay={handlePlaySong}
//         onArtistClick={handleArtistClick}
//       />
//     ))}
//   </div>
// </section>
//         {/* Audio Player */}
//         {currentSong && (
//           <div className={s.player}>
//             <div className={s.playerInfo}>
//               <h4>{currentSong.name}</h4>
//               <p>{getArtistName(currentSong.authorUUID)}</p>
//             </div>
//             <button 
//               className={s.playPauseButton}
//               onClick={togglePlayPause}
//             >
//               {isPlaying ? '❚❚' : '▶'}
//             </button>
//             <audio
//               ref={audioRef}
//               src={currentSong.url}
//               onEnded={() => setIsPlaying(false)}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MainPage;


// app/MainPage.tsx
// 'use client';

import { usePlayerStore } from '@/stores/playerStore';
import { Header } from '@/components/header';
// import { GlobalPlayer } from '@/components/GlobalPlayer';
// import { AlbumCard } from '@/components/album';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import s from './style.module.scss';
import { useRouter } from 'next/navigation';
// import { mockUsers, mockSongs, mockAlbums, mockPromotions } from './mocks';
import { Album, PromotionRequest, PromotionStatus, Song, SongStatus, Tag, User } from '@/models';
import { GlobalPlayer } from '@/components/player';
import AlbumCard from '@/components/album';
import TrackRow from '@/components/track';
import { mockAlbums, mockPromotions, mockSongs, mockUsers } from './mock';

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
    router.push(`/author/info/${login}`);
  };

  const promotedSongs = mockPromotions
    .filter((promo: any) => promo.status === 'PROMOTED')
    .map((promo: any) => mockSongs.find((song: any) => song.uuid === promo.songUUID))
    .filter(Boolean) as Song[];

  return (
    <div className={"wrapper"}>
      <Header />
      <div className={s.musicApp}>
        {/* Swiper Section */}
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

            {promotedSongs.map((song) => (
              <SwiperSlide key={song.uuid} className={s.swiperSlide}>
                <div className={s.promotionSlide} style={{
                    backgroundImage:
                      'url("https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                  <div className={s.promotionOverlay}>
                    <div className={s.promotionContent}>
                      <h3>{song.name}</h3>
                      <p className={s.artist} onClick={() => handleArtistClick(getArtistName(song.authorUUID))}>
                        {getArtistName(song.authorUUID)}
                      </p>
                      <button 
                        className={s.playButton}
                        onClick={() => handlePlaySong(song, mockSongs, mockSongs.findIndex((s: any) => s.uuid === song.uuid))}
                      >
                        ▶ Play
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Songs List */}
      <section className={s.section}>
  <h2 className={s.sectionTitle}>Рекомендованные треки</h2>
  
    {/* Карточки первых 5 треков */}
<div className={s.songsGrid}>
  {mockSongs.slice(0, 5).map((song: Song) => {
    const isCurrent = globalCurrentSong?.uuid === song.uuid;
    const isPlaying = isCurrent && globalIsPlaying;
    return (
      <div
        key={song.uuid}
        className={s.songCard}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg" )`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={() =>
          handlePlaySong(song, mockSongs, mockSongs.findIndex(s => s.uuid === song.uuid))
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
                handlePlaySong(song, mockSongs, mockSongs.findIndex(s => s.uuid === song.uuid));
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

    {/* Список остальных треков */}
    <div className={s.tracksList}>
      {mockSongs.slice(5).map((song: Song, index: number) => (
        <TrackRow
          key={`${song.uuid}-${index+5}`}
          song={song}
          // playlist={mockSongs}
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

        {/* Albums List */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Рекомендованные альбомы</h2>
          <div className={s.albumsGrid}>
            {mockAlbums.map((album: any) => (
              <AlbumCard
                key={album.uuid}
                album={album}
                onPause={()=>{}}
                users={mockUsers}
                songs={mockSongs}
                onPlay={(song: any) => {
                  const songIndex = mockSongs.findIndex((s: any)=> s.uuid === song.uuid);
                  handlePlaySong(song, mockSongs, songIndex);
                }}
                onArtistClick={handleArtistClick}
              />
            ))}
          </div>
        </section>
      </div>
      <GlobalPlayer />
    </div>
  );
}