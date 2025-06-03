import React from 'react';
import { Song } from '@/models';
import { Rating } from 'primereact/rating';
import s from './style.module.scss';

interface TrackInfoModalProps {
  visible: boolean;
  onHide: () => void;
  song: Song;
  artistName: string;
}

const TrackInfoModal: React.FC<TrackInfoModalProps> = ({ 
  visible, 
  onHide, 
  song, 
  artistName 
}) => {
  if (!visible) return null;

  return (
    <div className={s.modalOverlay} onClick={onHide}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h3>Track Information</h3>
          <button onClick={onHide} className={s.closeButton}>
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
        </div>
      </div>
    </div>
  );
};

export default TrackInfoModal;