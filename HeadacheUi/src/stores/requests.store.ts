import { makeAutoObservable } from "mobx";

interface Request {
  id: string;
  type: string;
  status: string;
  data: any;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

class RequestsStore {
  private _requests: Request[] = [];
  private _currentRequest: Request | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;
  private _isEditing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get requests() {
    return this._requests;
  }

  get currentRequest() {
    return this._currentRequest;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get canEdit() {
    return this._canEdit;
  }

  get isEditing() {
    return this._isEditing;
  }

  get pendingRequests() {
    return this._requests.filter(request => request.status === 'pending');
  }

  get approvedRequests() {
    return this._requests.filter(request => request.status === 'approved');
  }

  get rejectedRequests() {
    return this._requests.filter(request => request.status === 'rejected');
  }

  setRequests = (requests: Request[]) => {
    this._requests = requests;
  };

  setCurrentRequest = (request: Request | null) => {
    this._currentRequest = request;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setError = (error: string | null) => {
    this._error = error;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };

  setIsEditing = (isEditing: boolean) => {
    this._isEditing = isEditing;
  };

  addRequest = (request: Request) => {
    this._requests.unshift(request);
  };

  updateRequest = (requestId: string, updates: Partial<Request>) => {
    const index = this._requests.findIndex(request => request.id === requestId);
    if (index !== -1) {
      this._requests[index] = { ...this._requests[index], ...updates };
    }
    if (this._currentRequest && this._currentRequest.id === requestId) {
      this._currentRequest = { ...this._currentRequest, ...updates };
    }
  };

  removeRequest = (requestId: string) => {
    this._requests = this._requests.filter(request => request.id !== requestId);
  };

  getRequestById = (requestId: string) => {
    return this._requests.find(request => request.id === requestId) || null;
  };

  getRequestsByType = (type: string) => {
    return this._requests.filter(request => request.type === type);
  };

  getRequestsByStatus = (status: string) => {
    return this._requests.filter(request => request.status === status);
  };

  getRequestsByUser = (userId: string) => {
    return this._requests.filter(request => request.userId === userId);
  };

  approveRequest = (requestId: string) => {
    this.updateRequest(requestId, { status: 'approved' });
  };

  rejectRequest = (requestId: string) => {
    this.updateRequest(requestId, { status: 'rejected' });
  };

  bulkApproveRequests = (requestIds: string[]) => {
    requestIds.forEach(id => this.approveRequest(id));
  };

  bulkRejectRequests = (requestIds: string[]) => {
    requestIds.forEach(id => this.rejectRequest(id));
  };

  clearError = () => {
    this._error = null;
  };
}

export default RequestsStore;
