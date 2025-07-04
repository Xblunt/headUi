import { PromotionRequest, PromotionStatus } from "@/models";
import { makeAutoObservable } from "mobx";

class PromoStore {
  private _promotions: PromotionRequest[] = [];
  private _currentPromotion: PromotionRequest | null = null;
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;
  private _isEditing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get promotions() {
    return this._promotions;
  }

  get currentPromotion() {
    return this._currentPromotion;
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

  get awaitingPromotions() {
    return this._promotions.filter(promo => promo.status === PromotionStatus.AWAITING_PROMOTION);
  }

  get promotedPromotions() {
    return this._promotions.filter(promo => promo.status === PromotionStatus.PROMOTED);
  }

  get processingPromotions() {
    return this._promotions.filter(promo => promo.status === PromotionStatus.PROCESSING);
  }

  setPromotions = (promotions: PromotionRequest[]) => {
    this._promotions = promotions;
  };

  setCurrentPromotion = (promotion: PromotionRequest | null) => {
    this._currentPromotion = promotion;
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

  addPromotion = (promotion: PromotionRequest) => {
    this._promotions.unshift(promotion);
  };

  updatePromotion = (promotionId: string, updates: Partial<PromotionRequest>) => {
    const index = this._promotions.findIndex(promo => promo.uuid === promotionId);
    if (index !== -1) {
      this._promotions[index] = { ...this._promotions[index], ...updates };
    }
    if (this._currentPromotion && this._currentPromotion.uuid === promotionId) {
      this._currentPromotion = { ...this._currentPromotion, ...updates };
    }
  };

  removePromotion = (promotionId: string) => {
    this._promotions = this._promotions.filter(promo => promo.uuid !== promotionId);
  };

  getPromotionById = (promotionId: string) => {
    return this._promotions.find(promo => promo.uuid === promotionId) || null;
  };

  getPromotionsBySong = (songUUID: string) => {
    return this._promotions.filter(promo => promo.songUUID === songUUID);
  };

  approvePromotion = (promotionId: string) => {
    this.updatePromotion(promotionId, { status: PromotionStatus.PROMOTED });
  };

  rejectPromotion = (promotionId: string) => {
    this.updatePromotion(promotionId, { status: PromotionStatus.AWAITING_PROMOTION });
  };

  processPromotion = (promotionId: string) => {
    this.updatePromotion(promotionId, { status: PromotionStatus.PROCESSING });
  };

  clearError = () => {
    this._error = null;
  };
}

export default PromoStore;
