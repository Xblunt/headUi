"use client"

import { useState, useEffect, useRef } from 'react';
import { FiMusic, FiTrash2, FiEdit, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Modal from '@/components/modal';
import { Song, Album, Tag, User, SongStatus, File, FileExtension, FileType } from '@/models';
import TrackRow from '@/components/track';
import s from './style.module.scss';

const MusicPage = () => {
  // Проверка на автора
  const isAuthor = localStorage.getItem('userRole') === 'author';

  // Текущий пользователь
  const [currentUser] = useState<User>(new User({
    uuid: 'user1',
    login: 'Мой профиль',
    roles: ['user'],
    email: 'me@example.com'
  }));

  // Состояния для треков
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [songSearchQuery, setSongSearchQuery] = useState('');
  const [songSortField, setSongSortField] = useState<'name' | 'date'>('name');
  const [songSortDirection, setSongSortDirection] = useState<'asc' | 'desc'>('asc');
  const [songCurrentPage, setSongCurrentPage] = useState(1);
  const songsPerPage = 5;

  // Состояния для альбомов
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [albumSearchQuery, setAlbumSearchQuery] = useState('');
  const [albumSortField, setAlbumSortField] = useState<'name' | 'date'>('name');
  const [albumSortDirection, setAlbumSortDirection] = useState<'asc' | 'desc'>('asc');
  const [albumCurrentPage, setAlbumCurrentPage] = useState(1);
  const albumsPerPage = 4;

  // Состояния для файлов
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Модальные окна
  const [showSongModal, setShowSongModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showAddToAlbumModal, setShowAddToAlbumModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{type: 'song' | 'album', id: string} | null>(null);

  // Формы
  const [newSong, setNewSong] = useState<Partial<Song>>({
    name: '',
    tags: [],
    urlImage: ''
  });
  const [newAlbum, setNewAlbum] = useState<Partial<Album>>({
    name: '',
    urlImage: '',
    savedSongsUUIDs: []
  });
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Загрузка начальных данных
  useEffect(() => {
    // Моковые файлы
    const mockFiles: File[] = [
      new File({
        uuid: 'file1',
        data: new Uint8Array(),
        extension: FileExtension.MP3,
        type: FileType.SONG
      }),
      new File({
        uuid: 'file2',
        data: new Uint8Array(),
        extension: FileExtension.MP3,
        type: FileType.SONG
      }),
      new File({
        uuid: 'file3',
        data: new Uint8Array(),
        extension: FileExtension.MP3,
        type: FileType.SONG
      }),
      new File({
        uuid: 'file4',
        data: new Uint8Array(),
        extension: FileExtension.MP3,
        type: FileType.SONG
      }),
      new File({
        uuid: 'file5',
        data: new Uint8Array(),
        extension: FileExtension.MP3,
        type: FileType.SONG
      }),
    ];

    // Моковые треки
    const mockSongs: Song[] = [
      new Song({
        uuid: 'song1',
        name: 'Мой первый трек',
        avgRating: 4.5,
        url: 'https://example.com/song1.mp3',
        status: SongStatus.APPROVED,
        authorUUID: currentUser.uuid,
        tags: [new Tag({ uuid: 'tag1', tagName: 'Рок' })],
        fileUUID: 'file1',
        urlImage: 'https://example.com/cover1.jpg',
        createdAt: '2023-10-01'
      }),
      // ... другие треки
    ];

    // Моковые альбомы
    const mockAlbums: Album[] = [
      new Album({
        uuid: 'album1',
        name: 'Мой первый альбом',
        authorUUID: currentUser.uuid,
        savedSongsUUIDs: ['song1'],
        urlImage: 'https://example.com/album1.jpg',
        createdAt: '2023-10-05'
      }),
      // ... другие альбомы
    ];

    setFiles(mockFiles);
    setSongs(mockSongs);
    setFilteredSongs(mockSongs);
    setAlbums(mockAlbums);
    setFilteredAlbums(mockAlbums);
  }, [currentUser.uuid]);

  // Фильтрация и сортировка треков
  useEffect(() => {
    let filtered = [...songs];
    
    if (songSearchQuery) {
      filtered = filtered.filter(song =>
        song.name.toLowerCase().includes(songSearchQuery.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (songSortField === 'name') {
        return songSortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return songSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });

    setFilteredSongs(filtered);
    setSongCurrentPage(1);
  }, [songSearchQuery, songSortField, songSortDirection, songs]);

  // Фильтрация и сортировка альбомов
  useEffect(() => {
    let filtered = [...albums];
    
    if (albumSearchQuery) {
      filtered = filtered.filter(album =>
        album.name.toLowerCase().includes(albumSearchQuery.toLowerCase())
      );
    }
    
    filtered.sort((a, b) => {
      if (albumSortField === 'name') {
        return albumSortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return albumSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
    });

    setFilteredAlbums(filtered);
    setAlbumCurrentPage(1);
  }, [albumSearchQuery, albumSortField, albumSortDirection, albums]);

  // Пагинация
  const songPaginated = filteredSongs.slice(
    (songCurrentPage - 1) * songsPerPage,
    songCurrentPage * songsPerPage
  );
  const songTotalPages = Math.ceil(filteredSongs.length / songsPerPage);

  const albumPaginated = filteredAlbums.slice(
    (albumCurrentPage - 1) * albumsPerPage,
    albumCurrentPage * albumsPerPage
  );
  const albumTotalPages = Math.ceil(filteredAlbums.length / albumsPerPage);

  // Обработчики файлов
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const arrayBuffer = await file.arrayBuffer();
//       const fileData = new Uint8Array(arrayBuffer);
      
//       const extension = Object.values(FileExtension).find(
//         ext => ext === file.name.split('.').pop()?.toUpperCase()
//       ) || FileExtension.MP3;
      
//       const newFile = new File({
//         uuid: `file_${Date.now()}`,
//         data: fileData,
//         extension,
//         type: FileType.SONG
//       });
      
//       setSelectedFile(newFile);
//     }
//   };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    
    const extension = Object.values(FileExtension).find(
      ext => ext === file.name.split('.').pop()?.toUpperCase()
    ) || FileExtension.MP3;
    
    const newFile = new File({
      uuid: `file_${Date.now()}`,
    data: new Uint8Array(arrayBuffer),// Используем Uint8Array
      extension,
      type: FileType.SONG
    });
    
    setSelectedFile(newFile);
  }
};

  // Обработчики треков
  const handleAddSong = () => {
    if (!newSong.name || !selectedFile) return;
      const blob = new Blob([selectedFile.data], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);

    const song = new Song({
      uuid: `song_${Date.now()}`,
      name: newSong.name,
      avgRating: 0,
        url: url,
      status: SongStatus.APPROVED,
      authorUUID: currentUser.uuid,
      tags: newSong.tags || [],
      fileUUID: selectedFile.uuid,
      urlImage: newSong.urlImage || '',
      createdAt: new Date().toISOString()
    });

    setFiles([...files, selectedFile]);
    setSongs([...songs, song]);
    setNewSong({ name: '', tags: [], urlImage: '' });
    setSelectedFile(null);
    setShowSongModal(false);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setNewSong({
      name: song.name,
      tags: song.tags,
      urlImage: song.urlImage
    });
    setSelectedFile(files.find(f => f.uuid === song.fileUUID) || null);
    setShowSongModal(true);
  };

  const handleUpdateSong = () => {
    if (!editingSong || !newSong.name) return;

    const updatedSong = new Song({
      ...editingSong,
      name: newSong.name,
      tags: newSong.tags || [],
      urlImage: newSong.urlImage || '',
      ...(selectedFile ? {
        url: URL.createObjectURL(new Blob([selectedFile.data])),
        fileUUID: selectedFile.uuid
      } : {})
    });

    if (selectedFile) {
      setFiles([...files, selectedFile]);
    }

    setSongs(songs.map(s => s.uuid === updatedSong.uuid ? updatedSong : s));
    setEditingSong(null);
    setNewSong({ name: '', tags: [], urlImage: '' });
    setSelectedFile(null);
    setShowSongModal(false);
  };

  const handleDeleteSong = (songId: string) => {
    setItemToDelete({ type: 'song', id: songId });
    setShowDeleteConfirmation(true);
  };

  // Обработчики альбомов
  const handleAddAlbum = () => {
    if (!newAlbum.name) return;

    const album = new Album({
      uuid: `album_${Date.now()}`,
      name: newAlbum.name,
      authorUUID: currentUser.uuid,
      savedSongsUUIDs: newAlbum.savedSongsUUIDs || [],
      urlImage: newAlbum.urlImage || '',
      createdAt: new Date().toISOString()
    });

    setAlbums([...albums, album]);
    setNewAlbum({ name: '', savedSongsUUIDs: [], urlImage: '' });
    setShowAlbumModal(false);
  };

  const handleEditAlbum = (album: Album) => {
    setEditingAlbum(album);
    setNewAlbum({
      name: album.name,
      savedSongsUUIDs: album.savedSongsUUIDs,
      urlImage: album.urlImage
    });
    setShowAlbumModal(true);
  };

  const handleAddToAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setShowAddToAlbumModal(true);
  };

  const handleSelectSongForAlbum = (songId: string, isSelected: boolean) => {
    if (!selectedAlbum) return;

    const updatedSongs = isSelected
      ? [...selectedAlbum.savedSongsUUIDs, songId]
      : selectedAlbum.savedSongsUUIDs.filter(id => id !== songId);

    setSelectedAlbum({
      ...selectedAlbum,
      savedSongsUUIDs: updatedSongs
    });
  };

  const confirmAddToAlbum = () => {
    if (!selectedAlbum) return;

    setAlbums(albums.map(a => 
      a.uuid === selectedAlbum.uuid ? selectedAlbum : a
    ));
    setShowAddToAlbumModal(false);
    setSelectedAlbum(null);
  };

  const handleDeleteAlbum = (albumId: string) => {
    setItemToDelete({ type: 'album', id: albumId });
    setShowDeleteConfirmation(true);
  };

  // Подтверждение удаления
  const confirmDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'song') {
      setSongs(songs.filter(s => s.uuid !== itemToDelete.id));
      setAlbums(albums.map(album => ({
        ...album,
        savedSongsUUIDs: album.savedSongsUUIDs.filter(id => id !== itemToDelete.id)
      })));
    } else {
      setAlbums(albums.filter(a => a.uuid !== itemToDelete.id));
    }

    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Моя музыка</h1>

      {/* Секция треков */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2>Мои треки</h2>
          {isAuthor && (
            <button 
              className={s.addButton}
              onClick={() => {
                setEditingSong(null);
                setNewSong({ name: '', tags: [], urlImage: '' });
                setSelectedFile(null);
                setShowSongModal(true);
              }}
            >
              <FiPlus size={20} /> Добавить трек
            </button>
          )}
        </div>

        <div className={s.controls}>
          <input
            type="text"
            placeholder="Поиск треков..."
            value={songSearchQuery}
            onChange={(e) => setSongSearchQuery(e.target.value)}
            className={s.searchInput}
          />
          <div className={s.sortControls}>
            <select
              value={songSortField}
              onChange={(e) => setSongSortField(e.target.value as 'name' | 'date')}
              className={s.sortSelect}
            >
              <option value="name">По названию</option>
              <option value="date">По дате</option>
            </select>
            <button
              onClick={() => setSongSortDirection(songSortDirection === 'asc' ? 'desc' : 'asc')}
              className={s.sortButton}
            >
              {songSortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <div className={s.list}>
          {songPaginated.length > 0 ? (
            songPaginated.map(song => {
              const file = files.find(f => f.uuid === song.fileUUID);
              return (
                <TrackRow 
                  key={song.uuid}
                  song={song} 
                  currentSong={null} 
                  isPlaying={false} 
                  onPlay={() => {}} 
                  onPause={() => {}}
                  onArtistClick={() => {}}
                  index={0}
                  users={[currentUser]}
                //   showActions={true}
                  onEdit={() => handleEditSong(song)}
                  onDelete={() => handleDeleteSong(song.uuid)}
                //   fileExtension={file?.extension}
                />
              );
            })
          ) : (
            <div className={s.emptyState}>
              <FiMusic size={48} className={s.emptyIcon} />
              <p>У вас пока нет треков</p>
            </div>
          )}
        </div>

        {songTotalPages > 1 && (
          <div className={s.pagination}>
            <button
              disabled={songCurrentPage === 1}
              onClick={() => setSongCurrentPage(songCurrentPage - 1)}
              className={s.paginationButton}
            >
              <FiChevronLeft size={18} />
            </button>
            <span>
              Страница {songCurrentPage} из {songTotalPages}
            </span>
            <button
              disabled={songCurrentPage === songTotalPages}
              onClick={() => setSongCurrentPage(songCurrentPage + 1)}
              className={s.paginationButton}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Секция альбомов */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2>Мои альбомы</h2>
          {isAuthor && (
            <button 
              className={s.addButton}
              onClick={() => {
                setEditingAlbum(null);
                setNewAlbum({ name: '', savedSongsUUIDs: [], urlImage: '' });
                setShowAlbumModal(true);
              }}
            >
              <FiPlus size={20} /> Добавить альбом
            </button>
          )}
        </div>

        <div className={s.controls}>
          <input
            type="text"
            placeholder="Поиск альбомов..."
            value={albumSearchQuery}
            onChange={(e) => setAlbumSearchQuery(e.target.value)}
            className={s.searchInput}
          />
          <div className={s.sortControls}>
            <select
              value={albumSortField}
              onChange={(e) => setAlbumSortField(e.target.value as 'name' | 'date')}
              className={s.sortSelect}
            >
              <option value="name">По названию</option>
              <option value="date">По дате</option>
            </select>
            <button
              onClick={() => setAlbumSortDirection(albumSortDirection === 'asc' ? 'desc' : 'asc')}
              className={s.sortButton}
            >
              {albumSortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <div className={s.albumGrid}>
          {albumPaginated.length > 0 ? (
            albumPaginated.map(album => (
              <div key={album.uuid} className={s.albumCard}>
                <div className={s.albumImage}>
                  {album.urlImage ? (
                    <img src={album.urlImage} alt={album.name} />
                  ) : (
                    <FiMusic size={48} />
                  )}
                </div>
                <div className={s.albumInfo}>
                  <h3>{album.name}</h3>
                  <p>{album.savedSongsUUIDs.length} треков</p>
                </div>
                {isAuthor && (
                  <div className={s.albumActions}>
                    <button 
                      className={s.albumActionButton}
                      onClick={() => handleEditAlbum(album)}
                    >
                      <FiEdit size={16} />
                    </button>
                    <button 
                      className={s.albumActionButton}
                      onClick={() => handleAddToAlbum(album)}
                    >
                      <FiPlus size={16} />
                    </button>
                    <button 
                      className={s.albumActionButton}
                      onClick={() => handleDeleteAlbum(album.uuid)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={s.emptyState}>
              <FiMusic size={48} className={s.emptyIcon} />
              <p>У вас пока нет альбомов</p>
            </div>
          )}
        </div>

        {albumTotalPages > 1 && (
          <div className={s.pagination}>
            <button
              disabled={albumCurrentPage === 1}
              onClick={() => setAlbumCurrentPage(albumCurrentPage - 1)}
              className={s.paginationButton}
            >
              <FiChevronLeft size={18} />
            </button>
            <span>
              Страница {albumCurrentPage} из {albumTotalPages}
            </span>
            <button
              disabled={albumCurrentPage === albumTotalPages}
              onClick={() => setAlbumCurrentPage(albumCurrentPage + 1)}
              className={s.paginationButton}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Модальное окно для трека */}
      <Modal 
        isOpen={showSongModal} 
        onClose={() => setShowSongModal(false)}
        title={editingSong ? 'Редактировать трек' : 'Добавить трек'}
      >
        <div className={s.modalContent}>
          <div className={s.formGroup}>
            <label>Название трека</label>
            <input
              type="text"
              value={newSong.name || ''}
              onChange={(e) => setNewSong({...newSong, name: e.target.value})}
              className={s.formInput}
            />
          </div>
          <div className={s.formGroup}>
            <label>Аудиофайл</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              onChange={handleFileChange}
              className={s.formInput}
            />
            {selectedFile && (
              <p className={s.fileInfo}>Выбран файл: {selectedFile.uuid} ({selectedFile.extension})</p>
            )}
            {editingSong && !selectedFile && (
              <p className={s.fileInfo}>Текущий файл: {editingSong.fileUUID}</p>
            )}
          </div>
          <div className={s.formGroup}>
            <label>Обложка (URL)</label>
            <input
              type="text"
              value={newSong.urlImage || ''}
              onChange={(e) => setNewSong({...newSong, urlImage: e.target.value})}
              className={s.formInput}
            />
          </div>
          <div className={s.formGroup}>
            <label>Теги (через запятую)</label>
            <input
              type="text"
              value={newSong.tags?.map(t => t.tagName).join(', ') || ''}
              onChange={(e) => {
                const tags = e.target.value.split(',').map(tag => 
                  new Tag({ uuid: `tag_${Date.now()}`, tagName: tag.trim() })
                );
                setNewSong({...newSong, tags});
              }}
              className={s.formInput}
            />
          </div>
          <div className={s.modalActions}>
            <button 
              className={s.cancelButton}
              onClick={() => setShowSongModal(false)}
            >
              Отмена
            </button>
            <button 
              className={s.saveButton}
              onClick={editingSong ? handleUpdateSong : handleAddSong}
              disabled={!newSong.name || (!editingSong && !selectedFile)}
            >
              {editingSong ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно для альбома */}
      <Modal 
        isOpen={showAlbumModal} 
        onClose={() => setShowAlbumModal(false)}
        title={editingAlbum ? 'Редактировать альбом' : 'Добавить альбом'}
      >
        <div className={s.modalContent}>
          <div className={s.formGroup}>
            <label>Название альбома</label>
            <input
              type="text"
              value={newAlbum.name || ''}
              onChange={(e) => setNewAlbum({...newAlbum, name: e.target.value})}
              className={s.formInput}
            />
          </div>
          <div className={s.formGroup}>
            <label>Обложка (URL)</label>
            <input
              type="text"
              value={newAlbum.urlImage || ''}
              onChange={(e) => setNewAlbum({...newAlbum, urlImage: e.target.value})}
              className={s.formInput}
            />
          </div>
          <div className={s.modalActions}>
            <button 
              className={s.cancelButton}
              onClick={() => setShowAlbumModal(false)}
            >
              Отмена
            </button>
            <button 
              className={s.saveButton}
              onClick={() => {
  if (editingAlbum) {
    handleEditAlbum(editingAlbum); // assuming editingAlbum is available in scope
  } else {
    handleAddAlbum(); // assuming handleAddAlbum doesn't need parameters
  }
}}
              disabled={!newAlbum.name}
            >
              {editingAlbum ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно для добавления треков в альбом */}
      <Modal 
        isOpen={showAddToAlbumModal} 
        onClose={() => setShowAddToAlbumModal(false)}
        title={`Добавить треки в альбом "${selectedAlbum?.name}"`}
      >
        <div className={s.modalContent}>
          <div className={s.songsList}>
            {songs.map(song => {
              const file = files.find(f => f.uuid === song.fileUUID);
              return (
                <div key={song.uuid} className={s.songItem}>
                  <label className={s.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={selectedAlbum?.savedSongsUUIDs.includes(song.uuid) || false}
                      onChange={(e) => 
                        handleSelectSongForAlbum(song.uuid, e.target.checked)
                      }
                      className={s.checkboxInput}
                    />
                    <span className={s.checkboxCustom}></span>
                    <div className={s.songInfo}>
                      <span className={s.songName}>{song.name}</span>
                      {file && (
                        <span className={s.songFileType}>{file.extension}</span>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
          <div className={s.modalActions}>
            <button 
              className={s.cancelButton}
              onClick={() => setShowAddToAlbumModal(false)}
            >
              Отмена
            </button>
            <button 
              className={s.saveButton}
              onClick={confirmAddToAlbum}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно подтверждения удаления */}
      <Modal 
        isOpen={showDeleteConfirmation} 
        onClose={() => setShowDeleteConfirmation(false)}
        title={`Удалить ${itemToDelete?.type === 'song' ? 'трек' : 'альбом'}?`}
        small
      >
        <div className={s.modalContent}>
          <p>Вы уверены, что хотите удалить {itemToDelete?.type === 'song' ? 'этот трек' : 'этот альбом'}? Это действие нельзя отменить.</p>
          <div className={s.modalActions}>
            <button 
              className={s.cancelButton}
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Отмена
            </button>
            <button 
              className={s.deleteButton}
              onClick={confirmDelete}
            >
              Удалить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MusicPage;