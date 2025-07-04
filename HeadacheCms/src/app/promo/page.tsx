'use client';

import { useState } from "react";
import { PromotionRequest, PromotionStatus, Song, SongStatus, User } from "@/models";
import { PfInputText } from "@/components/ui/input-text";
import { Dropdown } from 'primereact/dropdown';
import s from './style.module.scss';
import { Pagination } from "@/components/pagination";
import { Dialog } from 'primereact/dialog';
import { TabMenu } from 'primereact/tabmenu';
import { ILink } from "@/models";
import { mockUsers } from '@/mocks/mockUsers';
import { mockSongs } from '@/mocks/mockSongs';
import { mockPromotions } from '@/mocks/mockPromotions';
import { TabMenuNoBg } from "../users/TabMenuNoBg";

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
  const [requests, setRequests] = useState<PromotionRequest[]>(mockPromotions);
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
      const songA = mockSongs.find(s => s.uuid === a.songUUID)?.name || '';
      const songB = mockSongs.find(s => s.uuid === b.songUUID)?.name || '';
      
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
      const currentStatus = tabStatusMap[activeTab];
      const statusMatch = request.status === currentStatus;
      
      const song = mockSongs.find(s => s.uuid === request.songUUID)?.name || '';
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
    return mockSongs.find(song => song.uuid === songUUID)?.name || 'Неизвестная песня';
  };

  const getArtistName = (songUUID: string) => {
    const song = mockSongs.find(s => s.uuid === songUUID);
    if (!song) return 'Неизвестный';
    return mockUsers.find(u => u.uuid === song.authorUUID)?.login || 'Неизвестный';
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

  // --- Сброс пагинации при смене таба ---
  const handleTabChange = (e: any) => {
    setActiveTab(e.index);
    setCurrentPage(1);
  };

  return (
    <div className={"wrapper"}>
      <div className={s.header}>
        <TabMenuNoBg
          model={statusTabs}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
        />
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <PfInputText
              value={searchQuery}
              style={{width: '100%'}}
              title="Поиск..."
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

      <Dialog 
        visible={!!selectedRequest} 
        onHide={() => setSelectedRequest(null)}
        header="Детали промо-заявки"
        className={s.requestModal}
        style={{ minWidth: 750, width: 750 }}
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

      <Dialog 
        visible={!!editRequest} 
        onHide={() => setEditRequest(null)}
        header="Редактирование промо-заявки"
        className={s.requestModal}
        style={{ minWidth: 750, width: 750 }}
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
                className={`${s.cancelButton} ${s.modalButton}`}
                onClick={() => setEditRequest(null)}
              >
                Отмена
              </button>
              <button 
                className={`${s.saveButton} ${s.modalButton}`}
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