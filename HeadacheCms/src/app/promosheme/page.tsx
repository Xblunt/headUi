'use client';

import s from './style.module.scss';

const PromoshemePage = () => {
  return (
    <div className={"wrapper"}>
      {/* Header */}
      <div className={s.header}>
        <div className={s.tabsPlaceholder}>
          <span className={s.tab}>[ Ожидают ]</span>
          <span className={s.tab}>[ Одобрены ]</span>
          <span className={s.tab}>[ В процессе ]</span>
        </div>
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <div className={s.inputPlaceholder}>[ Поиск ]</div>
          </div>
          <div className={s.sortContainer}>
            <div className={s.dropdownPlaceholder}>[ Сортировка ]</div>
          </div>
        </div>
      </div>

      {/* Table/List */}
      <div className={s.requestsList}>
        <table className={s.requestsTable}>
          <thead>
            <tr>
              <th>Песня</th>
              <th>Артист</th>
              <th>Сообщение</th>
              <th>Дата отправки</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className={s.requestRow}>
                <td>
                  <div className={s.cellPlaceholder}>[ Песня ]</div>
                </td>
                <td>
                  <div className={s.cellPlaceholder}>[ Артист ]</div>
                </td>
                <td>
                  <div className={s.cellPlaceholder}>[ Сообщение ]</div>
                </td>
                <td>
                  <div className={s.cellPlaceholder}>[ Дата отправки ]</div>
                </td>
                <td>
                  <div className={s.cellPlaceholder}>[ Статус ]</div>
                </td>
                <td>
                  <div className={s.actionsPlaceholder}>
                    <span>[👁]</span>
                    <span>[✏️]</span>
                    <span>[✔️]</span>
                    <span>[🔄]</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className={s.emptyState}>[ Пустое состояние ]</div> */}
      </div>

      {/* Pagination */}
      <div className={s.pagination}>
        <div className={s.paginationPlaceholder}>[ Пагинация ]</div>
      </div>
    </div>
  );
};

export default PromoshemePage;
