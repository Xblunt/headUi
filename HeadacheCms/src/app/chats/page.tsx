// app/chats/page.tsx
'use client';

import { useState } from "react";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { TabMenu } from 'primereact/tabmenu';
import { mockUsers } from '@/mocks/mockUsers';
import { mockChats } from '@/mocks/mockChats';

// Модель пользователя
interface User {
  uuid: string;
  login: string;
  email: string;
  roles: string[];
}

// Модель чата
interface Chat {
  uuid: string;
  name: string;
  participantUUIDs: string[];
  lastMessage?: string;
  lastMessageTime?: string;
}

// Моковые данные пользователей
const usersMock: User[] = mockUsers as any;

// Моковые данные чатов
const chatsMock: Chat[] = mockChats;

type SortOption = {
  label: string;
  value: string;
};

const chatTabs = [
  { label: 'Все чаты', icon: 'pi pi-comments' },
  { label: 'Групповые', icon: 'pi pi-users' },
  { label: 'Личные', icon: 'pi pi-user' },
];

const ChatsPage = () => {
  const [chats, setChats] = useState<Chat[]>(chatsMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const itemsPerPage = 5;

  const sortOptions: SortOption[] = [
    { label: 'По дате (новые)', value: 'date-desc' },
    { label: 'По дате (старые)', value: 'date-asc' },
    { label: 'По названию (А-Z)', value: 'name-asc' },
    { label: 'По названию (Z-А)', value: 'name-desc' },
  ];

  // Фильтрация по табу
  const getChatsForTab = () => {
    switch (activeTab) {
      case 0: // Все чаты
        return chats;
      case 1: // Групповые
        return chats.filter(chat => chat.participantUUIDs.length > 2);
      case 2: // Личные
        return chats.filter(chat => chat.participantUUIDs.length === 2);
      default:
        return chats;
    }
  };

  const sortChats = (chats: Chat[]) => {
    return [...chats].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'date-asc': return (a.lastMessageTime || '').localeCompare(b.lastMessageTime || '');
        case 'date-desc': return (b.lastMessageTime || '').localeCompare(a.lastMessageTime || '');
        default: return 0;
      }
    });
  };

  const filteredChats = sortChats(
    getChatsForTab().filter(chat => {
      const participantNames = chat.participantUUIDs
        .map(uuid => usersMock.find(user => user.uuid === uuid)?.login || '')
        .join(' ');
      
      const searchMatch = searchQuery === '' || 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        participantNames.toLowerCase().includes(searchQuery.toLowerCase());
      
      return searchMatch;
    })
  );

  const paginatedChats = filteredChats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredChats.length / itemsPerPage);

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getParticipantNames = (chat: Chat) => {
    return chat.participantUUIDs
      .map(uuid => usersMock.find(user => user.uuid === uuid)?.login || 'Неизвестный')
      .join(', ');
  };

  const handleDeleteChat = (chat: Chat) => {
    setChatToDelete(chat);
  };

  const confirmDeleteChat = () => {
    if (chatToDelete) {
      setChats(chats.filter(chat => chat.uuid !== chatToDelete.uuid));
      setChatToDelete(null);
    }
  };

  const handleTabChange = (e: any) => {
    setActiveTab(e.index);
    setCurrentPage(1);
  };

  return (
    <div className={"wrapper"}>
      <ConfirmDialog
        visible={!!chatToDelete}
        onHide={() => setChatToDelete(null)}
        message={`Вы действительно хотите удалить чат "${chatToDelete?.name}"?`}
        header="Подтверждение удаления"
        icon="pi pi-exclamation-triangle"
        acceptLabel="Да"
        rejectLabel="Нет"
        accept={confirmDeleteChat}
        reject={() => setChatToDelete(null)}
      />

      <div className={s.header}>
        {/* <TabMenu
          className={s.tabs}
          model={chatTabs}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
        /> */}
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
                 title="Поиск..."
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="запрос"
            />
          </div>
          
          <div className={s.sortContainer}>
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={(e) => setSortOption(e.value)}
              placeholder="Сортировка"
              className={s.sortDropdown}
            />
          </div>
        </div>
      </div>

      <div className={s.chatList}>
        {paginatedChats.length > 0 ? (
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
              {paginatedChats.map((chat) => (
                <tr key={chat.uuid} className={s.chatRow}>
                  <td>
                    <div className={s.chatName}>
                      {chat.name}
                    </div>
                  </td>
                  <td className={s.lastMessage}>
                    {chat.lastMessage || 'Нет сообщений'}
                  </td>
                  <td className={s.messageTime}>
                    {chat.lastMessageTime ? formatDate(chat.lastMessageTime) : ''}
                  </td>
                  <td>
                    <div className={s.participants}>
                      {getParticipantNames(chat)}
                    </div>
                  </td>
                  <td>
                    <div className={s.chatActions}>
                      <button 
                        className={`${s.actionButton} ${s.infoButton}`}
                        onClick={() => setSelectedChat(chat)}
                        title="Просмотр чата"
                      >
                        <i className="pi pi-eye"></i>
                      </button>
                      <button 
                        className={`${s.actionButton} ${s.deleteButton}`}
                        title="Удалить чат"
                        onClick={() => handleDeleteChat(chat)}
                      >
                        <i className="pi pi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={s.emptyState}>
            {searchQuery ? (
              <p>Чаты не найдены по запросу "{searchQuery}"</p>
            ) : (
              <p>Нет доступных чатов</p>
            )}
          </div>
        )}
      </div>

      <div className={s.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Dialog 
        visible={!!selectedChat} 
        onHide={() => setSelectedChat(null)}
        header={`Чат: ${selectedChat?.name}`}
        className={s.chatModal}
        style={{ minWidth: 750, width: 750 }}
      >
        {selectedChat && (
          <div className={s.chatDetails}>
            <div className={s.detailSection}>
              <h4>Участники</h4>
              <div className={s.participantsList}>
                {selectedChat.participantUUIDs.map(uuid => {
                  const user = usersMock.find(u => u.uuid === uuid);
                  return (
                    <div key={uuid} className={s.participant}>
                      <span className={s.participantName}>{user?.login || 'Неизвестный'}</span>
                      <span className={s.participantRole}>{user?.roles[0] || ''}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className={s.detailSection}>
              <h4>Последнее сообщение</h4>
              <div className={s.lastMessagePreview}>
                {selectedChat.lastMessage || 'Нет сообщений'}
                {selectedChat.lastMessageTime && (
                  <div className={s.messageTime}>
                    {formatTime(selectedChat.lastMessageTime)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ChatsPage;