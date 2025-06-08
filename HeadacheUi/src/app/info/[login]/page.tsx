'use client';

import React, { useState } from 'react';
import { mockAlbums } from '@/mocks/mockAlbums';
import { mockSongs } from '@/mocks/mockSongs';
import { mockUsers } from '@/mocks/mockUsers';
import TrackRow from '@/components/track';
import AlbumCard from '@/components/album';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';

interface ArtistPageProps {
  params: {
    login: string;
  };
}

const statisticsByLogin: Record<string, { plays: number; likes: number; followers: number; albums: number }> = {
  author111: { plays: 12345, likes: 2345, followers: 789, albums: 4 },
  artist2: { plays: 9876, likes: 876, followers: 321, albums: 2 },
  artist3: { plays: 5432, likes: 432, followers: 210, albums: 3 },
  artist4: { plays: 2222, likes: 333, followers: 111, albums: 1 },
  artist5: { plays: 8888, likes: 555, followers: 444, albums: 2 },
  artist6: { plays: 1111, likes: 222, followers: 333, albums: 1 },
  artist7: { plays: 4444, likes: 555, followers: 666, albums: 2 },
  artist8: { plays: 7777, likes: 888, followers: 999, albums: 3 },
  artist9: { plays: 1357, likes: 246, followers: 357, albums: 2 },
  artist10: { plays: 2468, likes: 135, followers: 864, albums: 1 },
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
  // Получаем логин из pathname, например: /info/author111
  const login = pathname?.split('/').pop() || '';
  const [showModal, setShowModal] = useState(false);
  const [requestMsg, setRequestMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracks' | 'albums'>('tracks');
  const [randomImg] = useState(() => `/albumImg/${Math.floor(Math.random() * 50) + 1}.jpg`);
  const artist = mockUsers.find(user => user.login === login);
  const artistSongs = mockSongs.filter(song => song.authorUUID === artist?.uuid);
  const artistAlbums = mockAlbums.filter(album => album.authorUUID === artist?.uuid);

  const statistics = getStatistics(login);

  const handleSendRequest = () => {
    setShowSuccess(true);
    setRequestMsg('');
    setTimeout(() => {
      setShowModal(false);
      setShowSuccess(false);
    }, 2000);
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
            <button
              className={styles.requestButton}
              onClick={() => setShowModal(true)}
            >
              Отправить заявку
            </button>
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
            <span className={styles.statLabel}>Прослушивания</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{statistics.likes}</span>
            <span className={styles.statLabel}>Лайки</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{statistics.followers}</span>
            <span className={styles.statLabel}>Подписчики</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{artistAlbums.length}</span>
            <span className={styles.statLabel}>Альбомы</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{artistSongs.length}</span>
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
                {artistSongs.length > 0 ? (
                  artistSongs.map((song, index) => (
                    <TrackRow
                      key={song.uuid}
                      song={song}
                      currentSong={null}
                      isPlaying={false}
                      onPlay={() => {}}
                      onPause={() => {}}
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
                      onPlay={() => {}}
                      onPause={() => {}}
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
      </div>
    </div>
  );
}