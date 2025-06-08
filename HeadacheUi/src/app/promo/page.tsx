'use client';

import { FC, useState, useMemo } from 'react';
import styles from './style.module.scss';
import { PromotionRequest, PromotionStatus } from '@/models';

// Моковые данные для тестирования
const mockPromoRequests: PromotionRequest[] = [
  new PromotionRequest({
    uuid: '1',
    songUUID: 'song1',
    msg: 'Продвижение нового трека "Summer Vibes"',
    dispatchTime: '2023-06-10T14:30:00',
    status: PromotionStatus.PROMOTED
  }),
  new PromotionRequest({
    uuid: '2',
    songUUID: 'song2',
    msg: 'Реклама альбома "Winter Dreams"',
    dispatchTime: '2023-06-05T09:15:00',
    status: PromotionStatus.AWAITING_PROMOTION
  }),
  new PromotionRequest({
    uuid: '3',
    songUUID: 'song3',
    msg: 'Продвижение сингла "Autumn Leaves"',
    dispatchTime: '2023-06-15T11:45:00',
    status: PromotionStatus.PROCESSING
  }),
  new PromotionRequest({
    uuid: '4',
    songUUID: 'song4',
    msg: 'Рекламная кампания для "Spring Melody"',
    dispatchTime: '2023-05-28T16:20:00',
    status: PromotionStatus.PROMOTED
  }),
];

const PromotionRequestsPage: FC = () => {
  const [requests, setRequests] = useState<PromotionRequest[]>(mockPromoRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'dispatchTime' | 'status'>('dispatchTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Функция для форматирования даты
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

  // Функция для получения класса статуса
  const getStatusClass = (status: PromotionStatus) => {
    switch (status) {
      case PromotionStatus.PROMOTED:
        return styles.statusPromoted;
      case PromotionStatus.AWAITING_PROMOTION:
        return styles.statusAwaiting;
      case PromotionStatus.PROCESSING:
        return styles.statusProcessing;
      default:
        return '';
    }
  };

  // Функция для отображения статуса
  const getStatusDisplay = (status: PromotionStatus) => {
    switch (status) {
      case PromotionStatus.PROMOTED:
        return 'Продвинуто';
      case PromotionStatus.AWAITING_PROMOTION:
        return 'Ожидает';
      case PromotionStatus.PROCESSING:
        return 'В обработке';
      default:
        return status;
    }
  };

  // Фильтрация и сортировка запросов
  const filteredAndSortedRequests = useMemo(() => {
    const filtered = requests.filter(request =>
      request.msg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getStatusDisplay(request.status).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === 'dispatchTime') {
        comparison = new Date(a.dispatchTime).getTime() - new Date(b.dispatchTime).getTime();
      } else {
        comparison = a.status.localeCompare(b.status);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [requests, searchTerm, sortField, sortDirection]);

  // Обработчик изменения сортировки
  const handleSort = (field: 'dispatchTime' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
     <div className={'wrapper'}>
    <div className={styles.promotionRequestsPage}>
      {/* <h1 className={styles.title}>Мои заявки на продвижение</h1> */}

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.sortControls}>
          <span>Сортировка:</span>
          <button
            onClick={() => handleSort('dispatchTime')}
            className={`${styles.sortButton} ${sortField === 'dispatchTime' ? styles.active : ''}`}
          >
            По дате {sortField === 'dispatchTime' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSort('status')}
            className={`${styles.sortButton} ${sortField === 'status' ? styles.active : ''}`}
          >
            По статусу {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className={styles.requestsList}>
        {filteredAndSortedRequests.length > 0 ? (
          <table className={styles.requestsTable}>
            <thead>
              <tr>
                <th>Сообщение</th>
                <th>Дата отправки</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedRequests.map(request => (
                <tr key={request.uuid} className={styles.requestRow}>
                  <td>{request.msg}</td>
                  <td>{formatDate(request.dispatchTime)}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(request.status)}`}>
                      {getStatusDisplay(request.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.noResults}>
            {searchTerm ? 'Ничего не найдено' : 'У вас нет отправленных заявок'}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PromotionRequestsPage;
