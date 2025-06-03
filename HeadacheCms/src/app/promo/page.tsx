// app/promotion-requests/page.tsx
'use client';

import { useState } from "react";
import { PromotionRequest, PromotionStatus, Song, SongStatus, User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";
import { Dialog } from 'primereact/dialog';
import { PfTabMenu } from "@/components/ui/tabmenu";
import { ILink } from "@/models";

// Моковые данные пользователей
const usersMock: User[] = [
  new User({
    uuid: 'user-1',
    login: 'ArtistOne',
    email: 'artist1@example.com',
    roles: ['ARTIST'],
    urlImage: 'https://example.com/artist1.jpg'
  }),
  new User({
    uuid: 'user-2',
    login: 'LabelOne',
    email: 'label1@example.com',
    roles: ['LABEL'],
    urlImage: 'https://example.com/label1.jpg'
  }),
];

// Моковые данные песен
const songsMock: Song[] = [
  new Song({
    uuid: 'song-1',
    name: 'Hit Song',
    avgRating: 4.8,
    url: '/music/hit-song.mp3',
    urlImage: 'https://example.com/hit-song.jpg',
    status: SongStatus.APPROVED,
    authorUUID: 'user-1',
    tags: [],
    fileUUID: 'file-1'
  }),
  new Song({
    uuid: 'song-2',
    name: 'New Track',
    avgRating: 4.2,
    url: '/music/new-track.mp3',
    urlImage: 'https://example.com/new-track.jpg',
    status:  SongStatus.APPROVED,
    authorUUID: 'user-1',
    tags: [],
    fileUUID: 'file-2'
  }),
];

// Моковые данные промо-заявок
const requestsMock: PromotionRequest[] = [
  new PromotionRequest({
    uuid: 'req-1',
    songUUID: 'song-1',
    msg: 'Хочу продвигать этот трек в топ чартов',
    dispatchTime: '2023-06-20T10:00:00',
    status: PromotionStatus.AWAITING_PROMOTION
  }),
  new PromotionRequest({
    uuid: 'req-2',
    songUUID: 'song-2',
    msg: 'Нужна помощь в продвижении нового сингла',
    dispatchTime: '2023-06-18T14:30:00',
    status: PromotionStatus.PROMOTED,
    confirmationTime: '2023-06-19T11:20:00'
  }),
  new PromotionRequest({
    uuid: 'req-3',
    songUUID: 'song-1',
    msg: 'Запрос на продвижение в соцсетях',
    dispatchTime: '2023-06-15T09:15:00',
    status: PromotionStatus.PROCESSING,
    confirmationTime: '2023-06-16T16:45:00'
  }),
  new PromotionRequest({
    uuid: 'req-4',
    songUUID: 'song-2',
    msg: 'Продвижение на радио',
    dispatchTime: '2023-06-10T12:00:00',
    status: PromotionStatus.AWAITING_PROMOTION
  }),
  new PromotionRequest({
    uuid: 'req-5',
    songUUID: 'song-2',
    msg: 'Продвижение на радио',
    dispatchTime: '2023-06-10T12:00:00',
    status: PromotionStatus.AWAITING_PROMOTION
  }),
  new PromotionRequest({
    uuid: 'req-6',
    songUUID: 'song-2',
    msg: 'Продвижение на радио',
    dispatchTime: '2023-06-10T12:00:00',
    status: PromotionStatus.PROCESSING
  }),
  new PromotionRequest({
    uuid: 'req-7',
    songUUID: 'song-2',
    msg: 'Продвижение на радио',
    dispatchTime: '2023-06-10T12:00:00',
    status: PromotionStatus.PROCESSING
  }),
  new PromotionRequest({
    uuid: 'req-8',
    songUUID: 'song-2',
    msg: 'Продвижение на радио',
    dispatchTime: '2023-06-10T12:00:00',
    status: PromotionStatus.PROMOTED
  }),
  new PromotionRequest({
    uuid: 'req-9',
    songUUID: 'song-2',
    msg: 'Продвижение на радио',
    dispatchTime: '2023-06-10T12:00:00',
    status: PromotionStatus.PROMOTED
  }),
];

const statusTabs: ILink[] = [
  { label: 'Ожидают', icon: 'pi pi-clock' },
  { label: 'Одобрены', icon: 'pi pi-check' },
  { label: 'В процессе', icon: 'pi pi-spinner' },
];

const getStatusForTab = (tabIndex: number): PromotionStatus => {
  switch(tabIndex) {
    case 0: return PromotionStatus.AWAITING_PROMOTION;
    case 1: return PromotionStatus.PROMOTED;
    case 2: return PromotionStatus.PROCESSING;
    default: return PromotionStatus.AWAITING_PROMOTION;
  }
};

const tabStatusMap: Record<number, PromotionStatus> = {
  0: PromotionStatus.AWAITING_PROMOTION,
  1: PromotionStatus.PROMOTED,
  2: PromotionStatus.PROCESSING
};

type SortOption = {
  label: string;
  value: string;
};

const PromotionRequestsPage = () => {
  const [requests, setRequests] = useState<PromotionRequest[]>(requestsMock);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>('date-desc');
  const [selectedRequest, setSelectedRequest] = useState<PromotionRequest | null>(null);
  const [editRequest, setEditRequest] = useState<PromotionRequest | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const itemsPerPage = 5;

  const sortOptions: SortOption[] = [
    { label: 'По дате (новые)', value: 'date-desc' },
    { label: 'По дате (старые)', value: 'date-asc' },
    { label: 'По песне (A-Z)', value: 'song-asc' },
    { label: 'По песне (Z-A)', value: 'song-desc' },
  ];

  const sortRequests = (requests: PromotionRequest[]) => {
    return [...requests].sort((a, b) => {
      const songA = songsMock.find(s => s.uuid === a.songUUID)?.name || '';
      const songB = songsMock.find(s => s.uuid === b.songUUID)?.name || '';
      
      switch (sortOption) {
        case 'song-asc': return songA.localeCompare(songB);
        case 'song-desc': return songB.localeCompare(songA);
        case 'date-asc': return a.dispatchTime.localeCompare(b.dispatchTime);
        case 'date-desc': return b.dispatchTime.localeCompare(a.dispatchTime);
        default: return 0;
      }
    });
  };

 const filteredRequests = sortRequests(
    requests.filter(request => {
      // Получаем статус для текущей вкладки
      const currentStatus = tabStatusMap[activeTab];
      const statusMatch = request.status === currentStatus;
      
      const song = songsMock.find(s => s.uuid === request.songUUID)?.name || '';
      const searchMatch = searchQuery === '' || 
        request.msg.toLowerCase().includes(searchQuery.toLowerCase()) || 
        song.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && searchMatch;
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

  const getStatusBadgeClass = (status: PromotionStatus) => {
    switch (status) {
      case PromotionStatus.PROMOTED: return s.approved;
      case PromotionStatus.PROCESSING: return s.processing;
      case PromotionStatus.AWAITING_PROMOTION: return s.awaiting;
      default: return '';
    }
  };

  const getStatusLabel = (status: PromotionStatus) => {
    switch (status) {
      case PromotionStatus.PROMOTED: return 'Одобрена';
      case PromotionStatus.PROCESSING: return 'В процессе';
      case PromotionStatus.AWAITING_PROMOTION: return 'Ожидает';
      default: return '';
    }
  };

  const getSongName = (songUUID: string) => {
    return songsMock.find(song => song.uuid === songUUID)?.name || 'Неизвестная песня';
  };

  const getArtistName = (songUUID: string) => {
    const song = songsMock.find(s => s.uuid === songUUID);
    if (!song) return 'Неизвестный';
    return usersMock.find(u => u.uuid === song.authorUUID)?.login || 'Неизвестный';
  };

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req => 
      req.uuid === requestId ? { 
        ...req, 
        status: PromotionStatus.PROMOTED,
        confirmationTime: new Date().toISOString()
      } : req
    ));
  };

  const handleProcess = (requestId: string) => {
    setRequests(requests.map(req => 
      req.uuid === requestId ? { 
        ...req, 
        status: PromotionStatus.PROCESSING,
        confirmationTime: new Date().toISOString()
      } : req
    ));
  };

  const handleSaveEdit = () => {
    if (!editRequest) return;
    
    setRequests(requests.map(req => 
      req.uuid === editRequest.uuid ? { 
        ...req, 
        msg: editMessage
      } : req
    ));
    setEditRequest(null);
  };

  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        <PfTabMenu 
          list={statusTabs} 
          activeIndex={activeTab} 
          onTabChange={(index) => {
            setActiveTab(index);
            setCurrentPage(1); // Сбрасываем пагинацию при переключении вкладки
          }} 
        />
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по сообщению или песне"
            />
          </div>
          
          <div className={s.sortContainer}>
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={(e) => setSortOption(e.value)}
              placeholder="Сортировка"
              className={s.sortDropdown}
              optionLabel="label"
              optionValue="value"
            />
          </div>
        </div>
      </div>

      <div className={s.requestsList}>
        {paginatedRequests.length > 0 ? (
          <table className={s.requestsTable}>
            <thead>
              <tr>
                <th>Песня</th>
                <th>Артист</th>
                <th>Сообщение</th>
                <th>Дата отправки</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((request) => (
                <tr key={request.uuid} className={s.requestRow}>
                  <td>{getSongName(request.songUUID)}</td>
                  <td>{getArtistName(request.songUUID)}</td>
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
                  <td className={s.actionsCell}>
                    <div className={s.actions}>
                      <button 
                        className={`${s.actionButton} ${s.infoButton}`}
                        onClick={() => setSelectedRequest(request)}
                        title="Просмотр"
                      >
                        <i className="pi pi-eye"></i>
                      </button>
                      
                      {request.status === PromotionStatus.AWAITING_PROMOTION && (
                        <>
                          <button 
                            className={`${s.actionButton} ${s.editButton}`}
                            onClick={() => {
                              setEditRequest(request);
                              setEditMessage(request.msg);
                            }}
                            title="Редактировать"
                          >
                            <i className="pi pi-pencil"></i>
                          </button>
                          
                          <button 
                            className={`${s.actionButton} ${s.approveButton}`}
                            onClick={() => handleApprove(request.uuid)}
                            title="Одобрить"
                          >
                            <i className="pi pi-check"></i>
                          </button>
                        </>
                      )}
                      
                      {request.status === PromotionStatus.PROMOTED && (
                        <button 
                          className={`${s.actionButton} ${s.processButton}`}
                          onClick={() => handleProcess(request.uuid)}
                          title="В процесс"
                        >
                          <i className="pi pi-spinner"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={s.emptyState}>
            {searchQuery ? (
              <p>Заявки не найдены по запросу "{searchQuery}"</p>
            ) : (
              <p>Нет заявок в этой категории</p>
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

      {/* Диалог просмотра заявки */}
      <Dialog 
        visible={!!selectedRequest} 
        onHide={() => setSelectedRequest(null)}
        header="Детали промо-заявки"
        className={s.requestModal}
      >
        {selectedRequest && (
          <div className={s.requestDetails}>
            <div className={s.detailSection}>
              <h4>Песня</h4>
              <p>{getSongName(selectedRequest.songUUID)}</p>
            </div>
            
            <div className={s.detailSection}>
              <h4>Артист</h4>
              <p>{getArtistName(selectedRequest.songUUID)}</p>
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
            
            {selectedRequest.confirmationTime && (
              <div className={s.detailSection}>
                <h4>Дата решения</h4>
                <p>{formatDateTime(selectedRequest.confirmationTime)}</p>
              </div>
            )}
            
            <div className={s.detailSection}>
              <h4>Сообщение</h4>
              <div className={s.messageContent}>
                {selectedRequest.msg}
              </div>
            </div>
          </div>
        )}
      </Dialog>

      {/* Диалог редактирования заявки */}
      <Dialog 
        visible={!!editRequest} 
        onHide={() => setEditRequest(null)}
        header="Редактирование промо-заявки"
        className={s.requestModal}
      >
        {editRequest && (
          <div className={s.requestDetails}>
            <div className={s.detailSection}>
              <h4>Песня</h4>
              <p>{getSongName(editRequest.songUUID)}</p>
            </div>
            
            <div className={s.detailSection}>
              <h4>Сообщение</h4>
              <PfInputText
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                style={{width: '100%'}}
              />
            </div>
            
            <div className={s.dialogActions}>
              <button 
                className={s.cancelButton}
                onClick={() => setEditRequest(null)}
              >
                Отмена
              </button>
              <button 
                className={s.saveButton}
                onClick={handleSaveEdit}
              >
                Сохранить
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default PromotionRequestsPage;