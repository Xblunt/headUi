import { mockSongs } from './mockSongs';

// Используем только одобренные треки
const approvedSongs = mockSongs.filter(song => song.status === 'APPROVED');

// Вспомогательная функция для случайной выборки без повторов
function getRandomUnique<T>(arr: T[], count: number, exclude: Set<T> = new Set()): T[] {
  const filtered = arr.filter(item => !exclude.has(item));
  const result: T[] = [];
  const used = new Set<number>();
  while (result.length < count && used.size < filtered.length) {
    const idx = Math.floor(Math.random() * filtered.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(filtered[idx]);
    }
  }
  return result;
}

// Первый набор: 20 случайных треков из одобренных
const set1 = getRandomUnique(approvedSongs, 20);

// Второй набор: 20 случайных треков, которых нет в первом наборе
const set1Set = new Set(set1);
const set2 = getRandomUnique(approvedSongs, 20, set1Set);

// Третий набор: 20 случайных треков из одобренных (могут быть любые, даже из первых двух наборов)
const set3 = getRandomUnique(approvedSongs, 20);

// Дополнительные наборы (фиксированные, для стабильности тестов)
const set4 = approvedSongs.slice(0, 40);
const set5 = approvedSongs.slice(20, 40);
const set6 = [
  approvedSongs[10], approvedSongs[30], approvedSongs[50], approvedSongs[70],
  approvedSongs[5], approvedSongs[25], approvedSongs[45], approvedSongs[65],
  approvedSongs[15], approvedSongs[20], approvedSongs[55], approvedSongs[75],
  approvedSongs[1], approvedSongs[21], approvedSongs[41], approvedSongs[61],
  approvedSongs[9], approvedSongs[29], approvedSongs[49], approvedSongs[14]
];

export const mockSongSets = {
  set1,
  set2,
  set3,
  set4,
  set5,
  set6,
};
