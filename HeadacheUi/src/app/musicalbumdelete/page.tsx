'use client';

import s from './style.module.scss';

const deletesheme = () => {
  return (
<div className={s.modalOverlay}>
    <div className={s.modalWindow} style={{ maxWidth: '400px' }}>
      <h2 className={s.modalTitle}>[ Удалить альбом? ]</h2>
      
      <div className={s.warningBox}>
        Вы уверены, что хотите удалить альбом 
        <strong>"[ Название альбома ]"</strong>?
        <br/><br/>
        Все связанные данные будут потеряны.
      </div>
      
      <div className={s.formButtons}>
        <button className={s.cancelButton}>
          [ Отмена ]
        </button>
        <button className={s.cancelButton}>
          [ Удалить ]
        </button>
      </div>
    </div>
  </div>
  );
};

export default deletesheme;
