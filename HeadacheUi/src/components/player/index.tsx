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
        {currentSong && (
          <>
            <img 
              src={currentSong.urlImage || 'https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg'} 
              alt={currentSong.name} 
              className={s.playerImage}
            />
            <div className={s.songInfo}>
              <h4 className={s.songTitle}>{currentSong.name}</h4>
              <p className={s.songArtist}>{currentSong.authorUUID || 'Unknown Artist'}</p>
            </div>
          </>
        )}
      </div>

      <div className={s.playerControls}>
        <button className={s.controlButton} onClick={onPrev}>
          ⏮
        </button>
        <button className={s.playPauseButton} onClick={onPlayPause}>
          {isPlaying ? '⏸' : '⏵'}
        </button>
        <button className={s.controlButton} onClick={onNext}>
          ⏭
        </button>
      </div>

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
    </div>
  );
};