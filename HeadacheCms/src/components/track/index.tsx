'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  currentTime?: number; // Add current time prop
  duration?: number; // Add duration prop
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
  currentTime = 0,
  duration = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [isArtistHovered, setIsArtistHovered] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const artistName = users.find(user => user.uuid === song.authorUUID)?.login || 'Unknown Artist';
  const isCurrentSongPlaying = currentSong?.uuid === song.uuid && isPlaying;

  useEffect(() => {
    // Calculate progress when currentTime or duration changes
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
              className={`${s.trackArtist} ${isArtistHovered ? s.artistHovered : ''}`}
              onClick={(e) => {
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
              className={s.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                onApprove(song.uuid);
              }}
              title="Approve"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
            </button>
          )}
          
          {onReject && (
            <button 
              className={s.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                onReject(song.uuid);
              }}
              title="Reject"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          )}
          
          {onUpdate && (
            <button 
              className={s.actionButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              title="Edit"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
              </svg>
            </button>
          )}
          
          <button 
            className={s.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              setShowInfoModal(true);
            }}
            title="Info"
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </button>
        </div>
      </div>

      {showInfoModal && (
        <div className={s.modalOverlay} onClick={() => setShowInfoModal(false)}>
          <div className={s.modalContent} onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h3>Track Information</h3>
              <button onClick={() => setShowInfoModal(false)} className={s.closeButton}>
                &times;
              </button>
            </div>
            <div className={s.modalBody}>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Title:</span>
                <span className={s.infoValue}>{song.name}</span>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Artist:</span>
                <span className={s.infoValue}>{artistName}</span>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Rating:</span>
                <div className={s.infoValue}>
                  <Rating 
                    value={song.avgRating || 0} 
                    readOnly 
                    stars={10} 
                    cancel={false}
                  />
                  <span>({song.avgRating?.toFixed(1) || '0.0'})</span>
                </div>
              </div>
              <div className={s.infoRow}>
                <span className={s.infoLabel}>Status:</span>
                <span className={s.infoValue}>{song.status}</span>
              </div>
              {isCurrentSongPlaying && (
                <div className={s.infoRow}>
                  <span className={s.infoLabel}>Progress:</span>
                  <div className={s.infoValue}>
                    <div className={s.progressContainer}>
                      <div 
                        className={s.progressBar} 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className={s.timeLabel}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className={s.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div className={s.modalContent} onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h3>Edit Track</h3>
              <button onClick={() => setShowEditModal(false)} className={s.closeButton}>
                &times;
              </button>
            </div>
            <div className={s.modalBody}>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Title:</label>
                <input
                  type="text"
                  value={song.name}
                  readOnly
                  className={s.formInput}
                />
              </div>
              <div className={s.formGroup}>
                <label className={s.formLabel}>Artist:</label>
                <input
                  type="text"
                  value={artistName}
                  readOnly
                  className={s.formInput}
                />
              </div>
            </div>
            <div className={s.modalFooter}>
              <button onClick={() => setShowEditModal(false)} className={s.cancelButton}>
                Cancel
              </button>
              <button onClick={() => {
                if (onUpdate) onUpdate(song);
                setShowEditModal(false);
              }} className={s.saveButton}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to format time (seconds to MM:SS)
function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default TrackRow;