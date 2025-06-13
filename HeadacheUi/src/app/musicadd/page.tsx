'use client';

import s from './style.module.scss';

const Addsheme = () => {
  return (
   <div className={s.modalOverlay}>
  <div className={s.modalWindow}>
    <button className={s.modalClose}>×</button>
    <h2 className={s.modalTitle}>[ Создать трек ]</h2>
    
    <div className={s.formRow}>
      <label className={s.formLabel}>[ Название трека ]</label>
      <input className={s.input} type="text" placeholder="[ Введите название... ]" />
    </div>
    
    <div className={s.formRow}>
      <label className={s.formLabel}>[ Обложка ]</label>
      <input className={s.input} type="file" accept="image/*" />
      <div className={s.trackCoverPreview}>[ Превью обложки ]</div>
    </div>
    
    <div className={s.formRow}>
      <label className={s.formLabel}>[ Аудиофайл ]</label>
      <input className={s.input} type="file" accept="audio/*" />
      <div className={s.audioPlayer}>[ Аудиоплеер ]</div>
    </div>
    
    <div className={s.formRow}>
      <label className={s.formLabel}>[ Теги ]</label>
      <select multiple className={`${s.input} ${s.selectInput}`}>
        <option>[ Тег 1 ]</option>
        <option>[ Тег 2 ]</option>
      </select>
      <div className={s.tagsContainer}>
        <span className={s.tagPill}>[ Выбранный тег ]</span>
      </div>
    </div>
    
    <div className={s.formButtons}>
      <button className={s.cancelButton}>[ Отмена ]</button>
      <button className={s.cancelButton}>[Сохранить]</button>
    </div>
  </div>
</div>
  );
};

export default Addsheme;
