import React, { useEffect, useRef, useState } from 'react';
import s from './style.module.scss';

// type TrackStatus = 'approved' | 'pending' | 'rejected';

// interface Track {
//   id: string;
//   title: string;
//   artist: string;
//   coverUrl: string;
//   duration: string;
//   status: TrackStatus;
//   genre: string;
//   audioUrl: string;
// }

// const mockTracks: Track[] = [
//   {
//     id: '1',
//     title: 'Bohemian Rhapsody',
//     artist: 'Queen',
//     coverUrl: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
//     duration: '5:55',
//     status: 'approved',
//         audioUrl: 'https://example.com/audio1.mp3',
//     genre: 'Rock'
//   },
//   {
//     id: '2',
//     title: 'Blinding Lights',
//     artist: 'The Weeknd',
//     coverUrl: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/maxresdefault.jpg',
//     duration: '3:20',
//     status: 'pending',
//         audioUrl: 'https://example.com/audio1.mp3',
//     genre: 'Pop'
//   },
//   {
//     id: '3',
//     title: 'Starboy',
//     artist: 'The Weeknd ft. Daft Punk',
//     coverUrl: 'https://i.ytimg.com/vi/34Na4j8AVgA/maxresdefault.jpg',
//         audioUrl: 'https://example.com/audio1.mp3',
//     duration: '3:50',
//     status: 'rejected',
//     genre: 'Electronic'
//   }
// ];

// const TrackList = () => {
//     const [tracks, setTracks] = useState<Track[]>(mockTracks);
//     const [currentTrack, setCurrentTrack] = useState<string | null>(null);
//     const [progress, setProgress] = useState<{[key: string]: number}>({});
//     const audioRef = useRef<HTMLAudioElement | null>(null);
  
//     // Преобразуем длительность в секунды
//     const durationToSeconds = (duration: string) => {
//       const [minutes, seconds] = duration.split(':').map(Number);
//       return minutes * 60 + seconds;
//     };
  
//     // Воспроизведение трека
//     const handlePlay = (track: Track) => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
  
//       const audio = new Audio(track.audioUrl);
//       audioRef.current = audio;
//       setCurrentTrack(track.id);
  
//       audio.play().catch(error => {
//         console.error('Ошибка воспроизведения:', error);
//       });
  
//       audio.ontimeupdate = () => {
//         const currentProgress = (audio.currentTime / durationToSeconds(track.duration)) * 100;
//         setProgress(prev => ({...prev, [track.id]: currentProgress}));
//       };
  
//       audio.onended = () => {
//         setProgress(prev => ({...prev, [track.id]: 100}));
//         setCurrentTrack(null);
//       };
//     };
  
//     // Остановка при размонтировании
//     useEffect(() => {
//       return () => {
//         if (audioRef.current) {
//           audioRef.current.pause();
//         }
//       };
//     }, []);
  
//     // Остальные обработчики (approve, reject) остаются без изменений
  
//     return (
//       <div className={s.trackList}>
//         {/* Скрытый аудио элемент для управления воспроизведением */}
//         <audio ref={audioRef} />
  
//         {tracks.map(track => (
//           <div key={track.id} className={s.trackCard}>
//             <div className={s.trackCover}>
//               <img src={track.coverUrl} alt={track.title} />
//               <button 
//                 className={`${s.playButton} ${currentTrack === track.id ? s.playing : ''}`}
//                 onClick={() => handlePlay(track)}
//               >
//                 {currentTrack === track.id ? '❚❚' : '▶'}
//               </button>
//             </div>
  
//             {/* Прогресс-бар фиксированной ширины */}
           
  
//             <div className={s.trackInfo}>
//               <h3 className={s.title}>{track.title}</h3>
//               <p className={s.artist}>{track.artist}</p>
//               <div className={s.meta}>
//                 <span className={s.genre}>{track.genre}</span>
//                 <span className={s.duration}>{track.duration}</span>
//                 <span className={`${s.status} ${s[track.status]}`}>
//                   {track.status}
//                 </span>
//               </div>
//             </div>
//             <div className={s.progressBarContainer}>
//               <div 
//                 className={s.progressBar}
//                 style={{ width: `${progress[track.id] || 0}%` }}
//               />
//             </div>
//             {/* Кнопки действий */}
//             <div className={s.trackActions}>
//               <button className={`${s.actionBtn} ${s.approve}`}>✓ Одобрить</button>
//               <button className={`${s.actionBtn} ${s.reject}`}>✕ Отклонить</button>
//               <button className={`${s.actionBtn} ${s.details}`}>Подробнее</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default TrackList;



type TrackStatus = 'approved' | 'pending' | 'rejected';

interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  status: TrackStatus;
  genre: string[];
  audioUrl: string;
}

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    coverUrl: 'https://androidinsider.ru/wp-content/uploads/2019/07/Google-Photos-750x431.png',
    duration: '5:55',
    status: 'approved',
    genre: ['Electronic', 'Electronic', 'Electronic', 'Electronic', 'Electronic'],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    coverUrl: 'https://androidinsider.ru/wp-content/uploads/2019/07/Google-Photos-750x431.png',
    duration: '3:20',
    status: 'pending',
    genre: ['Electronic', 'Electronic', 'Electronic', 'Electronic', 'Electronic'],
     audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    coverUrl: 'https://androidinsider.ru/wp-content/uploads/2019/07/Google-Photos-750x431.png',
    duration: '3:50',
    status: 'rejected',
    genre: ['Electronic', 'Electronic', 'Electronic', 'Electronic', 'Electronic'],
    audioUrl: 'https://example.com/audio3.mp3'
  }
];
const WAVEFORM_BARS = 50; // Количество столбцов визуализации

