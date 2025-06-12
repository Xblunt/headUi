'use client';

import s from './style.module.scss';

const PlaylistSchemePage = () => {
  return (
    <div className={s.playlistPage}>
      {/* Player */}
      <div className={s.player}>
        <div className={s.playerOverlay}>
          <div className={s.playerInfo}>
            <div className={s.trackTitle}>[ Название трека ]</div>
            <div className={s.trackArtist}>[ Артист ]</div>
            <div className={s.progressContainer}>
              <div className={s.progressBar} style={{ width: '40%' }} />
              <div className={s.timeInfo}>
                <span>[ 1:23 ]</span>
                <span>[ 3:45 ]</span>
              </div>
            </div>
            <div className={s.playerControls}>
              <button className={s.controlButton}> ◀◀ </button>
              <button className={s.playButton}> ▶ </button>
              <button className={s.controlButton}> ▶▶ </button>
            </div>
          </div>
        </div>
      </div>
      {/* Tracks */}
      <div className={s.tracksWrapper}>
        <div className={s.searchContainer}>
          <div className={s.searchInput}>[ Поиск... ]</div>
        </div>
        <button className={`${s.navButton} ${s.leftButton}`}> &lt; </button>
        <div className={s.tracksContainer}>
          {[...Array(6)].map((_, colIdx) => (
            <div key={colIdx} className={s.tracksColumn}>
              {[...Array(4)].map((_, rowIdx) => (
                <div key={rowIdx} className={s.track}>
                  <div className={s.trackImage}>
                    {/* <div className={s.trackThumbnail}>[ Обложка ]</div> */}
                    <div className={s.playPauseOverlay}> ▶ </div>
                  </div>
                  <div className={s.trackInfo}>
                    <div className={s.trackTitle}>[ Название ]</div>
                    <div className={s.trackArtist}>[ Артист ]</div>
                  </div>
                  <div className={s.trackActions}>
                    <button className={s.favoriteButton}> ♡ </button>
                    <span className={s.trackDuration}>[ 3:45 ]</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className={`${s.navButton} ${s.rightButton}`}> &gt; </button>
      </div>
    </div>
  );
};

export default PlaylistSchemePage;
