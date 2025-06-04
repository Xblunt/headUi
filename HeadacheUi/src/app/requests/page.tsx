'use client';

import { FC, useState } from 'react';
import styles from './style.module.scss';
import { CooperationRequest, CooperationStatus, User } from '@/models';

// Моковые данные для тестирования
const mockRequests: CooperationRequest[] = [
  new CooperationRequest({
    uuid: '1',
    msg: 'Предлагаем сотрудничество по продвижению ваших треков',
    dispatchTime: '2023-05-15T10:30:00',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author1',
    labelUUID: 'label1'
  }),
  new CooperationRequest({
    uuid: '2',
    msg: 'Интересует совместный проект с вашим участием',
    dispatchTime: '2023-05-16T14:45:00',
    status: CooperationStatus.AWAITING,
    authorUUID: 'author1',
    labelUUID: 'label2'
  }),
  new CooperationRequest({
    uuid: '3',
    msg: 'Ваш трек добавлен в наш плейлист',
    dispatchTime: '2023-05-10T09:15:00',
    status: CooperationStatus.APPROVED,
    authorUUID: 'author1',
    labelUUID: 'label3'
  }),
  new CooperationRequest({
    uuid: '4',
    msg: 'К сожалению, не можем принять ваше предложение',
    dispatchTime: '2023-05-12T16:20:00',
    status: CooperationStatus.REJECTED,
    authorUUID: 'author1',
    labelUUID: 'label4'
  }),
];

// Моковые данные лейблов
const mockLabels: Record<string, User> = {
  'label1': new User({
    uuid: 'label1',
    login: 'SoundWave Records',
    email: 'contact@soundwave.com',
    phoneNumber: '+7 (123) 456-7890',
    roles: ['LABEL'],
    description: 'Крупный лейбл, специализирующийся на электронной музыке',
    urlImage: 'https://example.com/label1.jpg'
  }),
  'label2': new User({
    uuid: 'label2',
    login: 'Urban Beats',
    email: 'info@urbanbeats.com',
    phoneNumber: '+7 (987) 654-3210',
    roles: ['LABEL'],
    description: 'Лейбл, работающий с хип-хоп исполнителями',
    urlImage: 'https://example.com/label2.jpg'
  }),
  'label3': new User({
    uuid: 'label3',
    login: 'Deep House Collective',
    email: 'deep@house.com',
    phoneNumber: '+7 (555) 123-4567',
    roles: ['LABEL'],
    description: 'Специализируется на deep house и техно музыке',
    urlImage: 'https://example.com/label3.jpg'
  }),
  'label4': new User({
    uuid: 'label4',
    login: 'Rock Nation',
    email: 'rock@nation.com',
    phoneNumber: '+7 (111) 222-3333',
    roles: ['LABEL'],
    description: 'Лейбл для рок-исполнителей',
    urlImage: 'https://example.com/label4.jpg'
  }),
};

