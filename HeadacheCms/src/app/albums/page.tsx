'use client';

import { useState } from "react";
import { PfTabMenu } from "@/components/ui/tabmenu";
import { Album, Song, SongStatus, Tag, User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";

// Mock data
export const tagsMock: Tag[] = [
  new Tag({ uuid: 'tag-1', tagName: 'Rock' }),
  new Tag({ uuid: 'tag-2', tagName: 'Pop' }),
  new Tag({ uuid: 'tag-3', tagName: 'Electronic' }),
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
    status: SongStatus.APPROVED,
    authorUUID: 'user-1',
    tags: [tagsMock[1]],
    fileUUID: 'file-2'
  }),
];

export const albumsMock: Album[] = [
  new Album({
    uuid: 'album-1',
    name: 'Greatest Hits',
    urlImage: 'https://example.com/album1.jpg',
    authorUUID: 'user-1',
    savedSongsUUIDs: ['song-1', 'song-2']
  }),
  new Album({
    uuid: 'album-2',
    name: 'Summer Vibes',
    urlImage: 'https://example.com/album2.jpg',
    authorUUID: 'user-1',
    savedSongsUUIDs: ['song-2']
  }),
   new Album({
    uuid: 'album-2',
    name: 'Summer Vibes',
    urlImage: 'https://example.com/album2.jpg',
    authorUUID: 'user-1',
    savedSongsUUIDs: ['song-2']
  }),
   new Album({
    uuid: 'album-2',
    name: 'Summer Vibes',
    urlImage: 'https://example.com/album2.jpg',
    authorUUID: 'user-1',
    savedSongsUUIDs: ['song-2']
  }),
   new Album({
    uuid: 'album-2',
    name: 'Summer Vibes',
    urlImage: 'https://example.com/album2.jpg',
    authorUUID: 'user-1',
    savedSongsUUIDs: ['song-2']
  }),
   new Album({
    uuid: 'album-2',
    name: 'Summer Vibes',
    urlImage: 'https://example.com/album2.jpg',
    authorUUID: 'user-1',
    savedSongsUUIDs: ['song-2']
  }),
  new Album({
    uuid: 'album-3',
    name: 'Electronic Dreams',
    urlImage: 'https://example.com/album3.jpg',
    authorUUID: 'user-2',
    savedSongsUUIDs: []
  }),
];

type SortOption = {
  label: string;
  value: string;
};

