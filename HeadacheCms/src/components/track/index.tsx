'use client';

import React, { useState, useEffect } from 'react';
import { Song } from '@/models';
import { User } from '@/models';
import { Rating } from 'primereact/rating';
import s from './style.module.scss';

interface TrackRowProps {
  song: Song;
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onPause: () => void;
  onArtistClick: (login: string) => void;
  index: number;
  users: User[];
  onApprove?: (songId: string) => void;
  onReject?: (songId: string) => void;
  onUpdate?: (song: Song) => void;
  onInfo?: (song: Song) => void;
  currentTime?: number;
  duration?: number;
}

const TrackRow: React.FC<TrackRowProps> = ({ 
  song, 
  currentSong, 
  isPlaying, 
  onPlay, 
  onPause,
  onArtistClick,
  index,
  users,
  onApprove,
  onReject,
  onUpdate,
  onInfo,
  currentTime = 0,
  duration = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [progress, setProgress] = useState(0);

  const artistName = users.find(user => user.uuid === song.authorUUID)?.login || 'Unknown Artist';
  const isCurrentSongPlaying = currentSong?.uuid === song.uuid && isPlaying;

  useEffect(() => {
    if (isCurrentSongPlaying && duration > 0) {
      const newProgress = (currentTime / duration) * 100;
      setProgress(Math.min(newProgress, 100));
    } else if (!isPlaying) {
      setProgress(0);
    }
  }, [currentTime, duration, isCurrentSongPlaying, isPlaying]);

  const handlePlayPause = () => {
    if (isCurrentSongPlaying) {
      onPause();
    } else {
      onPlay(song);
      setShowPlayIcon(true);
      setTimeout(() => setShowPlayIcon(false), 5000);
    }
  };

  return (
    <>
      <div
        className={`${s.trackRow} ${currentSong?.uuid === song.uuid ? s.active : ''}`}
        onClick={handlePlayPause}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={s.trackInfo}>
          <div className={s.trackImage}>
            <img
              src={song.urlImage || 'https://via.placeholder.com/50'}
              alt={song.name}
              className={`${s.trackThumbnail} ${
                (isHovered || isCurrentSongPlaying || showPlayIcon) ? s.imageActive : ''
              }`}
            />
            {(isHovered || isCurrentSongPlaying || showPlayIcon) && (
              <div className={s.playPauseOverlay}>
                {isCurrentSongPlaying ? (
                  <span className={s.pauseIcon}>❚❚</span>
                ) : (
                  <span className={s.playIcon}>▶</span>
                )}
              </div>
            )}
            <div className={s.trackProgress}>
              <div
                className={s.progressBar}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className={s.trackDetails}>
            <h4 className={s.trackTitle}>{song.name}</h4>
            <p
              className={s.trackArtist}
              onClick={e => {
                e.stopPropagation();
                onArtistClick(artistName);
              }}
            >
              {artistName}
            </p>
            {Array.isArray(song.tags) && song.tags.length > 0 && (
              <ul className={s.trackTagsList}>
                {song.tags.map((tag, idx) => (
                  <li key={typeof tag === "string" ? tag : tag.tagName || idx} className={s.trackTagItem}>
                    <span className={s.trackTagOval}>
                      {typeof tag === "string" ? tag : tag.tagName}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={s.trackActions}>
            <div className={s.rating}>
              <Rating
                value={song.avgRating || 0}
                readOnly
                stars={10}
                cancel={false}
                className={s.ratingStars}
              />
              <span className={s.ratingValue}>{song.avgRating?.toFixed(1) || '0.0'}</span>
            </div>

            {onApprove && (
              <button
                className={`${s.actionButton} ${s.approveButton}`}
                onClick={e => {
                  e.stopPropagation();
                  onApprove(song.uuid);
                }}
                title="Одобрить"
              >
                <i className="pi pi-check"></i>
              </button>
            )}

            {onReject && (
              <button
                className={`${s.actionButton} ${s.rejectButton}`}
                onClick={e => {
                  e.stopPropagation();
                  onReject(song.uuid);
                }}
                title="Отклонить"
              >
                <i className="pi pi-times"></i>
              </button>
            )}

            {onUpdate && (
              <button
                className={`${s.actionButton} ${s.editButton}`}
                onClick={e => {
                  e.stopPropagation();
                  onUpdate(song);
                }}
                title="Редактировать"
              >
                <i className="pi pi-pencil"></i>
              </button>
            )}

            <button
              className={`${s.actionButton} ${s.infoButton}`}
              onClick={e => {
                e.stopPropagation();
                if (onInfo) {
                  onInfo(song);
                }
              }}
              title="Инфо"
            >
              <i className="pi pi-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackRow;