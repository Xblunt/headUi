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
import { mockSongs } from '@/mocks/mockSongs';
import { mockUsers } from '@/mocks/mockUsers';

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
  participants: User[];
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
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatParticipants, setChatParticipants] = useState<Record<string, User[]>>({});
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({});

  const [userKey, setUserKey] = useState<string>('firstUser');
  const [currentUser, setCurrentUser] = useState<User | undefined>(mockUsers.find((user) => user.login === 'firstUser'));

  useEffect(() => {
    let key = 'firstUser';
    if (typeof window !== 'undefined') {
      key = localStorage.getItem('user') || 'firstUser';
    }
    setUserKey(key);

    const users = mockUsers.filter(u => !u.login.startsWith('label') && !u.roles?.includes('admin') && !u.roles?.includes('author'));
    const labels = mockUsers.filter(u => u.login.startsWith('label'));

    let user: User | undefined;
    let chatList: Chat[] = [];
    let messages: Record<string, Message[]> = {};

    if (key === 'firstUser') {
      user = users.find(u => u.login === 'firstUser');
      const otherUsers = users.filter(u => u.login !== 'firstUser' && u.login.includes('user'));
      chatList = [
        {
          id: 'c1',
          name: 'Дружеский чат',
          lastMessage: 'Привет, как дела?',
          lastMessageTime: '12:00',
          unread: 0,
          participants: [user!, ...otherUsers.slice(0, 2)],
        },
        {
          id: 'c2',
          name: 'Обсуждение музыки',
          lastMessage: 'Слушали новый альбом?',
          lastMessageTime: '13:00',
          unread: 1,
          participants: [user!, ...otherUsers.slice(1, 3)],
        },
        {
          id: 'c3',
          name: 'Планы на выходные',
          lastMessage: 'Кто идёт на концерт?',
          lastMessageTime: '14:00',
          unread: 0,
          participants: [user!, ...otherUsers.slice(0, 1)],
        }
      ];
      messages = {
        c1: [
          {
            id: 'm1',
            text: 'Привет, друзья!',
            sender: user!,
            timestamp: '12:00',
            isCurrentUser: true,
          },
          {
            id: 'm2',
            text: 'Привет, firstUser!',
            sender: otherUsers[0],
            timestamp: '12:01',
            isCurrentUser: false,
          }
        ],
        c2: [
          {
            id: 'm3',
            text: 'Слушали новый альбом?',
            sender: user!,
            timestamp: '13:00',
            isCurrentUser: true,
          },
          {
            id: 'm4',
            text: 'Да, очень понравился!',
            sender: otherUsers[1],
            timestamp: '13:01',
            isCurrentUser: false,
          }
        ],
        c3: [
          {
            id: 'm5',
            text: 'Кто идёт на концерт?',
            sender: user!,
            timestamp: '14:00',
            isCurrentUser: true,
          },
          {
            id: 'm6',
            text: 'Я иду!',
            sender: otherUsers[0],
            timestamp: '14:01',
            isCurrentUser: false,
          }
        ]
      };
      setAllUsers(users);
    } else if (key === 'secondUser') {
      user = users.find(u => u.login === 'secondUser');
      const otherUsers = users.filter(u => u.login !== 'secondUser' && u.login.includes('user'));
      chatList = [
        {
          id: 'c1',
          name: 'Чат пользователей',
          lastMessage: 'Всем привет!',
          lastMessageTime: '14:00',
          unread: 0,
          participants: [user!, ...otherUsers.slice(0, 2)],
        },
        {
          id: 'c2',
          name: 'Работа и проекты',
          lastMessage: 'Обсудим задачи?',
          lastMessageTime: '15:00',
          unread: 0,
          participants: [user!, ...otherUsers.slice(1, 3)],
        },
        {
          id: 'c3',
          name: 'Спорт и отдых',
          lastMessage: 'Кто за футбол?',
          lastMessageTime: '16:00',
          unread: 0,
          participants: [user!, ...otherUsers.slice(0, 1)],
        }
      ];
      messages = {
        c1: [
          {
            id: 'm1',
            text: 'Всем привет!',
            sender: user!,
            timestamp: '14:00',
            isCurrentUser: true,
          },
          {
            id: 'm2',
            text: 'Привет, secondUser!',
            sender: otherUsers[0],
            timestamp: '14:01',
            isCurrentUser: false,
          }
        ],
        c2: [
          {
            id: 'm3',
            text: 'Обсудим задачи?',
            sender: user!,
            timestamp: '15:00',
            isCurrentUser: true,
          },
          {
            id: 'm4',
            text: 'Да, давайте!',
            sender: otherUsers[1],
            timestamp: '15:01',
            isCurrentUser: false,
          }
        ],
        c3: [
          {
            id: 'm5',
            text: 'Кто за футбол?',
            sender: user!,
            timestamp: '16:00',
            isCurrentUser: true,
          },
          {
            id: 'm6',
            text: 'Я!',
            sender: otherUsers[0],
            timestamp: '16:01',
            isCurrentUser: false,
          }
        ]
      };
      setAllUsers(users);
    } else if (key === 'label78') {
      user = labels.find(u => u.login === 'label78');
      const otherLabels = labels.filter(u => u.login !== 'label78' && u.login.includes('label'));
      chatList = [
        {
          id: 'c1',
          name: 'Лейблы: обсуждение',
          lastMessage: 'Коллеги, привет!',
          lastMessageTime: '16:00',
          unread: 0,
          participants: [user!, ...otherLabels.slice(0, 2)],
        },
        {
          id: 'c2',
          name: 'Промо-кампания',
          lastMessage: 'Есть идея по промо!',
          lastMessageTime: '17:00',
          unread: 0,
          participants: [user!, ...otherLabels.slice(1, 3)],
        },
        {
          id: 'c3',
          name: 'Совместные релизы',
          lastMessage: 'Давайте сделаем совместный релиз!',
          lastMessageTime: '18:00',
          unread: 0,
          participants: [user!, ...otherLabels.slice(0, 1)],
        }
      ];
      messages = {
        c1: [
          {
            id: 'm1',
            text: 'Коллеги, привет!',
            sender: user!,
            timestamp: '16:00',
            isCurrentUser: true,
          },
          {
            id: 'm2',
            text: 'Привет, label78!',
            sender: otherLabels[0],
            timestamp: '16:01',
            isCurrentUser: false,
          }
        ],
        c2: [
          {
            id: 'm3',
            text: 'Есть идея по промо!',
            sender: user!,
            timestamp: '17:00',
            isCurrentUser: true,
          },
          {
            id: 'm4',
            text: 'Давайте обсудим детали.',
            sender: otherLabels[1],
            timestamp: '17:01',
            isCurrentUser: false,
          }
        ],
        c3: [
          {
            id: 'm5',
            text: 'Давайте сделаем совместный релиз!',
            sender: user!,
            timestamp: '18:00',
            isCurrentUser: true,
          },
          {
            id: 'm6',
            text: 'Отличная идея!',
            sender: otherLabels[0],
            timestamp: '18:01',
            isCurrentUser: false,
          }
        ]
      };
      setAllUsers(labels);
    } else {
      setAllUsers(users);
    }

    setCurrentUser(user);
    setChats(chatList);
    setChatMessages(messages);
    setMessages(messages[chatList[0]?.id] || []);
    setActiveChat(chatList[0]?.id || '');

  }, []);

  const handleAddParticipant = (user: User) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChat && !chat.participants.some(u => u.uuid === user.uuid)
          ? { ...chat, participants: [...chat.participants, user] }
          : chat
      )
    );
    setShowAddParticipantsModal(false);
  };

  const handleCreateChat = (chatName: string, selectedUsers: User[]) => {
    // Добавляем текущего пользователя в участники, если его нет
    const participants = [
      ...(selectedUsers || []),
      ...(currentUser && !selectedUsers.some(u => u.uuid === currentUser.uuid) ? [currentUser] : [])
    ];
    const newChat: Chat = {
      id: `c${Date.now()}`,
      name: chatName,
      lastMessage: '',
      lastMessageTime: '',
      unread: 0,
      participants,
    };
    setChats(prev => [newChat, ...prev]);
    setShowNewChatModal(false);
    setNewChatName('');
    setActiveChat(newChat.id);
    setMessages([]);
    setChatMessages(prev => ({ ...prev, [newChat.id]: [] }));
  };

  // Пример данных чатов с состоянием


  // Моковые пользователи для каждого чата
  const chatParticipantsMock: Record<string, User[]> = {
    '1': [
      new User({ uuid: 'u1', login: 'Алексей', roles: ['user'], email: 'alex@mail.ru' }),
      new User({ uuid: 'u2', login: 'Мария', roles: ['user'], email: 'maria@mail.ru' }),
      new User({ uuid: 'u3', login: 'Иван', roles: ['user'], email: 'ivan@mail.ru' }),
      currentUser!,
    ],
    '2': [
      new User({ uuid: 'u5', login: 'Дмитрий', roles: ['user'], email: 'dmitry@mail.ru' }),
      new User({ uuid: 'u6', login: 'Екатерина', roles: ['user'], email: 'ekaterina@mail.ru' }),
      currentUser!,
    ],
    '3': [
      new User({ uuid: 'u1', login: 'Алексей', roles: ['user'], email: 'alex@mail.ru' }),
      new User({ uuid: 'u7', login: 'Сергей', roles: ['user'], email: 'sergey@mail.ru' }),
      currentUser!,
    ],
    '4': [
      new User({ uuid: 'u9', login: 'Павел', roles: ['user'], email: 'pavel@mail.ru' }),
      new User({ uuid: 'u10', login: 'Наталья', roles: ['user'], email: 'natalia@mail.ru' }),
      currentUser!,
    ],
    '5': [
      new User({ uuid: 'u1', login: 'Алексей', roles: ['user'], email: 'alex@mail.ru' }),
      new User({ uuid: 'u14', login: 'Дарья', roles: ['user'], email: 'daria@mail.ru' }),
      currentUser!,
    ],
  };

  // Моковые сообщения для каждого чата
  const chatMessagesMock: Record<string, Message[]> = {
    '1': [
      {
        id: 'm1',
        text: 'Привет всем! Как дела?',
        sender: chatParticipantsMock['1'][0], // Алексей
        timestamp: '12:25',
        isCurrentUser: false
      },
      {
        id: 'm2',
        text: 'Привет! У меня все отлично, спасибо!',
        sender: currentUser!,
        timestamp: '12:28',
        isCurrentUser: true
      },
      {
        id: 'm3',
        text: 'Я тоже в порядке, спасибо что спросил!',
        sender: chatParticipantsMock['1'][1], // Мария
        timestamp: '12:30',
        isCurrentUser: false
      }
    ],
    '2': [
      {
        id: 'm4',
        song: mockSongs[0],
        sender: chatParticipantsMock['2'][0], // Дмитрий
        timestamp: '11:40',
        isCurrentUser: false
      },
      {
        id: 'm5',
        text: 'Очень круто, спасибо за рекомендацию!',
        sender: currentUser!,
        timestamp: '11:45',
        isCurrentUser: true
      }
    ],
    '3': [
      {
        id: 'm6',
        text: 'Кто идет на вечеринку в субботу?',
        sender: chatParticipantsMock['3'][0], // Алексей
        timestamp: '10:15',
        isCurrentUser: false
      },
      {
        id: 'm7',
        text: 'Я буду!',
        sender: chatParticipantsMock['3'][1], // Сергей
        timestamp: '10:18',
        isCurrentUser: false
      },
      {
        id: 'm8',
        text: 'Я тоже приду, жду не дождусь!',
        sender: currentUser!,
        timestamp: '10:20',
        isCurrentUser: true
      }
    ],
    '4': [
      {
        id: 'm9',
        text: 'Напоминаю, что дедлайн завтра!',
        sender: chatParticipantsMock['4'][0], // Павел
        timestamp: 'Вчера 18:30',
        isCurrentUser: false
      }
    ],
    '5': [
      {
        id: 'm10',
        text: 'Где встречаемся в пятницу?',
        sender: chatParticipantsMock['5'][0], // Алексей
        timestamp: 'Вчера 20:15',
        isCurrentUser: false
      },
      {
        id: 'm11',
        text: 'Давайте в центре, у кафе на главной площади',
        sender: currentUser!,
        timestamp: 'Вчера 20:30',
        isCurrentUser: true
      }
    ]
  };

  const [messages, setMessages] = useState<Message[]>(chatMessagesMock[activeChat] || []);
  
  // Обновление сообщений при смене чата
  useEffect(() => {
    setMessages(chatMessages[activeChat] || []);
    scrollToBottom();
  }, [activeChat, chatMessages]);

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
        sender: currentUser!,
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
      sender: currentUser!,
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

  // Для аудио в сообщениях
  const [audioStates, setAudioStates] = useState<Record<string, { audio: HTMLAudioElement | null; isPlaying: boolean; progress: number; duration: number }>>({});

  // Для TrackRow в модалке
  const [trackRowAudio, setTrackRowAudio] = useState<{ uuid: string; audio: HTMLAudioElement | null; isPlaying: boolean; progress: number; duration: number } | null>(null);
  const [showTracksModal, setShowTracksModal] = useState(false);

  // --- Аудио для сообщений ---
  const handlePlayAudio = (url: string, messageId: string) => {
    setAudioStates(prev => {
      // Остановить все остальные
      Object.values(prev).forEach(state => state.audio?.pause());
      // Если уже играет этот трек - пауза
      if (prev[messageId]?.isPlaying) {
        prev[messageId]?.audio?.pause();
        return { ...prev, [messageId]: { ...prev[messageId], isPlaying: false } };
      }
      // Новый аудио
      const audio = new Audio(url);
      audio.play();
      const update = (progress = 0, duration = 0) => {
        setAudioStates(s => ({
          ...s,
          [messageId]: {
            ...s[messageId],
            progress: audio.currentTime / (audio.duration || 1) * 100,
            duration: audio.duration || 0,
          }
        }));
      };
      audio.addEventListener('timeupdate', () => update());
      audio.addEventListener('ended', () => {
        setAudioStates(s => ({
          ...s,
          [messageId]: { ...s[messageId], isPlaying: false, progress: 0 }
        }));
      });
      update();
      return {
        ...Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, isPlaying: false }])),
        [messageId]: { audio, isPlaying: true, progress: 0, duration: 0 }
      };
    });
  };

  const handlePauseAudio = (messageId: string) => {
    setAudioStates(prev => {
      prev[messageId]?.audio?.pause();
      return { ...prev, [messageId]: { ...prev[messageId], isPlaying: false } };
    });
  };
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
  }
  // --- Аудио для TrackRow в модалке ---
  const handleTrackRowPlay = (song: Song) => {
    setTrackRowAudio(prev => {
      if (prev?.isPlaying && prev.uuid === song.uuid) {
        prev.audio?.pause();
        return { ...prev, isPlaying: false };
      }
      prev?.audio?.pause();
      const audio = new Audio(song.url);
      audio.play();
      audio.addEventListener('ended', () => {
        setTrackRowAudio(s => s && s.uuid === song.uuid ? { ...s, isPlaying: false, progress: 0 } : s);
      });
      audio.addEventListener('timeupdate', () => {
        setTrackRowAudio(s => s && s.uuid === song.uuid
          ? { ...s, progress: audio.currentTime / (audio.duration || 1) * 100, duration: audio.duration || 0 }
          : s
        );
      });
      return { uuid: song.uuid, audio, isPlaying: true, progress: 0, duration: 0 };
    });
  };

  const handleTrackRowPause = () => {
    setTrackRowAudio(prev => {
      prev?.audio?.pause();
      return prev ? { ...prev, isPlaying: false } : null;
    });
  };

  const handleTrackRowProgressChange = (progress: number) => {
    setTrackRowAudio(prev => {
      if (prev && prev.audio && prev.duration) {
        prev.audio.currentTime = (progress / 100) * prev.duration;
        return { ...prev, progress };
      }
      return prev;
    });
  };

  // В модалках и при добавлении участников показываем только пользователей или только лейблы
  const availableParticipants = userKey === 'label78'
    ? mockUsers.filter(u => u.login.startsWith('label'))
    : mockUsers.filter(u => u.login.startsWith('user'));

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
                {/* {chat.unread > 0 && (
                  <div className={s.unreadBadge}>{chat.unread}</div>
                )} */}
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
                    <div className={s.senderName}>{message.sender?.login || ''}</div>
                  )}
                  
                  {message.text && (
                    <div className={s.messageText}>{message.text}</div>
                  )}
                  
                  {message.song && (
                    <div className={s.songMessage}>
                      <div className={s.songInfo}>
                        <FiMusic className={s.songIcon} />
                        <span className={s.songTitle}>{message.song.name}</span>
                        {/* Добавляем тире между названием и автором */}
                        <span style={{ margin: '0 6px', color: '#bbb' }}>—</span>
                        {/* Автор трека */}
                        {(() => {
                          const author = allUsers.find(u => u.uuid === message.song?.authorUUID);
                          return author ? (
                            <span
                              className={s.songAuthor}
                              style={{
                                marginLeft: 0,
                                color: '#7c192a',
                                cursor: 'pointer',
                                textDecoration: 'none'
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                window.open(`/info/${author.login}`, '_blank');
                              }}
                              onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.textDecoration = 'underline';
                              }}
                              onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.textDecoration = 'none';
                              }}
                            >
                              {author.login}
                            </span>
                          ) : null;
                        })()}
                      </div>
                      <div className={s.audioPlayer}>
                        <button 
                          onClick={() =>
                            audioStates[message.id]?.isPlaying
                              ? handlePauseAudio(message.id)
                              : handlePlayAudio(message.song!.url, message.id)
                          }
                          className={s.playButton}
                        >
                          {audioStates[message.id]?.isPlaying ? (
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
                          value={audioStates[message.id]?.progress || 0}
                          onChange={e => {
                            const val = Number(e.target.value);
                            const audio = audioStates[message.id]?.audio;
                            const duration = audioStates[message.id]?.duration || 0;
                            if (audio && duration) {
                              audio.currentTime = (val / 100) * duration;
                            }
                          }}
                          className={s.progressBar}
                        />
                        <span className={s.duration}>
                          {audioStates[message.id]?.duration
                            ? `${Math.floor(audioStates[message.id].duration / 60)}:${String(Math.floor(audioStates[message.id].duration % 60)).padStart(2, '0')}`
                            : '0:00'}
                        </span>
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
              <h3>
                Участники ({chats.find(chat => chat.id === activeChat)?.participants.length || 0})
              </h3>
              <button 
                className={s.inviteButton}
                onClick={() => setShowAddParticipantsModal(true)}
              >
                <FiUserPlus size={18} />
              </button>
            </div>
            <div className={s.participantsList}>
              {(chats.find(chat => chat.id === activeChat)?.participants ?? []).length > 0 ? (
                chats.find(chat => chat.id === activeChat)!.participants.map(user => (
                  user && (
                    <div key={user.uuid} className={s.participantItem}>
                      <div className={s.participantAvatar}>
                        {currentUser && user.uuid === currentUser.uuid ? (
                          // "Вы" + иконка
                          <>
                            <FiUser size={16} />
                          </>
                        ) : (
                          user.urlImage
                            ? <img src={user.urlImage} alt={user.login} style={{ width: 24, height: 24, borderRadius: '50%' }} />
                            : <FiUser size={16} />
                        )}
                      </div>
                      <div className={s.participantInfo}>
                        <div className={s.participantName}>
                          {currentUser && user.uuid === currentUser.uuid ? (
                            <span style={{ fontWeight: 700, color: '#7c192a' }}>Вы</span>
                          ) : user.login}
                        </div>
                        <div className={s.participantEmail}>{user.email}</div>
                      </div>
                    </div>
                  )
                ))
              ) : (
                <div style={{ color: '#999', textAlign: 'center', marginTop: 32 }}>
                  Нет участников в этом чате
                </div>
              )}
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
                    currentSong={trackRowAudio?.uuid === song.uuid ? song : null}
                    isPlaying={!!trackRowAudio && trackRowAudio.uuid === song.uuid && trackRowAudio.isPlaying}
                    onPlay={handleTrackRowPlay}
                    onPause={handleTrackRowPause}
                    onArtistClick={() => {}}
                    index={0}
                    isModal={true}
                    users={allUsers}
                    showProgressBar={false}
                    progress={trackRowAudio && trackRowAudio.uuid === song.uuid ? trackRowAudio.progress : 0}
                    onProgressChange={handleTrackRowProgressChange}
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
          users={availableParticipants.filter(user =>
            !(chats.find(chat => chat.id === activeChat)?.participants.some(u => u.uuid === user.uuid))
          )}
          onClose={() => setShowAddParticipantsModal(false)}
          onAddParticipant={handleAddParticipant}
        />
      )}

      {/* Модальное окно создания нового чата */}
      {showNewChatModal && (
        <CreateChatModal
          users={availableParticipants}
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