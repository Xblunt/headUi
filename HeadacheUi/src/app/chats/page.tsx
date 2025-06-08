"use client"

import { useRouter } from 'next/navigation';
import s from './style.module.scss';
import { User, Song, SongStatus } from '@/models';
import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiPlus, FiMessageSquare, FiUser, FiSend, FiUserPlus, FiHeadphones, FiMusic } from 'react-icons/fi';
import CreateChatModal from '@/components/chats/createChatModal';
import AddParticipantsModal from '@/components/chats/addChatsUserModal';

import TrackRow from '@/components/track';
import Modal from '@/components/modal';

// Тип для сообщения
type Message = {
  id: string;
  text?: string;
  sender: User;
  timestamp: string;
  isCurrentUser: boolean;
  song?: Song;
};

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
};

const ChatsPage = () => {
  const router = useRouter();
  const [trackSearchQuery, setTrackSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState('1');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [showAddParticipantsModal, setShowAddParticipantsModal] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showTracksModal, setShowTracksModal] = useState(false);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState<HTMLAudioElement | null>(null);

  // Моковые треки
  const mockSongs: Song[] = [
    new Song({
      uuid: 's1',
      name: 'Summer Vibes',
      avgRating: 4.5,
      url: 'https://example.com/song1.mp3',
      status: SongStatus.APPROVED,
      authorUUID: 'u1',
      tags: [],
      fileUUID: 'f1',
      urlImage: 'https://example.com/cover1.jpg'
    }),
    new Song({
      uuid: 's2',
      name: 'Night Drive',
      avgRating: 4.2,
      url: 'https://example.com/song2.mp3',
      status: SongStatus.APPROVED,
      authorUUID: 'u2',
      tags: [],
      fileUUID: 'f2',
      urlImage: 'https://example.com/cover2.jpg'
    }),
    new Song({
      uuid: 's3',
      name: 'Morning Coffee',
      avgRating: 3.9,
      url: 'https://example.com/song3.mp3',
      status: SongStatus.APPROVED,
      authorUUID: 'u3',
      tags: [],
      fileUUID: 'f3',
      urlImage: 'https://example.com/cover3.jpg'
    }),
  ];

  // Загрузка всех пользователей (в реальном приложении - API запрос)
  useEffect(() => {
    // Моковые данные всех пользователей
    const mockUsers = [
      new User({ uuid: 'u1', login: 'Алексей', email: 'alex@example.com', roles: ['user'] }),
      new User({ uuid: 'u2', login: 'Мария', email: 'maria@example.com', roles: ['user'] }),
      new User({ uuid: 'u3', login: 'Иван', email: 'ivan@example.com', roles: ['user'] }),
      new User({ uuid: 'u4', login: 'Ольга', email: 'olga@example.com', roles: ['user'] }),
      new User({ uuid: 'u5', login: 'Дмитрий', email: 'dmitry@example.com', roles: ['user'] }),
    ];
    setAllUsers(mockUsers);
  }, []);

  const handleAddParticipant = (user: User) => {
    console.log('Добавлен участник:', user.login);
    setShowAddParticipantsModal(false);
  };

  const handleCreateChat = (chatName: string, selectedUsers: User[]) => {
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

  // Пример данных чатов с состоянием
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', name: 'Общий чат', lastMessage: 'Привет! Как дела?', lastMessageTime: '12:30', unread: 3 },
    { id: '2', name: 'Музыкальные фанаты', lastMessage: 'Послушайте этот трек!', lastMessageTime: '11:45', unread: 0 },
    { id: '3', name: 'Вечеринка выходного дня', lastMessage: 'Кто идет?', lastMessageTime: '10:20', unread: 5 },
    { id: '4', name: 'Рабочая группа', lastMessage: 'Дедлайн завтра!', lastMessageTime: 'Вчера', unread: 0 },
    { id: '5', name: 'Лучшие друзья', lastMessage: 'Где встречаемся?', lastMessageTime: 'Вчера', unread: 2 },
  ]);

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
        song: mockSongs[0],
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
  
  useEffect(() => {
    setMessages(chatMessages[activeChat] || []);
    scrollToBottom();
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        text: messageInput,
        sender: currentUser,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setMessageInput('');
      
      // Обновляем последнее сообщение в чате
      const updatedChats = chats.map(chat => {
        if (chat.id === activeChat) {
          return { 
            ...chat, 
            lastMessage: messageInput, 
            lastMessageTime: 'Только что',
            unread: 0 // Сбрасываем непрочитанные, так как это наше сообщение
          };
        }
        return chat;
      });
      setChats(updatedChats);
    }
  };

  const handleSendSong = (song: Song) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      song: song
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setShowTracksModal(false);
    
    // Обновляем последнее сообщение в чате
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return { 
          ...chat, 
          lastMessage: `Трек: ${song.name}`, 
          lastMessageTime: 'Только что',
          unread: 0 // Сбрасываем непрочитанные, так как это наше сообщение
        };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  const filteredTracks = mockSongs.filter(song =>
    song.name.toLowerCase().includes(trackSearchQuery.toLowerCase())
  );

  const handlePlayAudio = (url: string, messageId: string) => {
    // Если уже играет этот трек - пауза
    if (currentlyPlayingId === messageId) {
      if (currentPlayingAudio) {
        currentPlayingAudio.pause();
      }
      setCurrentlyPlayingId(null);
      return;
    }

    // Остановить текущее аудио, если оно играет
    if (currentPlayingAudio) {
      currentPlayingAudio.pause();
    }
    
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => setCurrentlyPlayingId(null);
    
    setCurrentPlayingAudio(audio);
    setCurrentlyPlayingId(messageId);
  };

  const handlePauseAudio = () => {
    if (currentPlayingAudio) {
      currentPlayingAudio.pause();
      setCurrentPlayingAudio(null);
      setCurrentlyPlayingId(null);
    }
  };

  const handleCreateSession = () => {
    router.push('/chats/create');
  };

  // Функция для форматирования времени сообщения
  const formatMessageTime = (timestamp: string) => {
    if (timestamp.includes('Только что')) return 'Только что';
    if (timestamp.includes('Вчера')) return 'Вчера';
    
    // Проверяем, сегодня ли было сообщение
    const now = new Date();
    const messageTime = new Date(timestamp);
    
    if (now.toDateString() === messageTime.toDateString()) {
      return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Проверяем, было ли сообщение вчера
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (yesterday.toDateString() === messageTime.toDateString()) {
      return 'Вчера';
    }
    
    // Если сообщение было раньше, чем вчера
    return 'Ранее';
  };

  return (
    <div className={s.wrapper}>
      {/* Боковая панель с чатами */}
      <div className={s.sidebar}>
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
                <div className={s.chatTime}>{formatMessageTime(chat.lastMessageTime)}</div>
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
                  
                  {message.text && (
                    <div className={s.messageText}>{message.text}</div>
                  )}
                  
                  {message.song && (
                    <div className={s.songMessage}>
                      <div className={s.songInfo}>
                        <FiMusic className={s.songIcon} />
                        <span className={s.songTitle}>{message.song.name}</span>
                      </div>
                      <div className={s.audioPlayer}>
                        <button 
                          onClick={() => handlePlayAudio(message.song!.url, message.id)}
                          className={s.playButton}
                        >
                          {currentlyPlayingId === message.id ? (
                            <svg className={s.pauseIcon} viewBox="0 0 24 24">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                          ) : (
                            <svg className={s.playIcon} viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          )}
                        </button>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value="0" 
                          className={s.progressBar}
                        />
                        <span className={s.duration}>3:45</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={s.messageTime}>{message.timestamp}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className={s.messageInputContainer}>
            <button 
              className={s.attachButton}
              onClick={() => setShowTracksModal(true)}
            >
              <FiMusic size={20} />
            </button>
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

      {/* Модальное окно выбора треков */}
      {showTracksModal && (
        <Modal isOpen={showTracksModal} onClose={() => setShowTracksModal(false)} title="Отправить трек">
          <div className={s.tracksModalContent}>
            {/* Добавьте поле поиска */}
            <div className={s.trackSearchContainer}>
              <FiSearch className={s.trackSearchIcon} />
              <input
                type="text"
                placeholder="Поиск треков..."
                value={trackSearchQuery}
                onChange={(e) => setTrackSearchQuery(e.target.value)}
                className={s.trackSearchInput}
              />
            </div>
            
            {/* Отображаем отфильтрованные треки */}
            {filteredTracks.length > 0 ? (
              filteredTracks.map(song => (
                <div key={song.uuid} className={s.trackItem}>
                  <TrackRow 
                    song={song} 
                    currentSong={null} 
                    isPlaying={false} 
                    onPlay={() => {}} 
                    onPause={() => {}}
                    onArtistClick={() => {}}
                    index={0}
                    users={allUsers}
                  />
                  <button 
                    className={s.sendTrackButton}
                    onClick={() => handleSendSong(song)}
                  >
                    <FiSend size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className={s.noTracksFound}>
                Треки не найдены
              </div>
            )}
          </div>
        </Modal>
      )}

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

export default ChatsPage;