import { CooperationRequest, CooperationStatus } from "@/models";
import { makeAutoObservable } from "mobx";

class CooperationStore {
  private _requests: CooperationRequest[] = [];
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;
  private _selectedRequest: CooperationRequest | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get requests() {
    return this._requests;
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

  get selectedRequest() {
    return this._selectedRequest;
  }

  get awaitingRequests() {
    return this._requests.filter(request => request.status === CooperationStatus.AWAITING);
  }

  get approvedRequests() {
    return this._requests.filter(request => request.status === CooperationStatus.APPROVED);
  }

  get rejectedRequests() {
    return this._requests.filter(request => request.status === CooperationStatus.REJECTED);
  }

  setRequests = (requests: CooperationRequest[]) => {
    this._requests = requests;
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

  setSelectedRequest = (request: CooperationRequest | null) => {
    this._selectedRequest = request;
  };

  addRequest = (request: CooperationRequest) => {
    this._requests.unshift(request);
  };

  updateRequest = (requestId: string, updates: Partial<CooperationRequest>) => {
    const index = this._requests.findIndex(request => request.uuid === requestId);
    if (index !== -1) {
      this._requests[index] = { ...this._requests[index], ...updates };
    }
  };

  removeRequest = (requestId: string) => {
    this._requests = this._requests.filter(request => request.uuid !== requestId);
  };

  approveRequest = (requestId: string) => {
    this.updateRequest(requestId, { status: CooperationStatus.APPROVED });
  };

  rejectRequest = (requestId: string) => {
    this.updateRequest(requestId, { status: CooperationStatus.REJECTED });
  };

  clearError = () => {
    this._error = null;
  };
}

export default CooperationStore;