const RequestsPage: FC = () => {
  const [requests, setRequests] = useState<CooperationRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<CooperationRequest | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

  // Фильтрация запросов по статусу
  const awaitingRequests = requests.filter(r => r.status === CooperationStatus.AWAITING);
  const approvedRequests = requests.filter(r => r.status === CooperationStatus.APPROVED);
  const rejectedRequests = requests.filter(r => r.status === CooperationStatus.REJECTED);

  // Получение информации о лейбле
  const getLabelInfo = (labelUUID: string): User => {
    return mockLabels[labelUUID] || new User({
      uuid: labelUUID,
      login: 'Неизвестный лейбл',
      roles: ['LABEL']
    });
  };

  // Обработчики действий
  const handleOpenModal = (request: CooperationRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleOpenLabelModal = (labelUUID: string) => {
    setSelectedLabel(getLabelInfo(labelUUID));
    setIsLabelModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleCloseLabelModal = () => {
    setIsLabelModalOpen(false);
    setSelectedLabel(null);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;
    
    const updatedRequests = requests.map(req => 
      req.uuid === selectedRequest.uuid 
        ? new CooperationRequest({ ...req, status: CooperationStatus.APPROVED }) 
        : req
    );
    
    setRequests(updatedRequests);
    handleCloseModal();
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    
    const updatedRequests = requests.map(req => 
      req.uuid === selectedRequest.uuid 
        ? new CooperationRequest({ ...req, status: CooperationStatus.REJECTED }) 
        : req
    );
    
    setRequests(updatedRequests);
    handleCloseModal();
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.requestsPage}>
      <div className={styles.requestsContainer}>
        {/* Ожидающие заявки */}
        <div className={styles.requestsColumn}>
          <h2 className={styles.columnTitle}>Ожидают решения ({awaitingRequests.length})</h2>
          {awaitingRequests.length > 0 ? (
            <ul className={styles.requestsList}>
              {awaitingRequests.map(request => {
                const label = getLabelInfo(request.labelUUID);
                return (
                  <li key={request.uuid} className={styles.requestCard}>
                    <div className={styles.requestHeader}>
                      <span className={styles.requestDate}>{formatDate(request.dispatchTime)}</span>
                    </div>
                    <p className={styles.labelLogin}>Лейбл: {label.login}</p>
                    <p className={styles.requestMessage}>{request.msg}</p>
                    <button 
                      className={styles.viewButton}
                      onClick={() => handleOpenModal(request)}
                    >
                      Просмотреть
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>Нет заявок</p>
          )}
        </div>

        {/* Одобренные заявки */}
        <div className={styles.requestsColumn}>
          <h2 className={styles.columnTitle}>Одобренные ({approvedRequests.length})</h2>
          {approvedRequests.length > 0 ? (
            <ul className={styles.requestsList}>
              {approvedRequests.map(request => {
                const label = getLabelInfo(request.labelUUID);
                return (
                  <li key={request.uuid} className={styles.requestCard}>
                    <div className={styles.requestHeader}>
                      <span className={styles.requestDate}>{formatDate(request.dispatchTime)}</span>
                      <span className={styles.approvedStatus}>✓</span>
                    </div>
                    <p className={styles.labelLogin}>Лейбл: {label.login}</p>
                    <p className={styles.requestMessage}>{request.msg}</p>
                    <button 
                      className={styles.viewButton}
                      onClick={() => handleOpenLabelModal(request.labelUUID)}
                    >
                      Информация о лейбле
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>Нет заявок</p>
          )}
        </div>

        {/* Отклоненные заявки */}
        <div className={styles.requestsColumn}>
          <h2 className={styles.columnTitle}>Отклоненные ({rejectedRequests.length})</h2>
          {rejectedRequests.length > 0 ? (
            <ul className={styles.requestsList}>
              {rejectedRequests.map(request => {
                const label = getLabelInfo(request.labelUUID);
                return (
                  <li key={request.uuid} className={styles.requestCard}>
                    <div className={styles.requestHeader}>
                      <span className={styles.requestDate}>{formatDate(request.dispatchTime)}</span>
                      <span className={styles.rejectedStatus}>✗</span>
                    </div>
                    <p className={styles.labelLogin}>Лейбл: {label.login}</p>
                    <p className={styles.requestMessage}>{request.msg}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>Нет заявок</p>
          )}
        </div>
      </div>

      {/* Модальное окно для просмотра заявки */}
      {isModalOpen && selectedRequest && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>×</button>
            <h2 className={styles.modalTitle}>Заявка на сотрудничество</h2>
            <div className={styles.modalBody}>
              <p className={styles.modalDate}>{formatDate(selectedRequest.dispatchTime)}</p>
              <p className={styles.modalLabel}>Лейбл: {getLabelInfo(selectedRequest.labelUUID).login}</p>
              <p className={styles.modalMessage}>{selectedRequest.msg}</p>
              
              <div className={styles.modalActions}>
                <button 
                  className={styles.rejectButton}
                  onClick={handleReject}
                >
                  Отклонить
                </button>
                <button 
                  className={styles.approveButton}
                  onClick={handleApprove}
                >
                  Одобрить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для просмотра информации о лейбле */}
      {isLabelModalOpen && selectedLabel && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseLabelModal}>×</button>
            <h2 className={styles.modalTitle}>Информация о лейбле</h2>
            <div className={styles.modalBody}>
              <div className={styles.labelInfo}>
                <h3 className={styles.labelName}>{selectedLabel.login}</h3>
                {selectedLabel.description && (
                  <p className={styles.labelDescription}>{selectedLabel.description}</p>
                )}
                <div className={styles.labelContacts}>
                  {selectedLabel.email && (
                    <p><strong>Email:</strong> {selectedLabel.email}</p>
                  )}
                  {selectedLabel.phoneNumber && (
                    <p><strong>Телефон:</strong> {selectedLabel.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;