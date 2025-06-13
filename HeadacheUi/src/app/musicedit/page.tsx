'use client';

import s from './style.module.scss';

const Editsheme = () => {
  return (
<div className={s.modalOverlay}>
  <div className={s.modalWindow}>
    <button className={s.modalClose}>×</button>
    <h2 className={s.modalTitle}>[ Информация о треке ]</h2>
    
    <div className={s.infoModalContent}>
      <div className={s.infoTitle}>[ Название трека ]</div>
      
      <div className={s.infoCover}>[ Обложка трека ]</div>
      
      <div className={s.infoRow}>
        <span className={s.infoLabel}>[ Автор: ]</span>
        <span>[ Логин автора ]</span>
      </div>
      
      <div className={s.infoRow}>
        <span className={s.infoLabel}>[ Статус: ]</span>
        <span>[ Одобрено/На модерации/Отклонено ]</span>
      </div>
      
      <div className={s.infoRow}>
        <span className={s.infoLabel}>[ Теги: ]</span>
        <div className={s.infoTags}>
          <span className={s.infoTagPill}>[ Тег 1 ]</span>
          <span className={s.infoTagPill}>[ Тег 2 ]</span>
        </div>
      </div>
      
      <div className={s.infoRow}>
        <span className={s.infoLabel}>[ Аудио: ]</span>
        <div className={s.infoAudio}>[ Аудиоплеер ]</div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Editsheme;
