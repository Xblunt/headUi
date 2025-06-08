import { mockAlbums } from './mockAlbums';

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

// Первый сет: 10 случайных альбомов
const albumSet1 = getRandomUnique(mockAlbums, 12);

// Второй сет: 10 случайных альбомов, которых нет в первом сете
const albumSet1Set = new Set(albumSet1);
const albumSet2 = getRandomUnique(mockAlbums, 12, albumSet1Set);

// Третий сет: первые 10 альбомов (фиксированный)
const albumSet3 = mockAlbums.slice(0, 12);

// Четвертый сет: альбомы с 10 по 19 (фиксированный)
const albumSet4 = mockAlbums.slice(12, 24);

export const mockAlbumSets = {
  albumSet1,
  albumSet2,
  albumSet3,
  albumSet4,
};