const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>(albumsMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const [showInfoModal, setShowInfoModal] = useState<Album | null>(null);
  const [showEditModal, setShowEditModal] = useState<Album | null>(null);
  const [editedAlbum, setEditedAlbum] = useState<Partial<Album>>({});
  const itemsPerPage = 5;

  const sortOptions: SortOption[] = [
    { label: 'By name (A-Z)', value: 'name-asc' },
    { label: 'By name (Z-A)', value: 'name-desc' },
    { label: 'By songs count (↑)', value: 'songs-asc' },
    { label: 'By songs count (↓)', value: 'songs-desc' },
  ];

  const sortAlbums = (albums: Album[]) => {
    return [...albums].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'songs-asc':
          return a.savedSongsUUIDs.length - b.savedSongsUUIDs.length;
        case 'songs-desc':
          return b.savedSongsUUIDs.length - a.savedSongsUUIDs.length;
        default:
          return 0;
      }
    });
  };

  const filteredAlbums = sortAlbums(
    albums.filter(album => {
      const artistName = usersMock.find(u => u.uuid === album.authorUUID)?.login || '';
      const searchMatch = searchQuery === '' || 
        album.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        artistName.toLowerCase().includes(searchQuery.toLowerCase());
      
      return searchMatch;
    })
  );

  const paginatedAlbums = filteredAlbums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);

  const handleDeleteAlbum = (albumId: string) => {
    setAlbums(albums.filter(album => album.uuid !== albumId));
  };

  const handleUpdateAlbum = () => {
    if (!showEditModal || !editedAlbum.name) return;
    
    setAlbums(albums.map(album => 
      album.uuid === showEditModal.uuid ? 
      { ...album, name: editedAlbum.name!, urlImage: editedAlbum.urlImage } : 
      album
    ));
    setShowEditModal(null);
    setEditedAlbum({});
  };

  const getSongsInAlbum = (album: Album) => {
    return songsMock.filter(song => album.savedSongsUUIDs.includes(song.uuid));
  };

  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        
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

      <div className={s.albumList}>
        {paginatedAlbums.length > 0 ? (
          paginatedAlbums.map((album) => {
            const artist = usersMock.find(u => u.uuid === album.authorUUID);
            const songsInAlbum = getSongsInAlbum(album);
            
            return (
              <div key={album.uuid} className={s.albumCard}>
                <div className={s.albumImage}>
                  <img 
                    src={album.urlImage || 'https://via.placeholder.com/150'} 
                    alt={album.name} 
                    className={s.albumCover}
                  />
                </div>
                
                <div className={s.albumInfo}>
                  <h3 className={s.albumTitle}>{album.name}</h3>
                  <p 
                    className={s.albumArtist}
                    onClick={() => console.log(`Artist clicked: ${artist?.login}`)}
                  >
                    {artist?.login || 'Unknown Artist'}
                  </p>
                  <div className={s.songsCount}>
                    {songsInAlbum.length} track{songsInAlbum.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className={s.albumActions}>
                  <button 
                    className={s.actionButton}
                    onClick={() => setShowInfoModal(album)}
                    title="Info"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                  </button>
                  
                  <button 
                    className={s.actionButton}
                    onClick={() => {
                      setShowEditModal(album);
                      setEditedAlbum({ name: album.name, urlImage: album.urlImage });
                    }}
                    title="Edit"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                  </button>
                  
                  <button 
                    className={s.actionButton}
                    onClick={() => handleDeleteAlbum(album.uuid)}
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                  </button>
                </div>
                
                <div className={s.songsTooltip}>
                  <div className={s.tooltipContent}>
                    {songsInAlbum.length > 0 ? (
                      <ul className={s.songsList}>
                        {songsInAlbum.map(song => (
                          <li key={song.uuid} className={s.songItem}>
                            {song.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No tracks in this album</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={s.emptyState}>
            {searchQuery ? (
              <p>No albums found for "{searchQuery}"</p>
            ) : (
              <p>No albums available</p>
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

      {/* Album Info Modal */}
      {showInfoModal && (
        <div className={s.modalOverlay} onClick={() => setShowInfoModal(null)}>
          <div className={s.modalContent} onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h3>Album Information</h3>
              <button onClick={() => setShowInfoModal(null)} className={s.closeButton}>
                &times;
              </button>
            </div>
            <div className={s.modalBody}>
              <div className={s.albumModalImage}>
                <img 
                  src={showInfoModal.urlImage || 'https://via.placeholder.com/300'} 
                  alt={showInfoModal.name} 
                />
              </div>
              
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Name:</span>
                <span className={s.infoValue}>{showInfoModal.name}</span>
              </div>
              
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Artist:</span>
                <span className={s.infoValue}>
                  {usersMock.find(u => u.uuid === showInfoModal.authorUUID)?.login || 'Unknown Artist'}
                </span>
              </div>
              
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Tracks:</span>
                <div className={s.infoValue}>
                  {getSongsInAlbum(showInfoModal).length > 0 ? (
                    <ul className={s.songsListModal}>
                      {getSongsInAlbum(showInfoModal).map(song => (
                        <li key={song.uuid} className={s.songItemModal}>
                          {song.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No tracks in this album</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Album Modal */}
      {showEditModal && (
        <div className={s.modalOverlay} onClick={() => setShowEditModal(null)}>
          <div className={s.modalContent} onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h3>Edit Album</h3>
              <button onClick={() => setShowEditModal(null)} className={s.closeButton}>
                &times;
              </button>
            </div>
            <div className={s.modalBody}>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Album Name:</label>
                <input
                  type="text"
                  value={editedAlbum.name || ''}
                  onChange={(e) => setEditedAlbum({...editedAlbum, name: e.target.value})}
                  className={s.formInput}
                />
              </div>
              
              <div className={s.formGroup}>
                <label className={s.formLabel}>Cover Image URL:</label>
                <input
                  type="text"
                  value={editedAlbum.urlImage || ''}
                  onChange={(e) => setEditedAlbum({...editedAlbum, urlImage: e.target.value})}
                  className={s.formInput}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className={s.formGroup}>
                <label className={s.formLabel}>Artist:</label>
                <input
                  type="text"
                  value={usersMock.find(u => u.uuid === showEditModal.authorUUID)?.login || 'Unknown Artist'}
                  readOnly
                  className={s.formInput}
                />
              </div>
              
              <div className={s.formGroup}>
                <label className={s.formLabel}>Tracks:</label>
                <div className={s.tracksList}>
                  {getSongsInAlbum(showEditModal).length > 0 ? (
                    <ul className={s.songsListEdit}>
                      {getSongsInAlbum(showEditModal).map(song => (
                        <li key={song.uuid} className={s.songItemEdit}>
                          {song.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No tracks in this album</p>
                  )}
                </div>
              </div>
            </div>
            <div className={s.modalFooter}>
              <button onClick={() => setShowEditModal(null)} className={s.cancelButton}>
                Cancel
              </button>
              <button onClick={handleUpdateAlbum} className={s.saveButton}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;