"use client"

import { useRouter } from 'next/navigation';
import s from './style.module.scss';
import { User } from '@/models';
import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiPlus, FiMessageSquare, FiUser, FiSend, FiUserPlus, FiHeadphones } from 'react-icons/fi';
import CreateChatModal from '@/components/chats/createChatModal';
import AddParticipantsModal from '@/components/chats/addChatsUserModal';

// Тип для сообщения
type Message = {
  id: string;
  text: string;
  sender: User;
  timestamp: string;
  isCurrentUser: boolean;
};

const SessionPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState('1');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showAddParticipantsModal, setShowAddParticipantsModal] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Загрузка всех пользователей (в реальном приложении - API запрос)
  useEffect(() => {
    // Моковые данные всех пользователей
    const mockUsers = [
      new User({ uuid: 'u1', login: 'Алексей', email: 'alex@example.com', roles: ['user'] }),
      new User({ uuid: 'u2', login: 'Мария', email: 'maria@example.com', roles: ['user'] }),
      new User({ uuid: 'u3', login: 'Иван', email: 'ivan@example.com', roles: ['user'] }),
      new User({ uuid: 'u4', login: 'Ольга', email: 'olga@example.com', roles: ['user'] }),
      new User({ uuid: 'u5', login: 'Дмитрий', email: 'dmitry@example.com', roles: ['user'] }),
      // ... остальные пользователи
    ];
    setAllUsers(mockUsers);
  }, []);

  const handleAddParticipant = (user: User) => {
    // В реальном приложении здесь бы был API запрос на добавление участника
    console.log('Добавлен участник:', user.login);
    setShowAddParticipantsModal(false);
  };

  const handleCreateChat = (chatName: string, selectedUsers: User[]) => {
    // В реальном приложении здесь бы был API запрос на создание чата
    console.log('Создан чат:', chatName, 'с участниками:', selectedUsers.map(u => u.login));
    setShowNewChatModal(false);
    setNewChatName('');
  };
  // Пример текущего пользователя
  const currentUser = new User({ 
    uuid: 'current', 
    login: 'Вы', 
    roles: ['user'], 
    email: 'you@example.com' 
  });

  // Пример данных чатов
  const chats = [
    { id: '1', name: 'Общий чат', lastMessage: 'Привет! Как дела?', unread: 3, time: '12:30' },
    { id: '2', name: 'Музыкальные фанаты', lastMessage: 'Послушайте этот трек!', unread: 0, time: '11:45' },
    { id: '3', name: 'Вечеринка выходного дня', lastMessage: 'Кто идет?', unread: 5, time: '10:20' },
    { id: '4', name: 'Рабочая группа', lastMessage: 'Дедлайн завтра!', unread: 0, time: 'Вчера' },
    { id: '5', name: 'Лучшие друзья', lastMessage: 'Где встречаемся?', unread: 2, time: 'Вчера' },
  ];

  // Моковые пользователи для каждого чата
  const chatParticipants: Record<string, User[]> = {
    '1': [
      new User({ uuid: 'u1', login: 'Алексей', roles: ['user'], email: 'alex@example.com' }),
      new User({ uuid: 'u2', login: 'Мария', roles: ['user'], email: 'maria@example.com' }),
      new User({ uuid: 'u3', login: 'Иван', roles: ['user'], email: 'ivan@example.com' }),
      currentUser,
    ],
    '2': [
      new User({ uuid: 'u5', login: 'Дмитрий', roles: ['user'], email: 'dmitry@example.com' }),
      new User({ uuid: 'u6', login: 'Екатерина', roles: ['user'], email: 'ekaterina@example.com' }),
      currentUser,
    ],
    '3': [
      new User({ uuid: 'u1', login: 'Алексей', roles: ['user'], email: 'alex@example.com' }),
      new User({ uuid: 'u7', login: 'Сергей', roles: ['user'], email: 'sergey@example.com' }),
      currentUser,
    ],
    '4': [
      new User({ uuid: 'u9', login: 'Павел', roles: ['user'], email: 'pavel@example.com' }),
      new User({ uuid: 'u10', login: 'Наталья', roles: ['user'], email: 'natalia@example.com' }),
      currentUser,
    ],
    '5': [
      new User({ uuid: 'u1', login: 'Алексей', roles: ['user'], email: 'alex@example.com' }),
      new User({ uuid: 'u14', login: 'Дарья', roles: ['user'], email: 'daria@example.com' }),
      currentUser,
    ],
  };

  // Моковые сообщения для каждого чата
  const chatMessages: Record<string, Message[]> = {
    '1': [
      {
        id: 'm1',
        text: 'Привет всем! Как дела?',
        sender: chatParticipants['1'][0], // Алексей
        timestamp: '12:25',
        isCurrentUser: false
      },
      {
        id: 'm2',
        text: 'Привет! У меня все отлично, спасибо!',
        sender: currentUser,
        timestamp: '12:28',
        isCurrentUser: true
      },
      {
        id: 'm3',
        text: 'Я тоже в порядке, спасибо что спросил!',
        sender: chatParticipants['1'][1], // Мария
        timestamp: '12:30',
        isCurrentUser: false
      }
    ],
    '2': [
      {
        id: 'm4',
        text: 'Послушайте этот новый трек!',
        sender: chatParticipants['2'][0], // Дмитрий
        timestamp: '11:40',
        isCurrentUser: false
      },
      {
        id: 'm5',
        text: 'Очень круто, спасибо за рекомендацию!',
        sender: currentUser,
        timestamp: '11:45',
        isCurrentUser: true
      }
    ],
    '3': [
      {
        id: 'm6',
        text: 'Кто идет на вечеринку в субботу?',
        sender: chatParticipants['3'][0], // Алексей
        timestamp: '10:15',
        isCurrentUser: false
      },
      {
        id: 'm7',
        text: 'Я буду!',
        sender: chatParticipants['3'][1], // Сергей
        timestamp: '10:18',
        isCurrentUser: false
      },
      {
        id: 'm8',
        text: 'Я тоже приду, жду не дождусь!',
        sender: currentUser,
        timestamp: '10:20',
        isCurrentUser: true
      }
    ],
    '4': [
      {
        id: 'm9',
        text: 'Напоминаю, что дедлайн завтра!',
        sender: chatParticipants['4'][0], // Павел
        timestamp: 'Вчера 18:30',
        isCurrentUser: false
      }
    ],
    '5': [
      {
        id: 'm10',
        text: 'Где встречаемся в пятницу?',
        sender: chatParticipants['5'][0], // Алексей
        timestamp: 'Вчера 20:15',
        isCurrentUser: false
      },
      {
        id: 'm11',
        text: 'Давайте в центре, у кафе на главной площади',
        sender: currentUser,
        timestamp: 'Вчера 20:30',
        isCurrentUser: true
      }
    ]
  };

  const [messages, setMessages] = useState<Message[]>(chatMessages[activeChat] || []);
  
  // Обновляем сообщения при смене активного чата
  useEffect(() => {
    setMessages(chatMessages[activeChat] || []);
    scrollToBottom();
  }, [activeChat]);

  // Прокрутка вниз при новом сообщении
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleCreateChat = () => {
  //   if (newChatName.trim()) {
  //     console.log('Создан новый чат:', newChatName);
  //     setShowNewChatModal(false);
  //     setNewChatName('');
  //   }
  // };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        text: messageInput,
        sender: currentUser,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Обновляем последнее сообщение в чате
      const updatedChats = chats.map(chat => {
        if (chat.id === activeChat) {
          return { ...chat, lastMessage: messageInput, time: 'Только что' };
        }
        return chat;
      });
      // В реальном приложении здесь бы было обновление состояния чатов
    }
  };

  const handleCreateSession = () => {
    router.push('/chats/create');
  };

  return (
    <div className={s.wrapper}>
      {/* Боковая панель с чатами */}
      <div className={s.sidebar}>
        <button 
          className={s.createSessionButton}
          onClick={handleCreateSession}
        >
          <FiHeadphones size={18} />
          Создать сессию
        </button>
        <div className={s.sidebarHeader}>
          <h2>Чаты</h2>
          <button 
            className={s.newChatButton}
            onClick={() => setShowNewChatModal(true)}
          >
            <FiPlus size={20} />
          </button>
        </div>

        {/* Поиск по чатам */}
        <div className={s.searchContainer}>
          <FiSearch className={s.searchIcon} />
          <input
            type="text"
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={s.searchInput}
          />
        </div>

        {/* Список чатов */}
        <div className={s.chatList}>
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`${s.chatItem} ${activeChat === chat.id ? s.active : ''}`}
            >
              <div className={s.chatAvatar}>
                <FiMessageSquare size={20} />
              </div>
              <div className={s.chatInfo}>
                <div className={s.chatName}>{chat.name}</div>
                <div className={s.chatPreview}>{chat.lastMessage}</div>
              </div>
              <div className={s.chatMeta}>
                <div className={s.chatTime}>{chat.time}</div>
                {chat.unread > 0 && (
                  <div className={s.unreadBadge}>{chat.unread}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Основное содержимое - чат */}
      {activeChat ? (
        <div className={s.chatContent}>
          <div className={s.chatHeader}>
            <h3>{chats.find(chat => chat.id === activeChat)?.name}</h3>
          </div>
          
          <div className={s.messagesContainer}>
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`${s.message} ${message.isCurrentUser ? s.currentUser : s.otherUser}`}
              >
                {!message.isCurrentUser && (
                  <div className={s.senderAvatar}>
                    <FiUser size={16} />
                  </div>
                )}
                <div className={s.messageContent}>
                  {!message.isCurrentUser && (
                    <div className={s.senderName}>{message.sender.login}</div>
                  )}
                  <div className={s.messageText}>{message.text}</div>
                  <div className={s.messageTime}>{message.timestamp}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className={s.messageInputContainer}>
            <input
              type="text"
              placeholder="Напишите сообщение..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className={s.messageInput}
            />
            <button 
              className={s.sendButton}
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className={s.mainContent}>
          <div className={s.emptyState}>
            <FiMessageSquare size={48} className={s.emptyIcon} />
            <h3>Выберите чат</h3>
            <p>или создайте новый для начала общения</p>
          </div>
        </div>
      )}

      {/* Колонка участников чата */}
      <div className={s.participantsColumn}>
        {activeChat ? (
          <>
            <div className={s.participantsHeader}>
              <h3>Участники ({chatParticipants[activeChat]?.length || 0})</h3>
              <button 
                className={s.inviteButton}
                onClick={() => setShowAddParticipantsModal(true)}
              >
                <FiUserPlus size={18} />
              </button>
            </div>
            <div className={s.participantsList}>
              {chatParticipants[activeChat]?.map(user => (
                <div key={user.uuid} className={s.participantItem}>
                  <div className={s.participantAvatar}>
                    <FiUser size={16} />
                  </div>
                  <div className={s.participantInfo}>
                    <div className={s.participantName}>
                      {user.uuid === currentUser.uuid ? 'Вы' : user.login}
                    </div>
                    <div className={s.participantEmail}>{user.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={s.participantsEmpty}>
            <FiUser size={48} className={s.emptyIcon} />
            <h3>Участники чата</h3>
            <p>Выберите чат для просмотра участников</p>
          </div>
        )}
      </div>
      {showAddParticipantsModal && (
            <AddParticipantsModal
              users={allUsers.filter(user => 
                !chatParticipants[activeChat]?.some(u => u.uuid === user.uuid)
              )}
              onClose={() => setShowAddParticipantsModal(false)}
              onAddParticipant={handleAddParticipant}
            />
          )}
      {/* Модальное окно создания нового чата */}
       {showNewChatModal && (
        <CreateChatModal
          users={allUsers}
          onClose={() => {
            setShowNewChatModal(false);
            setNewChatName('');
          }}
          onCreate={handleCreateChat}
        />
      )}
    </div>
  );
};

export default SessionPage;