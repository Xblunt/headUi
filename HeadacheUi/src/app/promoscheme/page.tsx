'use client';

import s from './style.module.scss';

const PromoschemePage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.schemeBlock}>
        {/* <div className={s.schemeHeader}>[ Мои заявки на продвижение ]</div> */}
        <div className={s.schemeControls}>
          <div className={s.schemeSearch}>[ Поиск... ]</div>
          <div className={s.schemeSort}>
            <span>[ Сортировка ]</span>
            {/* <div className={s.schemeSortBtn}>[ По дате ]</div>
            <div className={s.schemeSortBtn}>[ По статусу ]</div> */}
          </div>
        </div>
        <div className={s.schemeTable}>
          <div className={s.schemeTableHeader}>
            <div>[ Сообщение ]</div>
            <div>[ Дата отправки ]</div>
            <div>[ Статус ]</div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div className={s.schemeTableRow} key={i}>
              <div className={s.schemeTableCell}>[ Текст ]</div>
              <div className={s.schemeTableCell}>[ Дата ]</div>
              <div className={s.schemeTableCell}>[ Статус ]</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoschemePage;
