'use client';

import s from './style.module.scss';

const deletesheme = () => {
  return (
 <div className={s.modalOverlay}>
    <div className={s.modalWindow}>
      <button className={s.modalClose}>×</button>
      <h2 className={s.modalTitle}>[ Создать альбом ]</h2>
      
      <div className={s.formGrid}>
        {/* Левая колонка - обложка */}
        <div>
          <div className={s.formLabel}>Обложка</div>
          <div className={s.coverPreview}>
            [ Превью обложки ]
          </div>
          <input 
            type="file" 
            className={s.input}
            accept="image/*"
          />
        </div>
        
        {/* Правая колонка - данные */}
        <div>
          <div className={s.formRow}>
            <label className={s.formLabel}>Название</label>
            <input 
              type="text" 
              className={s.input}
              placeholder="Введите название"
            />
          </div>
          
          <div className={s.formRow}>
            <label className={s.formLabel}>Треки в альбоме</label>
            <div className={s.tracksList}>
              <div className={s.trackItem}>[ Трек 1 ]</div>
              <div className={s.trackItem}>[ Трек 2 ]</div>
            </div>
          </div>
          
          <div className={s.formRow}>
            <label className={s.formLabel}>ДОБАВИТЬ ТРЕКИ</label>
            <input 
              type="text" 
              className={s.input}
              placeholder="Поиск треков..."
            />
            <div className={s.searchResults}>
              <div className={s.trackOption}>[ Трек 3 ]</div>
              <div className={s.trackOption}>[ Трек 4 ]</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={s.formButtons}>
        <button className={s.cancelButton} >
          [ Отмена ]
        </button>
        <button className={s.cancelButton}>
          [ Сохранить ]
        </button>
      </div>
    </div>
  </div>
  );
};

export default deletesheme;
