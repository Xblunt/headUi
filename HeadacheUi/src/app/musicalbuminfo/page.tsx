'use client';

import s from './style.module.scss';

const deletesheme = () => {
  return (
 <div className={s.modalOverlay}>
    <div className={s.modalWindow}>
      <button className={s.modalClose}>×</button>
      <h2 className={s.modalTitle}>[ Информация об альбоме ]</h2>
      
      <div className={s.infoGrid}>
        {/* Левая колонка - обложка */}
        <div className={s.coverDisplay}>
          [ Обложка альбома ]
        </div>
        
        {/* Правая колонка - данные */}
        <div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Название:</span>
            <span>[ Название альбома ]</span>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Автор:</span>
            <span>[ Логин автора ]</span>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Статус:</span>
            <span>[ Одобрен/На модерации ]</span>
          </div>
        </div>
      </div>
      
      <div className={s.tracksSection}>
        <h3 className={s.sectionTitle}>[ Треки в альбоме ]</h3>
        <div className={s.tracksContainer}>
          <div className={s.trackRow}>[ Трек 1 ]</div>
          <div className={s.trackRow}>[ Трек 2 ]</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default deletesheme;
