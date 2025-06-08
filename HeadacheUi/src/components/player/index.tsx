'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Song } from '@/models';
import s from './style.module.scss';

interface GlobalPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  onPlayPause: () => void;
  onProgressChange: (progress: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const GlobalPlayer: React.FC<GlobalPlayerProps> = ({
  currentSong,
  isPlaying,
  progress,
  onPlayPause,
  onProgressChange,
  onNext,
  onPrev,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) {
      setLocalProgress(progress);
    }
  }, [progress, isDragging]);

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newProgress = Math.min(Math.max((clickPosition / rect.width) * 100, 0), 100);
    
    setLocalProgress(newProgress);
    onProgressChange(newProgress);
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
    onProgressChange(newProgress);
    setIsDragging(false);
    
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  return (
    <div className={s.globalPlayer}>
      <div className={s.playerInfo}>
        <img
          className={s.playerImage}
          src={currentSong?.urlImage || '/default-cover.jpg'}
          alt={currentSong?.name || 'cover'}
        />
        <div className={s.songInfo}>
          <h4 className={s.songTitle}>{currentSong?.name || 'Не выбран трек'}</h4>
          <p className={s.songArtist}>{currentSong?.authorUUID || ''}</p>
        </div>
      </div>
      <div className={s.playerControls}>
        <button className={s.controlButton} onClick={onPrev} aria-label="Prev">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/>
          </svg>
        </button>
        <button className={s.playPauseButton} onClick={onPlayPause} aria-label="Play/Pause">
          {isPlaying ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="5" width="4" height="14" fill="#fff"/>
              <rect x="14" y="5" width="4" height="14" fill="#fff"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <polygon points="8,5 8,19 19,12" fill="#fff"/>
            </svg>
          )}
        </button>
        <button className={s.controlButton} onClick={onNext} aria-label="Next">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M16 18h2V6h-2v12zm-4-6l-8.5 6V6l8.5 6z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div className={s.progressBarContainer}>
        <div
          className={s.progressBar}
          style={{ width: `${localProgress}%` }}
        />
      </div>
    </div>
  );
};