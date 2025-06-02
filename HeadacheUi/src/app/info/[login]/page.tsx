'use client';

import React from 'react';
import { mockAlbums, mockSongs, mockUsers } from '@/models/mockData';
import { TrackRow } from '@/components/track';
import AlbumCard from '@/components/album';
import { Song } from '@/models';

interface ArtistPageProps {
  params: {
    login: string;
  };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const [currentSong, setCurrentSong] = React.useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const artist = mockUsers.find(user => user.login === params.login);
  const artistSongs = mockSongs.filter(song => song.authorUUID === artist?.uuid);
  const artistAlbums = mockAlbums.filter(album => album.authorUUID === artist?.uuid);

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleArtistClick = (login: string) => {
    window.location.href = `/info/${login}`;
  };

  if (!artist) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl text-red-500">Artist not found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="mb-12 flex items-start gap-8">
        <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200">
          <img 
            src="https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg" 
            alt={artist.login}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{artist.login}</h1>
          <p className="text-gray-500 mb-2">Rating: {artist.avgRating?.toFixed(1)} ⭐</p>
          <p className="text-gray-500 mb-4">Member since: {new Date(artist.createdAt || '').toLocaleDateString()}</p>
          <p className="max-w-2xl">{artist.description}</p>
        </div>
      </header>

      {artistAlbums.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artistAlbums.map((album) => (
              <AlbumCard
                key={album.uuid}
                album={album}
                users={mockUsers}
                songs={mockSongs}
                onPlay={handlePlay}
                onPause={handlePause}
                onArtistClick={handleArtistClick}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Top Tracks</h2>
        <div className="space-y-2">
          {artistSongs.map((song, index) => (
            <TrackRow
              key={song.uuid}
              song={song}
              playlist={artistSongs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={(song, playlist, index) => handlePlay(song)}
              onPause={handlePause}
              onArtistClick={handleArtistClick}
              index={index}
              users={mockUsers}
            />
          ))}
        </div>
      </section>
    </div>
  );
} 