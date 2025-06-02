// // // stores/playerStore.ts
// // import { create } from 'zustand';

// // interface PlayerState {
// //   currentTrack: Track | null;
// //   isPlaying: boolean;
// //   play: (track: Track) => void;
// //   pause: () => void;
// //   togglePlay: () => void;
// // }

// // export const usePlayerStore = create<PlayerState>((set: any) => ({
// //   currentTrack: null,
// //   isPlaying: false,
// //   play: (track: any) => set({ currentTrack: track, isPlaying: true }),
// //   pause: () => set({ isPlaying: false }),
// //   togglePlay: () => set((state: any) => ({ isPlaying: !state.isPlaying })),
// // }));

// // interface Track {
// //   id: string;
// //   title: string;
// //   artist: string;
// //   audioSrc: string;
// //   coverImage?: string;
// // }

// // stores/playerStore.ts
// import { create } from 'zustand';
// import { Song } from '@/models';

// interface PlayerState {
//   currentSong: Song | null;
//   playlist: Song[];
//   currentIndex: number;
//   isPlaying: boolean;
//   setPlaylist: (playlist: Song[], index: number) => void;
//   play: () => void;
//   pause: () => void;
//   togglePlay: () => void;
//   next: () => void;
//   prev: () => void;
// }

// export const usePlayerStore = create<PlayerState>((set, get) => ({
//   currentSong: null,
//   playlist: [],
//   currentIndex: 0,
//   isPlaying: false,
  
//   setPlaylist: (playlist, index) => set({ 
//     playlist, 
//     currentIndex: index, 
//     currentSong: playlist[index],
//     isPlaying: true 
//   }),
  
//   play: () => set({ isPlaying: true }),
//   pause: () => set({ isPlaying: false }),
//   togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),
  
//   next: () => {
//     const { playlist, currentIndex } = get();
//     if (playlist.length === 0) return;
    
//     const nextIndex = (currentIndex + 1) % playlist.length;
//     set({ 
//       currentIndex: nextIndex,
//       currentSong: playlist[nextIndex],
//       isPlaying: true
//     });
//   },
  
//   prev: () => {
//     const { playlist, currentIndex } = get();
//     if (playlist.length === 0) return;
    
//     const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
//     set({ 
//       currentIndex: prevIndex,
//       currentSong: playlist[prevIndex],
//       isPlaying: true
//     });
//   }
// }));

import { create } from 'zustand';
import { Song } from '@/models';

interface PlayerState {
  currentSong: Song | null;
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  setPlaylist: (playlist: Song[], index: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  
  setPlaylist: (playlist, index) => set({ 
    playlist, 
    currentIndex: index, 
    currentSong: playlist[index],
    isPlaying: true 
  }),
  
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),
  
  next: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    set({ 
      currentIndex: nextIndex,
      currentSong: playlist[nextIndex],
      isPlaying: true
    });
  },
  
  prev: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    set({ 
      currentIndex: prevIndex,
      currentSong: playlist[prevIndex],
      isPlaying: true
    });
  }
}));