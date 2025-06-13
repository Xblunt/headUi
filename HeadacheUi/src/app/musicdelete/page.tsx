'use client';

import s from './style.module.scss';

const deletesheme = () => {
  return (
<div className={s.modalOverlay}>
  <div className={s.modalWindow} style={{ maxWidth: '400px' }}>
    <h2 className={s.modalTitle}>[ Удалить трек? ]</h2>
    
    <p style={{ textAlign: 'center', marginBottom: '24px' }}>
      [ Вы уверены, что хотите удалить трек "<b>Название трека</b>"? ]
    </p>
    
    <div className={s.formButtons}>
      <button className={s.cancelButton}>[ Отмена ]</button>
      <button className={s.cancelButton}>[ Удалить ]</button>
    </div>
  </div>
</div>
  );
};

export default deletesheme;
