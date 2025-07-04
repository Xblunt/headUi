'use client';

import { useState } from "react";
import { PfTabMenu } from "@/components/ui/tabmenu";
import { Album, Song, SongStatus, Tag, User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";
import { mockAlbums } from '@/mocks/mockAlbums';
import { mockSongs } from '@/mocks/mockSongs';
import { mockUsers } from '@/mocks/mockUsers';

type SortOption = {
  label: string;
  value: string;
};

const AlbumsPage = () => {
  const [albums, setAlbums] = useState<Album[]>(mockAlbums);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const [showInfoModal, setShowInfoModal] = useState<Album | null>(null);
  const [showEditModal, setShowEditModal] = useState<Album | null>(null);
  const [editedAlbum, setEditedAlbum] = useState<Partial<Album>>({});
  const itemsPerPage = 5;

  const sortOptions: SortOption[] = [
    { label: 'По названию (А-Z)', value: 'name-asc' },
    { label: 'По названию (Z-А)', value: 'name-desc' },
    { label: 'По количеству треков (↑)', value: 'songs-asc' },
    { label: 'По количеству треков (↓)', value: 'songs-desc' },
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
      const artistName = mockUsers.find(u => u.uuid === album.authorUUID)?.login || '';
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
    return mockSongs.filter(song => album.savedSongsUUIDs.includes(song.uuid));
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
              title="Поиск..."
              placeholder="запрос"
            />
          </div>
          
          <div className={s.sortContainer}>
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={(e) => setSortOption(e.value)}
              placeholder="Сортировка"
              className={s.sortDropdown}
            />
          </div>
        </div>
      </div>

      <div className={s.albumList}>
        {paginatedAlbums.length > 0 ? (
          paginatedAlbums.map((album) => {
            const artist = mockUsers.find(u => u.uuid === album.authorUUID);
            const songsInAlbum = getSongsInAlbum(album);
            
            return (
              <div
                key={album.uuid}
                className={s.albumCard}
                style={{ border: '1px solid #ccc', borderRadius: 12 }}
              >
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
                    className={`${s.actionButton} ${s.infoButton}`}
                    onClick={() => setShowInfoModal(album)}
                    title="Инфо"
                  >
                    <i className="pi pi-eye"></i>
                  </button>
                  
                  <button 
                    className={`${s.actionButton} ${s.editButton}`}
                    onClick={() => {
                      setShowEditModal(album);
                      setEditedAlbum({ name: album.name, urlImage: album.urlImage });
                    }}
                    title="Редактировать"
                  >
                    <i className="pi pi-pencil"></i>
                  </button>
                  
                  <button 
                    className={`${s.actionButton} ${s.deleteButton}`}
                    onClick={() => handleDeleteAlbum(album.uuid)}
                    title="Удалить"
                  >
                    <i className="pi pi-trash"></i>
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
                      <p>Нет треков</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={s.emptyState}>
            {searchQuery ? (
              <p>Нет альбомов по запросу "{searchQuery}"</p>
            ) : (
              <p>Нет альбомов</p>
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

      {showInfoModal && (
        <div className={s.modalOverlay}  onClick={() => setShowInfoModal(null)}>
          <div className={s.modalContent}  onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h3>Информация об альбоме</h3>
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
                <span className={s.infoLabel} style={{ minWidth: 100, display: 'inline-block' }}>Название:</span>
                <span className={s.infoValue} style={{ marginLeft: 6 }}>{showInfoModal.name}</span>
              </div>
              
              <div className={s.infoRow}>
                <span className={s.infoLabel} style={{ minWidth: 100, display: 'inline-block' }}>Артист:</span>
                <span className={s.infoValue} style={{ marginLeft: 6 }}>
                  {mockUsers.find(u => u.uuid === showInfoModal.authorUUID)?.login || 'Неизвестный артист'}
                </span>
              </div>
              
              <div className={s.infoRow}>
                <span className={s.infoLabel} style={{ minWidth: 100, display: 'inline-block' }}>Треки:</span>
                <div className={s.infoValue} style={{ marginLeft: 6 }}>
                  {getSongsInAlbum(showInfoModal).length > 0 ? (
                    <ul className={s.songsListModal}>
                      {getSongsInAlbum(showInfoModal).map(song => (
                        <li key={song.uuid} className={s.songItemModal}>
                          {song.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Нет треков в альбоме</p>
                  )}
                </div>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoLabel} style={{ minWidth: 100, display: 'inline-block' }}>Дата создания:</span>
                <span className={s.infoValue} style={{ marginLeft: 6 }}>{showInfoModal.createdAt ? new Date(showInfoModal.createdAt).toLocaleDateString() : '-'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className={s.modalOverlay} onClick={() => setShowEditModal(null)}>
          <div className={s.modalContent} onClick={e => e.stopPropagation()} style={{ minWidth: 750, width: 750 }}>
            <div className={s.modalHeader}>
              <h3>Редактировать альбом</h3>
              <button onClick={() => setShowEditModal(null)} className={s.closeButton}>
                &times;
              </button>
            </div>
            <div className={s.modalBody}>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Название альбома:</label>
                <input
                  type="text"
                  value={editedAlbum.name || ''}
                  onChange={(e) => setEditedAlbum({...editedAlbum, name: e.target.value})}
                  className={s.formInput}
                />
              </div>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Обложка:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setEditedAlbum({ ...editedAlbum, urlImage: ev.target?.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {(editedAlbum.urlImage || showEditModal.urlImage) && (
                    <img
                      src={editedAlbum.urlImage || showEditModal.urlImage}
                      alt="Обложка альбома"
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
                    />
                  )}
                </div>
              </div>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Артист:</label>
                <input
                  type="text"
                  value={mockUsers.find(u => u.uuid === showEditModal.authorUUID)?.login || 'Неизвестный артист'}
                  readOnly
                  className={s.formInput}
                />
              </div>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Треки:</label>
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
                    <p>Нет треков в альбоме</p>
                  )}
                </div>
              </div>
            </div>
            <div className={s.modalFooter}>
              <button
                onClick={() => setShowEditModal(null)}
                className={`${s.cancelButton} ${s.modalButton}`}
              >
                Отмена
              </button>
              <button
                onClick={handleUpdateAlbum}
                className={`${s.saveButton} ${s.modalButton}`}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;