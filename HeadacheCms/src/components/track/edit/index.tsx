import React, { useState } from 'react';
import { Song } from '@/models';
import s from './style.module.scss';

interface TrackEditModalProps {
  visible: boolean;
  onHide: () => void;
  song: Song;
  artistName: string;
  onSave: (song: Song) => void;
}

const TrackEditModal: React.FC<TrackEditModalProps> = ({ 
  visible, 
  onHide, 
  song, 
  artistName,
  onSave 
}) => {
  const [editedSong, setEditedSong] = useState<Song>({ ...song });

  if (!visible) return null;

  return (
    <div className={s.modalOverlay} onClick={onHide}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <div className={s.modalHeader}>
          <h3>Edit Track</h3>
          <button onClick={onHide} className={s.closeButton}>
            &times;
          </button>
        </div>
        <div className={s.modalBody}>
          <div className={s.formGroup}>
            <label className={s.formLabel}>Title:</label>
            <input
              type="text"
              value={editedSong.name}
              onChange={(e) => setEditedSong({...editedSong, name: e.target.value})}
              className={s.formInput}
            />
          </div>
          <div className={s.formGroup}>
            <label className={s.formLabel}>Artist:</label>
            <input
              type="text"
              value={artistName}
              readOnly
              className={s.formInput}
            />
          </div>
        </div>
        <div className={s.modalFooter}>
          <button onClick={onHide} className={s.cancelButton}>
            Cancel
          </button>
          <button onClick={() => onSave(editedSong)} className={s.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackEditModal;