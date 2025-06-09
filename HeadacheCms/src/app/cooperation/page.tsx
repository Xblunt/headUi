// app/cooperation-requests/page.tsx
'use client';

import { useState } from "react";
import { CooperationRequest, CooperationStatus, User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";
import { Dialog } from 'primereact/dialog';
import { mockUsers } from '@/mocks/mockUsers';
import { mockCooperationRequests } from '@/mocks/mockCooperationRequests';

type SortOption = {
  label: string;
  value: string;
};

const CooperationRequestsPage = () => {
  const [requests, setRequests] = useState<CooperationRequest[]>(mockCooperationRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [selectedRequest, setSelectedRequest] = useState<CooperationRequest | null>(null);
  const itemsPerPage = 5;

  const sortOptions: SortOption[] = [
    { label: 'По дате (новые)', value: 'date-desc' },
    { label: 'По дате (старые)', value: 'date-asc' },
    { label: 'По автору (A-Z)', value: 'author-asc' },
    { label: 'По автору (Z-A)', value: 'author-desc' },
    { label: 'По статусу', value: 'status-asc' },
  ];

  const sortRequests = (requests: CooperationRequest[]) => {
    return [...requests].sort((a, b) => {
      const authorA = mockUsers.find(u => u.uuid === a.authorUUID)?.login || '';
      const authorB = mockUsers.find(u => u.uuid === b.authorUUID)?.login || '';
      
      switch (sortOption) {
        case 'author-asc': return authorA.localeCompare(authorB);
        case 'author-desc': return authorB.localeCompare(authorA);
        case 'date-asc': return a.dispatchTime.localeCompare(b.dispatchTime);
        case 'date-desc': return b.dispatchTime.localeCompare(a.dispatchTime);
        case 'status-asc': return a.status.localeCompare(b.status);
        default: return 0;
      }
    });
  };

  const filteredRequests = sortRequests(
    requests.filter(request => {
      const author = mockUsers.find(u => u.uuid === request.authorUUID)?.login || '';
      const label = mockUsers.find(u => u.uuid === request.labelUUID)?.login || '';
      return searchQuery === '' || 
        request.msg.toLowerCase().includes(searchQuery.toLowerCase()) || 
        author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        label.toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status: CooperationStatus) => {
    switch (status) {
      case CooperationStatus.APPROVED: return s.approved;
      case CooperationStatus.REJECTED: return s.rejected;
      case CooperationStatus.AWAITING: return s.awaiting;
      default: return '';
    }
  };

  const getStatusLabel = (status: CooperationStatus) => {
    switch (status) {
      case CooperationStatus.APPROVED: return 'Одобрен';
      case CooperationStatus.REJECTED: return 'Отклонен';
      case CooperationStatus.AWAITING: return 'Ожидает';
      default: return '';
    }
  };

  const getUserName = (uuid: string) => {
    return mockUsers.find(user => user.uuid === uuid)?.login || 'Неизвестный';
  };

  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
                 title="Поиск..."
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по сообщению или участникам"
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

      <div className={s.requestsList}>
        {paginatedRequests.length > 0 ? (
          <table className={s.requestsTable}>
            <thead>
              <tr>
                <th>Автор</th>
                <th>Лейбл</th>
                <th>Сообщение</th>
                <th>Дата отправки</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((request) => (
                <tr key={request.uuid} className={s.requestRow}>
                  <td>{getUserName(request.authorUUID)}</td>
                  <td>{getUserName(request.labelUUID)}</td>
                  <td className={s.messageCell}>
                    <div className={s.messagePreview}>
                      {request.msg.length > 50 ? `${request.msg.substring(0, 50)}...` : request.msg}
                    </div>
                  </td>
                  <td>{formatDateTime(request.dispatchTime)}</td>
                  <td>
                    <span className={`${s.statusBadge} ${getStatusBadgeClass(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`${s.actionButton} ${s.infoButton}`}
                      onClick={() => setSelectedRequest(request)}
                      title="Просмотр деталей"
                    >
                      <i className="pi pi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={s.emptyState}>
            {searchQuery ? (
              <p>Запросы не найдены по запросу "{searchQuery}"</p>
            ) : (
              <p>Нет запросов на сотрудничество</p>
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
        visible={!!selectedRequest} 
        onHide={() => setSelectedRequest(null)}
        header="Детали запроса на сотрудничество"
        className={s.requestModal}
        style={{ minWidth: 750, width: 750 }}
      >
        {selectedRequest && (
          <div className={s.requestDetails}>
            <div className={s.detailSection}>
              <h4>Автор</h4>
              <p>{getUserName(selectedRequest.authorUUID)}</p>
            </div>
            <div className={s.detailSection}>
              <h4>Лейбл</h4>
              <p>{getUserName(selectedRequest.labelUUID)}</p>
            </div>
            <div className={s.detailSection}>
              <h4>Статус</h4>
              <p className={`${s.statusBadge} ${getStatusBadgeClass(selectedRequest.status)}`}>
                {getStatusLabel(selectedRequest.status)}
              </p>
            </div>
            <div className={s.detailSection}>
              <h4>Дата отправки</h4>
              <p>{formatDateTime(selectedRequest.dispatchTime)}</p>
            </div>
            <div className={s.detailSection}>
              <h4>Сообщение</h4>
              <div className={s.messageContent}>
                {selectedRequest.msg}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default CooperationRequestsPage;