const TrackList = () => {
  const [tracks] = useState<Track[]>(mockTracks);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [waveforms, setWaveforms] = useState<{[key: string]: number[]}>({});
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentTimes, setCurrentTimes] = useState<{[key: string]: string}>({});
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [durations, setDurations] = useState<{[key: string]: string}>({});

  // Анализ аудио для построения волны
  const analyzeAudio = (audioBuffer: AudioBuffer): number[] => {
    const channelData = audioBuffer.getChannelData(0);
    const samplesPerBar = Math.floor(channelData.length / WAVEFORM_BARS);
    const waveform: number[] = [];

    for (let i = 0; i < WAVEFORM_BARS; i++) {
      const start = i * samplesPerBar;
      const end = start + samplesPerBar;
      let sum = 0;

      for (let j = start; j < end; j++) {
        sum += Math.abs(channelData[j]);
      }

      const average = sum / samplesPerBar;
      waveform.push(Math.min(100, Math.floor(average * 200)));
    }

    return waveform;
  };

  // Загрузка и анализ трека
  const loadAndAnalyzeTrack = async (track: Track) => {
    console.log('fff')
    try {
      const response = await fetch(track.audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
   
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    //   setDurations(prev => ({
    //     ...prev,
    //     [track.id]: audioBuffer.duration
    //   }));
      const waveform = analyzeAudio(audioBuffer);
      
      setWaveforms(prev => ({...prev, [track.id]: waveform}));
    } catch (error) {
      console.error('Ошибка анализа аудио:', error);
      // Генерация случайной волны, если анализ не удался
      const randomWaveform = Array(WAVEFORM_BARS).fill(0).map(() => Math.floor(Math.random() * 50) + 10);
      setWaveforms(prev => ({...prev, [track.id]: randomWaveform}));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlay = async (track: Track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (currentTrack === track.id) {
        setCurrentTrack(null);
        return;
      }
    }

    // Если волна еще не загружена - загружаем
    if (!waveforms[track.id]) {
      await loadAndAnalyzeTrack(track);
    }

    const audio = new Audio(track.audioUrl);
    audioRef.current = audio;
    setCurrentTrack(track.id);
    setCurrentPosition(0);
    setCurrentTimes(prev => ({...prev, [track.id]: '0:00'}));

    try {
      await audio.play();

      const durationInSeconds = audio.duration;
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.floor(durationInSeconds % 60);
      const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      
      setDurations(prev => ({
        ...prev,
        [track.id]: formattedDuration
      }));
      
      audio.ontimeupdate = () => {
        const duration = audio.duration;
        const currentSeconds = audio.currentTime;
        setCurrentPosition((currentSeconds / duration) * 100);
        setCurrentTimes(prev => ({...prev, [track.id]: formatTime(currentSeconds)}));
      };

      audio.onended = () => {
        setCurrentTrack(null);
        setCurrentPosition(0);
      };
    } catch (error) {
      console.error('Ошибка воспроизведения:', error);
    }
  };

  // Преобразование времени в секунды
  const durationToSeconds = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className={s.trackList}>
    {tracks.map(track => (
      <div key={track.id} className={s.trackCard}>
        <div className={s.trackCover}>
          <img src={track.coverUrl} alt={track.title} />
          <button
            className={`${s.playButton} ${currentTrack === track.id ? s.playing : ''}`}
            onClick={() => handlePlay(track)}
          >
            {currentTrack === track.id ? '❚❚' : '▶'}
          </button>
        </div>
        <div className={s.trackInfo}>
          <h3 className={s.title}>{track.title}</h3>
          <p className={s.artist}>{track.artist}</p>
          <div className={s.meta}>
          <div className={s.genres}>
    {track.genre.map((g, index) => (
      <span key={index} className={s.genre}>
        {g}
      </span>
    ))}
  </div>
            {/* <span className={s.duration}>{track.duration}</span> */}
            {/* <span className={`${s.status} ${s[track.status]}`}>
              {track.status}
            </span> */}
          </div>
        </div>
        <div className={s.waveformContainer}>
          {waveforms[track.id] ? (
            <div className={s.waveform}>
              {waveforms[track.id].map((height, index) => (
                <div 
                  key={index} 
                  className={s.waveBar}
                  style={{
                    height: `${height}%`,
                    backgroundColor: currentTrack === track.id && 
                      (index / waveforms[track.id].length * 100 < currentPosition) 
                      ? '#610021' 
                      : '#ddd'
                  }}
                />
              ))}
            </div>
          ) : (
            <div className={s.waveformLoading}>Загрузка...</div>
          )}
          {currentTrack === track.id && (
            <div 
              className={s.playhead} 
              style={{ left: `${currentPosition}%` }}
            />
          )}
           <span className={s.duration}>{currentTimes[track.id] || '0:00'} | {durations[track.id] || '0:00'}</span> 
        </div>

       

        <div className={s.trackActions}>
  <button 
    className={`${s.actionBtn} ${s.approve}`}
    data-tooltip="Одобрить"
    aria-label="Одобрить трек"
  >
    <svg viewBox="0 0 24 24">
      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
  </button>
  
  <button 
    className={`${s.actionBtn} ${s.reject}`}
    data-tooltip="Отклонить"
    aria-label="Отклонить трек"
  >
    <svg viewBox="0 0 24 24">
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  </button>
  
  <button 
    className={`${s.actionBtn} ${s.details}`}
    data-tooltip="Подробнее"
    aria-label="Подробная информация"
  >
    <svg viewBox="0 0 24 24">
      <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
    </svg>
  </button>
</div>
      </div>
    ))}
  </div>
  );
};

export default TrackList;