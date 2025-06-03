'use client';

import { useState } from "react";
import { tabsMusic } from "@/mocks/other.mock";
import { PfTabMenu } from "@/components/ui/tabmenu";
import { Song, SongStatus, Tag } from "@/models";
import { User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import TrackRow from "@/components/track";
import { Pagination } from "@/components/pagination";

export const tagsMock: Tag[] = [
  new Tag({ uuid: 'tag-1', tagName: 'Rock' }),
  new Tag({ uuid: 'tag-2', tagName: 'Pop' }),
  new Tag({ uuid: 'tag-3', tagName: 'Electronic' }),
  new Tag({ uuid: 'tag-4', tagName: 'Hip-Hop' }),
  new Tag({ uuid: 'tag-5', tagName: 'Jazz' }),
];

export const usersMock: User[] = [
  new User({
    uuid: 'user-1',
    login: 'ArtistOne',
    email: 'artist1@example.com',
    roles: ['ARTIST'],
    urlImage: 'https://example.com/artist1.jpg',
    avgRating: 4.5
  }),
  new User({
    uuid: 'user-2',
    login: 'LabelOne',
    email: 'label1@example.com',
    roles: ['LABEL'],
    urlImage: 'https://example.com/label1.jpg'
  }),
];

export const songsMock: Song[] = [
  new Song({
    uuid: 'song-1',
    name: 'Rock Anthem',
    avgRating: 4.8,
    url: '/music/rock-anthem.mp3',
    urlImage: 'https://example.com/rock-anthem.jpg',
    status: SongStatus.APPROVED,
    authorUUID: 'user-1',
    tags: [tagsMock[0], tagsMock[1]],
    fileUUID: 'file-1'
  }),
  new Song({
    uuid: 'song-2',
    name: 'Pop Hit',
    avgRating: 4.2,
    url: '/music/pop-hit.mp3',
    urlImage: 'https://example.com/pop-hit.jpg',
    status: SongStatus.AWAITING,
    authorUUID: 'user-1',
    tags: [tagsMock[1]],
    fileUUID: 'file-1'
  }),
    new Song({
    uuid: 'song-2',
    name: 'Pop Hit',
    avgRating: 4.2,
    url: '/music/pop-hit.mp3',
    urlImage: 'https://example.com/pop-hit.jpg',
    status: SongStatus.AWAITING,
    authorUUID: 'user-1',
    tags: [tagsMock[1]],
    fileUUID: 'file-1'
  }),
    new Song({
    uuid: 'song-2',
    name: 'Pop Hit',
    avgRating: 4.2,
    url: '/music/pop-hit.mp3',
    urlImage: 'https://example.com/pop-hit.jpg',
    status: SongStatus.AWAITING,
    authorUUID: 'user-1',
    tags: [tagsMock[1]],
    fileUUID: 'file-1'
  }),
    new Song({
    uuid: 'song-2',
    name: 'Pop Hit',
    avgRating: 4.2,
    url: '/music/pop-hit.mp3',
    urlImage: 'https://example.com/pop-hit.jpg',
    status: SongStatus.AWAITING,
    authorUUID: 'user-1',
    tags: [tagsMock[1]],
    fileUUID: 'file-1'
  }),
    new Song({
    uuid: 'song-2',
    name: 'Pop Hit',
    avgRating: 4.2,
    url: '/music/pop-hit.mp3',
    urlImage: 'https://example.com/pop-hit.jpg',
    status: SongStatus.AWAITING,
    authorUUID: 'user-1',
    tags: [tagsMock[1]],
    fileUUID: 'file-1'
  }),
  new Song({
    uuid: 'song-3',
    name: 'Electronic Vibes',
    avgRating: 4.6,
    url: '/music/electronic-vibes.mp3',
    urlImage: 'https://example.com/electronic-vibes.jpg',
    status: SongStatus.DISAPPROVED,
    authorUUID: 'user-1',
    tags: [tagsMock[2]],
    fileUUID: 'file-1'
  }),
];

type SortOption = {
  label: string;
  value: string;
};

const MusicPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [songs, setSongs] = useState<Song[]>(songsMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const itemsPerPage = 5;

  const sortOptions: SortOption[] = [
    { label: 'По названию (А-Я)', value: 'name-asc' },
    { label: 'По названию (Я-А)', value: 'name-desc' },
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
      
      const artistName = usersMock.find(u => u.uuid === song.authorUUID)?.login || '';
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
  };

  const handlePause = () => {
    setIsPlaying(false);
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

  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        <PfTabMenu 
          list={tabsMusic} 
          activeIndex={activeTab} 
          onTabChange={(e) => {
            setActiveTab(e.index);
            setCurrentPage(1);
          }} 
        />
        
         <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
              onChange={(e) => setSearchQuery(e.target.value)}
              title="Search..."
              placeholder="Album name or artist"
            />
          </div>
          
          <div className={s.sortContainer}>
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={(e) => setSortOption(e.value)}
              placeholder="Sort by"
              className={s.sortDropdown}
            />
          </div>
        </div>
      </div>

      <div className={s.trackList}>
        {paginatedSongs.length > 0 ? (
          paginatedSongs.map((song, index) => (
            <TrackRow
              key={song.uuid}
              song={song}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onArtistClick={handleArtistClick}
              index={index}
              users={usersMock}
              onApprove={activeTab !== 1 ? handleApprove : undefined}
              onReject={activeTab !== 2 ? handleReject : undefined}
              onUpdate={activeTab === 0 ? handleUpdate : undefined}
            />
          ))
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
    </div>
  );
};

export default MusicPage;