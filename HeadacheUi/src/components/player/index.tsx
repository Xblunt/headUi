'use client';

import { usePlayerStore } from '@/stores/playerStore';
import { useEffect, useRef, useState } from 'react';
import { User } from '@/models';
import s from './style.module.scss';

const getArtistName = (authorUUID: string, users: User[]) => {
  return users.find(user => user.uuid === authorUUID)?.login || 'Unknown Artist';
};

export const GlobalPlayer = () => {
  const {
    currentSong,
    playlist,
    isPlaying,
    togglePlay,
    next,
    prev,
    currentIndex
  } = usePlayerStore();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const updateProgress = () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
      }
    };

    const updateDuration = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration || 0);
      }
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('loadedmetadata', updateDuration);
    audioRef.current.addEventListener('ended', next);

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Play error:", e));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('loadedmetadata', updateDuration);
        audioRef.current.removeEventListener('ended', next);
      }
    };
  }, [isPlaying, currentSong, next]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentSong) return null;

  return (
    <div className={s.player}>
      <div className={s.playerContainer}>
        <div className={s.trackInfo}>
          <h4 className={s.trackTitle}>{currentSong.name}</h4>
          <p className={s.trackArtist}>
            {getArtistName(currentSong.authorUUID, [])}
          </p>
        </div>
        
        <div className={s.playerControls}>
          <button 
            onClick={prev} 
            className={s.controlButton}
            disabled={playlist.length <= 1 || currentIndex <= 0}
          >
            ⏮
          </button>
          <button 
            onClick={togglePlay} 
            className={s.playButton}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button 
            onClick={next} 
            className={s.controlButton}
            disabled={playlist.length <= 1 || currentIndex >= playlist.length - 1}
          >
            ⏭
          </button>
        </div>
        
        <div className={s.progressContainer}>
          <div className={s.progressBar} onClick={handleSeek}>
            <div 
              className={s.progress} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <audio
          ref={audioRef}
          src={currentSong.url}
          hidden
        />
      </div>
    </div>
  );
};