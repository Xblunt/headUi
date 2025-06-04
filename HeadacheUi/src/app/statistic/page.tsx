'use client';

import { FC } from 'react';
import styles from './style.module.scss';
import { 
  BarChart, Bar, 
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

const StatisticsPage: FC = () => {
  // Данные для графиков
  const ratingData = [
    { name: 'Трек 1', оценки: 4.5 },
    { name: 'Трек 2', оценки: 3.8 },
    { name: 'Трек 3', оценки: 4.2 },
    { name: 'Трек 4', оценки: 4.7 },
    { name: 'Трек 5', оценки: 3.9 },
  ];

  const playsData = [
    { name: 'Янв', прослушивания: 400 },
    { name: 'Фев', прослушивания: 300 },
    { name: 'Мар', прослушивания: 600 },
    { name: 'Апр', прослушивания: 800 },
    { name: 'Май', прослушивания: 500 },
    { name: 'Июн', прослушивания: 900 },
  ];

  const genreData = [
    { name: 'Рок', value: 35 },
    { name: 'Поп', value: 25 },
    { name: 'Хип-хоп', value: 20 },
    { name: 'Электроника', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={styles.statisticsPage}>
      <h1 className={styles.title}>Статистика ваших треков</h1>
      
      {/* Блок с основной статистикой */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Общее количество прослушиваний</h3>
          <p className={styles.statValue}>12,458</p>
        </div>
        <div className={styles.statCard}>
          <h3>Средняя оценка</h3>
          <p className={styles.statValue}>4.2</p>
        </div>
        <div className={styles.statCard}>
          <h3>Количество треков</h3>
          <p className={styles.statValue}>24</p>
        </div>
        <div className={styles.statCard}>
          <h3>Подписчики</h3>
          <p className={styles.statValue}>1,245</p>
        </div>
      </div>

      {/* Основной график */}
      <div className={styles.mainChart}>
        <h2>Средние оценки треков</h2>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="оценки" fill="#7c192a" name="Средняя оценка" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Два графика в ряд */}
      <div className={styles.twoCharts}>
        <div className={styles.chartCard}>
          <h2>Прослушивания по месяцам</h2>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={playsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="прослушивания" 
                  stroke="#7c192a" 
                  activeDot={{ r: 6 }}
                  name="Прослушивания"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2>Распределение по жанрам</h2>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Доля']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;