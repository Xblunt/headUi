'use client';

import s from './style.module.scss';

const CooperationModalSchemePage = () => (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: '#fff',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div
      className={s.wrapper}
      style={{
        minWidth: 420,
        maxWidth: 420,
        width: 420,
        height: 340,
        boxSizing: 'border-box',
        border: '1.5px dashed #000',
        boxShadow: 'none',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 0
      }}
    >
      <div style={{
        borderBottom: '1.5px dashed #000',
        padding: '24px 32px 18px 32px',
        textAlign: 'center'
      }}>
        <span className={s.title} style={{ color: '#000', fontSize: 22, fontWeight: 700 }}>
          [ Редактировать заявку ]
        </span>
      </div>
      <div style={{ padding: '18px 32px 0 32px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className={s.author}>
          <b>[Автор:]</b> <span>[логин автора]</span>
        </div>
        <div>
          <label className={s.label}>[Сообщение]</label>
          <textarea
            className={s.textarea}
            value="[текст сообщения]"
            readOnly
            rows={4}
            style={{
              minWidth: 0,
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
      <div className={s.buttons} style={{ padding: '0 32px 24px 32px' }}>
        <button className={s.cancelButton}>
          [ Отмена ]
        </button>
        <button className={s.saveButton}>
          [ Сохранить ]
        </button>
      </div>
    </div>
  </div>
);

export default CooperationModalSchemePage;
