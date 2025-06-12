// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { Song } from '@/models';
// import s from './style.module.scss';

// interface GlobalPlayerProps {
//   currentSong: Song | null;
//   isPlaying: boolean;
//   progress: number; // 0-100
//   duration: number; // seconds
//   currentTime: number; // seconds
//   volume: number; // 0-1
//   onPlayPause: () => void;
//   onProgressChange: (progress: number) => void;
//   onNext?: () => void;
//   onPrev?: () => void;
//   onVolumeChange: (volume: number) => void;
// }

// export const GlobalPlayer: React.FC<GlobalPlayerProps> = ({
//   currentSong,
//   isPlaying,
//   progress,
//   duration,
//   currentTime,
//   volume,
//   onPlayPause,
//   onProgressChange,
//   onNext,
//   onPrev,
//   onVolumeChange,
// }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [localProgress, setLocalProgress] = useState(progress);
//   const progressBarRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!isDragging) {
//       setLocalProgress(progress);
//     }
//   }, [progress, isDragging]);

//   const handleProgressClick = (e: React.MouseEvent) => {
//     if (!progressBarRef.current) return;
//     const rect = progressBarRef.current.getBoundingClientRect();
//     const clickPosition = e.clientX - rect.left;
//     const newProgress = Math.min(Math.max((clickPosition / rect.width) * 100, 0), 100);
//     setLocalProgress(newProgress);
//     onProgressChange(newProgress);
//   };

//   const handleDragStart = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     document.addEventListener('mousemove', handleDrag);
//     document.addEventListener('mouseup', handleDragEnd);
//   };

//   const handleDrag = (e: MouseEvent) => {
//     if (!progressBarRef.current || !isDragging) return;
//     const rect = progressBarRef.current.getBoundingClientRect();
//     const clickPosition = e.clientX - rect.left;
//     const newProgress = Math.min(Math.max((clickPosition / rect.width) * 100, 0), 100);
//     setLocalProgress(newProgress);
//   };

//   const handleDragEnd = (e: MouseEvent) => {
//     if (!progressBarRef.current || !isDragging) return;
//     const rect = progressBarRef.current.getBoundingClientRect();
//     const clickPosition = e.clientX - rect.left;
//     const newProgress = Math.min(Math.max((clickPosition / rect.width) * 100, 0), 100);
//     setLocalProgress(newProgress);
//     onProgressChange(newProgress);
//     setIsDragging(false);
//     document.removeEventListener('mousemove', handleDrag);
//     document.removeEventListener('mouseup', handleDragEnd);
//   };

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   return (
//     <div className="content">
//       <div
//         className={s.globalPlayerBar}
//         style={{
//           position: 'fixed',
//           left: 0,
//           right: 0,
//           bottom: 10,
//           width: '100vw',
//           zIndex: 2000,
//           display: 'flex',
//           justifyContent: 'center',
//           pointerEvents: currentSong ? 'auto' : 'none',
//           paddingLeft: '20px',
//           paddingRight: '20px',
//           boxSizing: 'border-box',
//         }}
//       >
//         <div
//           className={s.globalPlayerContent}
//           style={{
//             width: '100%',
//             maxWidth: '100vw',
//             borderRadius: 4,
//             background: 'rgba(51,51,51,0.92)',
//             boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 24,
//             minHeight: 72,
//             padding: '12px 24px',
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
//             <img
//               className={s.playerImage}
//               src={currentSong?.urlImage ? currentSong.urlImage : undefined}
//               alt={currentSong?.name || ''}
//               style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: 6,
//                 objectFit: 'cover',
//                 background: '#222',
//                 flexShrink: 0,
//               }}
//             />
//             <div className={s.songInfo} style={{ minWidth: 0 }}>
//               <div className={s.songTitle} style={{ color: '#fff', fontWeight: 600, fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {currentSong?.name || 'Не выбран трек'}
//               </div>
//               <div className={s.songArtist} style={{ color: '#bbb', fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {currentSong?.authorUUID || ''}
//               </div>
//             </div>
//           </div>
//           <div className={s.playerControls} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, justifyContent: 'center' }}>
//             <button className={s.controlButton} onClick={onPrev} aria-label="Prev">
//               <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
//                 <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" fill="currentColor"/>
//               </svg>
//             </button>
//             <button className={s.playPauseButton} onClick={onPlayPause} aria-label="Play/Pause">
//               {isPlaying ? (
//                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
//                   <rect x="6" y="5" width="4" height="14" fill="#fff"/>
//                   <rect x="14" y="5" width="4" height="14" fill="#fff"/>
//                 </svg>
//               ) : (
//                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
//                   <polygon points="8,5 8,19 19,12" fill="#fff"/>
//                 </svg>
//               )}
//             </button>
//             <button className={s.controlButton} onClick={onNext} aria-label="Next">
//               <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
//                 <path d="M16 18h2V6h-2v12zm-4-6l-8.5 6V6l8.5 6z" fill="currentColor"/>
//               </svg>
//             </button>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 2, minWidth: 0 }}>
//             <span style={{ color: '#bbb', fontSize: 15, minWidth: 48, textAlign: 'right' }}>{formatTime(currentTime)}</span>
//             <div
//               className={s.progressBarContainer}
//               ref={progressBarRef}
//               style={{
//                 flex: 1,
//                 height: 8,
//                 background: 'rgba(255,255,255,0.18)',
//                 borderRadius: 4,
//                 cursor: 'pointer',
//                 position: 'relative',
//                 minWidth: 80,
//                 maxWidth: 420,
//               }}
//               onClick={handleProgressClick}
//               onMouseDown={handleDragStart}
//             >
//               <div
//                 className={s.progressBar}
//                 style={{
//                   width: `${localProgress}%`,
//                   height: '100%',
//                   background: '#7c192a',
//                   borderRadius: 4,
//                   transition: isDragging ? 'none' : 'width 0.1s linear',
//                   position: 'absolute',
//                   left: 0,
//                   top: 0,
//                 }}
//               />
//             </div>
//             <span style={{ color: '#bbb', fontSize: 15, minWidth: 48, textAlign: 'left' }}>{formatTime(duration)}</span>
//           </div>
//           <div style={{ minWidth: 110, marginLeft: 24 }}>
//             <input
//               type="range"
//               min={0}
//               max={1}
//               step={0.01}
//               value={volume}
//               onChange={e => onVolumeChange(Number(e.target.value))}
//               className={s.volumeSlider}
//               style={{
//                 width: 110,
//                 accentColor: '#7c192a',
//                 verticalAlign: 'middle',
//               }}
//               title="Громкость"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };