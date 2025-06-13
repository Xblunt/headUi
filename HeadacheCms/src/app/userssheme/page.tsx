'use client';

import s from './style.module.scss';

const UsersshemePage = () => {
  return (
    <div className={"wrapper"} style={{background: '#fff'}}>
      <div className={s.header}>
        <div className={s.tabsPlaceholder}>
          <span className={s.tab}>[ Все ]</span>
          <span className={s.tab}>[ Авторы ]</span>
          <span className={s.tab}>[ Лейблы ]</span>
          <span className={s.tab}>[ Администраторы ]</span>
          <span className={s.tab}>[ Слушатели ]</span>
          <span className={s.tab}>[ Заблокированные ]</span>
        </div>
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <div className={s.inputPlaceholder}>[ Поиск ]</div>
          </div>
          <div className={s.sortContainer}>
            <div className={s.dropdownPlaceholder}>[ Сортировка ]</div>
          </div>
          <div className={s.createButton}>[ + Создать ]</div>
        </div>
      </div>
      <div className={s.userList}>
        <table className={s.usersTable}>
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>Роли</th>
              <th>Зарегистрирован</th>
              <th>Последняя активность</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>
                  <div className={s.userCell}>
                    <div className={s.userAvatar}>[ Фото ]</div>
                    <div className={s.userInfo}>
                      <div className={s.userLogin}>[ Логин ]</div>
                      <div className={s.userEmail}>[ Email ]</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={s.rolesDropdown}>[ Роли ]</div>
                </td>
                <td>[ Дата ]</td>
                <td>[ Дата ]</td>
                <td>
                  <span className={s.statusBadge}>[ Статус ]</span>
                </td>
                <td>
                  <div className={s.userActions}>
                    <span>[👁]</span>
                    <span>[✏️]</span>
                    <span>[🔒]</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className={s.emptyState}>[ Пустое состояние ]</div> */}
      </div>
      <div className={s.pagination}>
        <div className={s.paginationPlaceholder}>[ Пагинация ]</div>
      </div>
    </div>
  );
};

export default UsersshemePage;
