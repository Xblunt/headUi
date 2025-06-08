'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Song } from '@/models';
import { User } from '@/models';
import s from './style.module.scss';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import RatingModal from '../raitingModal';

interface TrackRowProps {
  song: Song;
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onPause: () => void;
  onArtistClick: (login: string) => void;
  index: number;
  users: User[];
  onEdit?: () => void;
  onDelete?: () => void;
  showProgressBar?: boolean;
  useGlobalPlayer?: boolean;
  onProgressChange?: (progress: number) => void;
  progress?: number;
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
  onEdit,
  onDelete,
  showProgressBar = false,
  useGlobalPlayer = false,
  onProgressChange,
  progress = 0,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [isArtistHovered, setIsArtistHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);
  const [userRole, setUserRole] = useState<string | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const artistName = users.find(user => user.uuid === song.authorUUID)?.login || 'Unknown Artist';
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        if (user.startsWith('{')) {
          const userData = JSON.parse(user);
          setUserRole(userData.role || userData.label);
        } else {
          setUserRole(user);
        }
      } catch (e) {
        setUserRole(user);
      }
    }
  }, []);

  useEffect(() => {
    if (!isDragging) {
      setLocalProgress(progress);
    }
  }, [progress, isDragging]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleRatingSubmit = (selectedRating: number | null) => {
    setRating(selectedRating);
    setShowRatingModal(false);
  };

  const handlePlayPause = () => {
    if (useGlobalPlayer) {
      if (!(currentSong?.uuid === song.uuid && isPlaying)) {
        onPlay(song);
      }
    } else {
      if (currentSong?.uuid === song.uuid && isPlaying) {
        onPause();
      } else {
        onPlay(song);
      }
    }
    setShowPlayIcon(true);
    setTimeout(() => {
      setShowPlayIcon(false);
    }, 5000);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = Math.min(Math.max((clickPosition / rect.width) * 100, 0), 100);
    setLocalProgress(newProgress);
    onProgressChange?.(newProgress);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDrag = (e: MouseEvent) => {
    if (!progressBarRef.current || !isDragging) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = Math.min(Math.max((clickPosition / rect.width) * 100, 0), 100);
    setLocalProgress(newProgress);
  };

  const handleDragEnd = (e: MouseEvent) => {
    if (!progressBarRef.current || !isDragging) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = Math.min(Math.max((clickPosition / rect.width) * 100, 0), 100);
    setLocalProgress(newProgress);
    onProgressChange?.(newProgress);
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const isCurrentSongPlaying = currentSong?.uuid === song.uuid && isPlaying;

  const renderActionButtons = () => {
    if (userRole === 'label78') {
      return (
        <>
          <div className={s.trackDuration}>3:45</div>
        </>
      );
    } else if (userRole === 'author111') {
      return (
        <>
          <button
            className={s.actionButton}
            onClick={e => {
              e.stopPropagation();
              onEdit?.();
            }}
          >
            <FiEdit size={18} />
          </button>
          <button
            className={s.actionButton}
            onClick={e => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <FiTrash2 size={18} />
          </button>
          <div className={s.trackDuration}>3:45</div>
        </>
      );
    } else {
      return (
        <>
          <button
            className={`${s.favoriteButton} ${isFavorite ? s.favorited : ''}`}
            onClick={toggleFavorite}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d={
                  isFavorite
                    ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                }
              />
            </svg>
          </button>
          <button
            className={s.ratingButton}
            onClick={e => {
              e.stopPropagation();
              setShowRatingModal(true);
            }}
          >
            {rating !== null ? (
              <span className={s.ratingValue}>{rating.toFixed(1)}</span>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            )}
          </button>
          <div className={s.trackDuration}>3:45</div>
        </>
      );
    }
  };

  return (
    <div
      className={`${s.trackRow} ${currentSong?.uuid === song.uuid ? s.active : ''}`}
      onClick={handlePlayPause}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showProgressBar && (
        <div
          className={s.progressBarContainer}
          onClick={handleProgressClick}
          ref={progressBarRef}
        >
          <div
            className={s.progressBar}
            style={{ width: `${localProgress}%` }}
          >
            <div
              className={s.progressHandle}
              onMouseDown={handleDragStart}
              style={{ left: `${localProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className={s.trackInfo}>
        <div className={s.trackImage}>
          <img
            src={song.urlImage || 'https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg'}
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
        </div>
        <div className={s.trackDetails}>
          <h4 className={s.trackTitle}>{song.name}</h4>
          <p
            className={`${s.trackArtist} ${isArtistHovered ? s.artistHovered : ''}`}
            onClick={e => {
              e.stopPropagation();
              onArtistClick(artistName);
            }}
            onMouseEnter={() => setIsArtistHovered(true)}
            onMouseLeave={() => setIsArtistHovered(false)}
          >
            {artistName}
          </p>
        </div>
      </div>
      <div className={s.trackActions}>
        {renderActionButtons()}
      </div>
      {showRatingModal && (
        <RatingModal
          songName={song.name}
          currentRating={rating}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
};

export default TrackRow;