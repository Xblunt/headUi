'use client';

import s from './style.module.scss';

const StatisticSchemePage = () => {
  return (
    <div className={s.statisticsPage}>
      <div className={s.title}>[ Статистика ваших треков ]</div>
      <div className={s.statsGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={s.statCard}>
            <div className={s.statCardTitle}>[ Метрика ]</div>
            <div className={s.statValue}>[ 123 ]</div>
          </div>
        ))}
      </div>
      <div className={s.mainChart}>
        <div className={s.chartTitle}>[ График 1 (BarChart) ]</div>
        <div className={s.chartPlaceholder}>[ Chart ]</div>
      </div>
      <div className={s.twoCharts}>
        <div className={s.chartCard}>
          <div className={s.chartTitle}>[ График 2 (LineChart) ]</div>
          <div className={s.chartPlaceholder}>[ Chart ]</div>
        </div>
        <div className={s.chartCard}>
          <div className={s.chartTitle}>[ График 3 (PieChart) ]</div>
          <div className={s.chartPlaceholder}>[ Chart ]</div>
        </div>
      </div>
    </div>
  );
};

export default StatisticSchemePage;
