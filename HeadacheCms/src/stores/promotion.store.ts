import { PromotionRequest } from "@/models";
import { makeAutoObservable } from "mobx";

class PromotionStore {
  private _promotions: PromotionRequest[] = [];
  private _loading: boolean = false;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get promotions() {
    return this._promotions;
  }

  get loading() {
    return this._loading;
  }

  get canEdit() {
    return this._canEdit;
  }

  setPromotions = (promotions: PromotionRequest[]) => {
    this._promotions = promotions;
  };

  setLoading = (loading: boolean) => {
    this._loading = loading;
  };

  setCanEdit = (canEdit: boolean) => {
    this._canEdit = canEdit;
  };
}

export default PromotionStore; 