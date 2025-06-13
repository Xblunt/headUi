// components/AlbumModal/AlbumModal.tsx
'use client';

import React from 'react';
import { Album, User, Song } from '@/models';
import s from './style.module.scss';
import TrackRow from '@/components/track';


interface AlbumModalProps {
  album: Album;
  artist?: User;
  onModal?: boolean;
  songs: Song[];
  onClose: () => void;
  onPlay: (song: Song) => void;
  onPause: () => void;
  onArtistClick: (login: string) => void;
}

const AlbumModal: React.FC<AlbumModalProps> = ({ 
  album, 
  artist, 
  songs, 
  onModal,
  onClose, 
  onPlay, 
  onPause,
  onArtistClick 
}) => {
  // Создаем fallback пользователя с минимальными данными
  const fallbackUser = new User({
    uuid: 'unknown',
    login: 'Unknown Artist',
    roles: ['ARTIST'],
    imgFileUUID: '',
    description: ''
  });

  // --- Локальный плеер для альбома ---
  const [currentSong, setCurrentSong] = React.useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setProgress(0);
      setDuration(0);
      setAudio(null);
    }
    if (currentSong) {
      const newAudio = new Audio(currentSong.url);
      setAudio(newAudio);

      const updateProgress = () => {
        setProgress(newAudio.currentTime);
        setDuration(newAudio.duration || 0);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      newAudio.addEventListener('timeupdate', updateProgress);
      newAudio.addEventListener('ended', handleEnded);

      if (isPlaying) newAudio.play();

      return () => {
        newAudio.pause();
        newAudio.removeEventListener('timeupdate', updateProgress);
        newAudio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSong]);

  React.useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  // Останавливать трек при закрытии модального окна
  React.useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentSong(null);
      setAudio(null);
    };
  }, []);

  const handleTrackPlayLocal = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (onPlay) onPlay(song);
  };

  const handleTrackPauseLocal = () => {
    setIsPlaying(false);
    if (onPause) onPause();
  };

  const handleClose = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSong(null);
    setAudio(null);
    onClose();
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <button
          className={s.closeButton}
          onClick={handleClose}
        >
          ×
        </button>
        
        <div className={s.modalHeader}>
          <img 
            src={album.urlImage || "https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg"}  
            alt={album.name}
            className={s.modalAlbumImage}
          />
          <div className={s.modalAlbumInfo}>
            <h2 className={s.modalAlbumTitle}>{album.name}</h2>
            <p 
              className={s.modalAlbumArtist}
              onClick={() => onArtistClick(artist?.login || 'unknown')}
            >
              {artist?.login || 'Unknown Artist'}
            </p>
            <p className={s.modalAlbumStats}>{songs.length} треков</p>
          </div>
        </div>

        <div className={s.modalTracks}>
          {songs.map((song, index) => (
            <TrackRow
              key={song.uuid}
              song={song}
              currentSong={currentSong}
              isPlaying={currentSong?.uuid === song.uuid && isPlaying}
              onPlay={handleTrackPlayLocal}
              onPause={handleTrackPauseLocal}
              isModal={onModal}
              onArtistClick={onArtistClick}
              index={index}
              users={[artist || fallbackUser]}
              progress={onModal ? currentSong?.uuid === song.uuid && duration > 0 ? (progress / duration) * 100 : 0 : undefined}
              showProgressBar={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;