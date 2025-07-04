
'use client';

import React, { useState, useEffect } from 'react';
import s from './style.module.scss';

interface RatingModalProps {
  currentRating: number | null;
  onClose: () => void;
  onSubmit: (rating: number | null) => void;
  songName: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ 
  currentRating, 
  onClose, 
  onSubmit,
  songName
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(currentRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(false);
  }, [currentRating]);

  const handleRatingClick = (rating: number) => {
    const newRating = rating === selectedRating ? null : rating;
    setSelectedRating(newRating);
    setHasChanged(true);
  };

  const handleReset = () => {
    if (selectedRating !== null) {
      setSelectedRating(null);
      setHasChanged(true);
    }
  };

  const handleSubmit = () => {
    if (hasChanged && selectedRating !== null) {
      onSubmit(selectedRating);
      onClose();
    }
  };

  const isSubmitDisabled = !hasChanged || selectedRating === null;

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>×</button>
        <h3 className={s.modalTitle}>Выберите оценку</h3>
        <p className={s.songName}>{songName}</p>
        
        <div className={s.ratingContainer}>
          <div className={s.ratingStars}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <span
                key={star}
                className={`${s.star} ${
                  (hoverRating !== null && hoverRating >= star) || 
                  (selectedRating !== null && selectedRating >= star) ? s.active : ''
                }`}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
              >
                ★
              </span>
            ))}
          </div>
          <button 
            className={s.resetButton}
            onClick={handleReset}
            title="Сбросить оценку"
            disabled={selectedRating === null}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M23 4L23 10 17 10"></path>
              <path d="M1 20L1 14 7 14"></path>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"></path>
            </svg>
          </button>
        </div>

        <div className={s.ratingValue}>
          {selectedRating !== null ? `Оценка: ${selectedRating}` : ''}
        </div>

        <button
          className={`${s.submitButton} ${isSubmitDisabled ? s.disabled : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default RatingModal;