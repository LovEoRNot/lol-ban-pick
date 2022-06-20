import { ChampionGrid } from "../types";

export function random(arr = []) {
  const items = [...arr]
  let len = items.length;

  const swap = (item1: ChampionGrid, item2: ChampionGrid, key: 'left' | 'top') => {
    [item1[key], item2[key]] = [item2[key], item1[key]]
  }

  while(len > 0) {
    const index = Math.random() * len | 0;
    swap(items[len - 1], items[index], 'left')
    swap(items[len - 1], items[index], 'top')
    len--;
  }

  return items
}