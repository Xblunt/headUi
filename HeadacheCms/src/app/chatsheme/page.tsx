'use client';

import s from './style.module.scss';

const ChatshemePage = () => {
  return (
    <div className={"wrapper"} style={{background: '#fff'}}>
      {/* ConfirmDialog (modal) */}
      {/* <div className={s.confirmDialogPlaceholder}>[ ConfirmDialog ]</div> */}

      {/* Header */}
      <div className={s.header}>
        {/* <TabMenu ... /> */}
        {/* <div className={s.tabsPlaceholder}>[ TabMenu ]</div> */}
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
      <div className={s.chatList}>
        <table className={s.chatsTable}>
          <thead>
            <tr>
              <th>Чат</th>
              <th>Последнее сообщение</th>
              <th>Дата</th>
              <th>Участники</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className={s.chatRow}>
                <td>
                  <div className={s.chatName}>
                    <span className={s.cellPlaceholder}>[ Название ]</span>
                  </div>
                </td>
                <td>
                  <span className={s.lastMessage}>[ Сообщение ]</span>
                </td>
                <td>
                  <span className={s.messageTime}>[ Дата ]</span>
                </td>
                <td>
                  <div className={s.participants}>[ Участники ]</div>
                </td>
                <td>
                  <div className={s.chatActions}>
                    <span className={s.actionButton + ' ' + s.infoButton}>[👁]</span>
                    <span className={s.actionButton + ' ' + s.deleteButton}>[🗑]</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Empty state */}
        {/* <div className={s.emptyState}>[ Пустое состояние ]</div> */}
      </div>

      {/* Pagination */}
      <div className={s.pagination}>
        <div className={s.paginationPlaceholder}>[ Пагинация ]</div>
      </div>

      {/* Dialog (modal) */}
      {/* <div className={s.chatModal}>
        <div className={s.chatDetails}>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Участники ]</div>
            <div className={s.participantsList}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={s.participant}>
                  <span className={s.participantName}>[ Имя ]</span>
                  <span className={s.participantRole}>[ Роль ]</span>
                </div>
              ))}
            </div>
          </div>
          <div className={s.detailSection}>
            <div className={s.sectionTitle}>[ Последнее сообщение ]</div>
            <div className={s.lastMessagePreview}>
              [ Сообщение ]
              <div className={s.messageTime}>[ Время ]</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ChatshemePage;
