'use client';

import s from './style.module.scss';

const ChatsshemePage = () => {
  return (
    <div className={s.wrapper}>
      {/* Sidebar */}
      <div className={s.sidebar}>
        <div className={s.sidebarHeader}>
          <div className={s.sidebarTitle}>[ Чаты ]</div>
          <div className={s.newChatButton}>[ + ]</div>
        </div>
        <div className={s.searchContainer}>
          <div className={s.searchIcon}>[🔍]</div>
          <div className={s.searchInput}>[ Поиск чатов... ]</div>
        </div>
        <div className={s.chatList}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={s.chatItem}>
              <div className={s.chatAvatar}>[A]</div>
              <div className={s.chatInfo}>
                <div className={s.chatName}>[ Название ]</div>
                <div className={s.chatPreview}>[ Сообщение ]</div>
              </div>
              <div className={s.chatMeta}>
                <div className={s.chatTime}>[ 12:00 ]</div>
                {/* <div className={s.unreadBadge}>[ 3 ]</div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Content */}
      <div className={s.chatContent}>
        <div className={s.chatHeader}>
          <div className={s.chatTitle}>[ Название чата ]</div>
        </div>
        <div className={s.messagesContainer}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={s.message + ' ' + (i % 2 === 0 ? s.currentUser : s.otherUser)}>
              <div className={s.senderAvatar}>[A]</div>
              <div className={s.messageContent}>
                <div className={s.senderName}>[ Имя ]</div>
                <div className={s.messageText}>[ Сообщение ]</div>
                <div className={s.messageTime}>[ 12:00 ]</div>
              </div>
            </div>
          ))}
        </div>
        <div className={s.messageInputContainer}>
          <div className={s.attachButton}>[🎵]</div>
          <div className={s.messageInput}>[ Напишите сообщение... ]</div>
          <div className={s.sendButton}>[ ➤ ]</div>
        </div>
      </div>

      {/* Participants Column */}
      <div className={s.participantsColumn}>
        <div className={s.participantsHeader}>
          <div>[ Участники (3) ]</div>
          <div className={s.inviteButton}>[ + ]</div>
        </div>
        <div className={s.participantsList}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={s.participantItem}>
              <div className={s.participantAvatar}>[A]</div>
              <div className={s.participantInfo}>
                <div className={s.participantName}>[ Имя ]</div>
                <div className={s.participantEmail}>[ email@ ]</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatsshemePage;
