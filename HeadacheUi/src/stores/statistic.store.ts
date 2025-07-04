import { makeAutoObservable } from "mobx";

interface Statistic {
  id: string;
  type: string;
  data: any;
  period: string;
  createdAt: string;
}

interface UserStatistic {
  userId: string;
  totalSongs: number;
  totalAlbums: number;
  totalPlays: number;
  totalLikes: number;
  avgRating: number;
  lastActivity: string;
}

interface SongStatistic {
  songId: string;
  totalPlays: number;
  totalLikes: number;
  avgRating: number;
  playTime: number;
  lastPlayed: string;
}

class StatisticStore {
  private _statistics: Statistic[] = [];
  private _userStatistics: UserStatistic[] = [];
  private _songStatistics: SongStatistic[] = [];
  private _currentPeriod: string = 'daily';
  private _loading: boolean = false;
  private _error: string | null = null;
  private _canEdit: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get statistics() {
    return this._statistics;
  }

  get userStatistics() {
    return this._userStatistics;
  }

  get songStatistics() {
    return this._songStatistics;
  }

  get currentPeriod() {
    return this._currentPeriod;
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

  get topUsers() {
    return this._userStatistics
      .sort((a, b) => b.totalPlays - a.totalPlays)
      .slice(0, 10);
  }

  get topSongs() {
    return this._songStatistics
      .sort((a, b) => b.totalPlays - a.totalPlays)
      .slice(0, 10);
  }

  get statisticsByPeriod() {
    return this._statistics.filter(stat => stat.period === this._currentPeriod);
  }

  setStatistics = (statistics: Statistic[]) => {
    this._statistics = statistics;
  };

  setUserStatistics = (userStatistics: UserStatistic[]) => {
    this._userStatistics = userStatistics;
  };

  setSongStatistics = (songStatistics: SongStatistic[]) => {
    this._songStatistics = songStatistics;
  };

  setCurrentPeriod = (period: string) => {
    this._currentPeriod = period;
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

  addStatistic = (statistic: Statistic) => {
    this._statistics.push(statistic);
  };

  updateStatistic = (statisticId: string, updates: Partial<Statistic>) => {
    const index = this._statistics.findIndex(stat => stat.id === statisticId);
    if (index !== -1) {
      this._statistics[index] = { ...this._statistics[index], ...updates };
    }
  };

  removeStatistic = (statisticId: string) => {
    this._statistics = this._statistics.filter(stat => stat.id !== statisticId);
  };

  getStatisticById = (statisticId: string) => {
    return this._statistics.find(stat => stat.id === statisticId) || null;
  };

  getUserStatistic = (userId: string) => {
    return this._userStatistics.find(stat => stat.userId === userId) || null;
  };

  getSongStatistic = (songId: string) => {
    return this._songStatistics.find(stat => stat.songId === songId) || null;
  };

  getStatisticsByType = (type: string) => {
    return this._statistics.filter(stat => stat.type === type);
  };

  getDailyStatistics = (date: string) => {
    return this._statistics.filter(stat => 
      stat.period === 'daily' && stat.createdAt.includes(date)
    );
  };

  getWeeklyStatistics = (week: string) => {
    return this._statistics.filter(stat => 
      stat.period === 'weekly' && stat.createdAt.includes(week)
    );
  };

  getMonthlyStatistics = (month: string) => {
    return this._statistics.filter(stat => 
      stat.period === 'monthly' && stat.createdAt.includes(month)
    );
  };

  getYearlyStatistics = (year: string) => {
    return this._statistics.filter(stat => 
      stat.period === 'yearly' && stat.createdAt.includes(year)
    );
  };

  clearError = () => {
    this._error = null;
  };
}

export default StatisticStore;
