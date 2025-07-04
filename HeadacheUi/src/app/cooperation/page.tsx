'use client';

import React, { useState } from 'react';
import { CooperationRequest, CooperationStatus } from '@/models';
import { mockCooperationRequests } from '@/mocks/mockCooperationRequests';
import { mockUsers } from '@/mocks/mockUsers';
import Modal from '@/components/modal';
import s from '../music/style.module.scss';

const statusLabels: Record<CooperationStatus, string> = {
  [CooperationStatus.AWAITING]: 'Ожидает',
  [CooperationStatus.APPROVED]: 'Одобрено',
  [CooperationStatus.REJECTED]: 'Отклонено',
};

const CooperationPage = () => {
  const requests = mockCooperationRequests.filter(r => r.labelUUID === 'label78');

  const [editRequest, setEditRequest] = useState<CooperationRequest | null>(null);
  const [editMsg, setEditMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [localRequests, setLocalRequests] = useState<CooperationRequest[]>(requests);

  const handleEdit = (req: CooperationRequest) => {
    setEditRequest(req);
    setEditMsg(req.msg);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editRequest) return;
    setLocalRequests(reqs =>
      reqs.map(r =>
        r.uuid === editRequest.uuid ? { ...r, msg: editMsg } : r
      )
    );
    setShowModal(false);
    setEditRequest(null);
    setEditMsg('');
  };

  const awaiting = localRequests.filter(r => r.status === CooperationStatus.AWAITING);
  const approved = localRequests.filter(r => r.status === CooperationStatus.APPROVED);
  const rejected = localRequests.filter(r => r.status === CooperationStatus.REJECTED);

  return (
    <div className='wrapper' >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 24,
        marginTop: '40px',
        alignItems: 'flex-start'
      }}>
        <div>
         <div style={{fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#333', paddingBottom:'10px', borderBottom: '1px solid #ddd',  textAlign: 'start' }}>Ожидают</div>
          {awaiting.length === 0 && <div style={{ color: '#aaa', textAlign: 'center' }}>Нет заявок</div>}
          {awaiting.map(req => {
            const author = mockUsers.find(u => u.uuid === req.authorUUID);
            return (
              <div key={req.uuid} style={{
                background: '#fff',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(60,60,100,0.06)',
                padding: 20,
                marginBottom: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{ fontWeight: 600, fontSize: 17 }}>
                  Автор: {author?.login || req.authorUUID}
                </div>
                <div style={{ color: '#444' }}>
                  Сообщение: {req.msg}
                </div>
                <div style={{ color: '#888', fontSize: 15 }}>
                  Статус: <b>{statusLabels[req.status]}</b>
                </div>
                <button
                  className={s.saveButton}
                  style={{ minWidth: 110, marginTop: 8, alignSelf: 'flex-end', borderRadius:'4px' }}
                  onClick={() => handleEdit(req)}
                >
                  Редактировать
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <div style={{fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#333', paddingBottom:'10px', borderBottom: '1px solid #ddd', textAlign: 'start' }}>Одобрено</div>
          {approved.length === 0 && <div style={{ color: '#aaa', textAlign: 'center' }}>Нет заявок</div>}
          {approved.map(req => {
            const author = mockUsers.find(u => u.uuid === req.authorUUID);
            return (
              <div key={req.uuid} style={{
                background: '#fff',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(60,60,100,0.06)',
                padding: 20,
                marginBottom: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{ fontWeight: 600, fontSize: 17 }}>
                  Автор: {author?.login || req.authorUUID}
                </div>
                <div style={{ color: '#444' }}>
                  Сообщение: {req.msg}
                </div>
                <div style={{ color: '#888', fontSize: 15 }}>
                  Статус: <b>{statusLabels[req.status]}</b>
                </div>
              </div>
            );
          })}
        </div>
        <div>
 <div style={{fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#333',  paddingBottom:'10px', borderBottom: '1px solid #ddd', textAlign: 'start' }}>Отклонено</div>
          {rejected.length === 0 && <div style={{ color: '#aaa', textAlign: 'center' }}>Нет заявок</div>}
          {rejected.map(req => {
            const author = mockUsers.find(u => u.uuid === req.authorUUID);
            return (
              <div key={req.uuid} style={{
                background: '#fff',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(60,60,100,0.06)',
                padding: 20,
                marginBottom: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{ fontWeight: 600, fontSize: 17 }}>
                  Автор: {author?.login || req.authorUUID}
                </div>
                <div style={{ color: '#444' }}>
                  Сообщение: {req.msg}
                </div>
                <div style={{ color: '#888', fontSize: 15 }}>
                  Статус: <b>{statusLabels[req.status]}</b>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && editRequest && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Редактировать заявку"
        >
          <div style={{ padding: 24, minWidth: 320 }}>
            <div style={{ marginBottom: 14 }}>
              <b>Автор:</b> {mockUsers.find(u => u.uuid === editRequest.authorUUID)?.login || editRequest.authorUUID}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 500, marginBottom: 6, display: 'block' }}>Сообщение</label>
              <textarea
                value={editMsg}
                onChange={e => setEditMsg(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  border: '1.5px solid #e3e6f0',
                  padding: 10,
                  fontSize: 15,
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 18 }}>
              <button className={s.cancelButton} onClick={() => setShowModal(false)}>Отмена</button>
              <button className={s.saveButton} onClick={handleSave}>Сохранить</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CooperationPage;
