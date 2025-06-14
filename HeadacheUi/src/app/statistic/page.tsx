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
import { author1Albums, author1Songs } from '@/mocks/mockAuthor1AlbumsAndSongs';

// Сопоставление жанров с русскими названиями
const genreRu: Record<string, string> = {
  'Electronic': 'Электроника',
  'Ambient': 'Эмбиент',
  'Rock': 'Рок',
  'Jazz': 'Джаз',
  'Classical': 'Классика',
  'Pop': 'Поп',
  'Hip-Hop': 'Хип-хоп',
  'Indie': 'Инди',
  'Instrumental': 'Инструментал',
  'Chill': 'Чилл',
  'Dance': 'Дэнс',
  'Folk': 'Фолк',
  'Lo-fi': 'Лоу-фай',
  'Retro': 'Ретро',
  'Synthwave': 'Синтвейв'
};

const StatisticsPage: FC = () => {
  // Данные для author111
  const albumsCount = author1Albums.length;
  const tracksCount = author1Songs.length;
  const likesCount = 4; // хардкод
  const promoRequestsCount = 11; // хардкод

  // Средняя оценка
  // const avgRating =
  //   author1Songs.length > 0
  //     ? (
  //         author1Songs.reduce((sum, song) => sum + (song.avgRating || 0), 0) /
  //         author1Songs.length
  //       ).toFixed(2)
  //     : '0';

  const avgRating = 7.8

  // График: Средние оценки треков (название и оценка)
  const ratingData = author1Songs.map(song => ({
    name: song.name,
    оценки: song.avgRating,
  }));

  // График: распределение по жанрам (Tag.tagName)
  const genreCount: Record<string, number> = {};
  author1Songs.forEach(song => {
    (song.tags || []).forEach(tag => {
      genreCount[tag.tagName] = (genreCount[tag.tagName] || 0) + 1;
    });
  });
  const genreData = Object.entries(genreCount).map(([name, value]) => ({
    name:  name,
    value,
    orig: name
  }));

  const playsData = [
    { name: 'Пн', прослушивания: 10 },
    { name: 'Вт', прослушивания: 20 },
    { name: 'Ср', прослушивания: 20 },
    { name: 'Чт', прослушивания: 15 },
    { name: 'Пт', прослушивания: 12 },
    { name: 'Сб', прослушивания: 8 },
     { name: 'Вс', прослушивания: 35 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7c192a', '#a3e635', '#f472b6', '#f59e42'];

  return (
    <div className={styles.statisticsPage}>
      <h1 className={styles.title}>Статистика ваших треков</h1>

      {/* Блок с основной статистикой */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Общее количество прослушиваний (за неделю)</h3>
          <p className={styles.statValue}>120</p>
        </div>
        <div className={styles.statCard}>
          <h3>Рейтинг</h3>
          <p className={styles.statValue}>{avgRating}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Количество альбомов</h3>
          <p className={styles.statValue}>{albumsCount}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Количество треков</h3>
          <p className={styles.statValue}>{tracksCount}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Лайки</h3>
          <p className={styles.statValue}>{likesCount}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Заявки на продвижение</h3>
          <p className={styles.statValue}>{promoRequestsCount}</p>
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
          <h2>Прослушивания по дням недели</h2>
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
          <div className={styles.chartWrapper} style={{ display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'center' }}>
            <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 220 }}>
              <ResponsiveContainer width={180} height={200}>
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={false}
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, 'Количество']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 15 }}>
                {genreData.map((g, i) => (
                  <li key={g.orig} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{
                      display: 'inline-block',
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: COLORS[i % COLORS.length],
                      marginRight: 8
                    }} />
                    <span>{g.name}</span>
                    <span style={{ marginLeft: 8, color: '#888' }}>{g.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;