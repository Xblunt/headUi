import { CooperationRequest } from "@/models";
import { makeAutoObservable } from "mobx";

class CooperationStore {
  private _cooperations: CooperationRequest[] = [];
  private _loading: boolean = false;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get cooperations() {
    return this._cooperations;
  }

  get loading() {
    return this._loading;
  }

  get canEdit() {
    return this._canEdit;
  }

  setCooperations = (cooperations: CooperationRequest[]) => {
    this._cooperations = cooperations;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default CooperationStore; 