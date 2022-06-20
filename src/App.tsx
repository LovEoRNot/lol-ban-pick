import { useEffect, useState } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import Queue from './components/Queue';
import ChampionList from './components/ChampionList';
import Footer from './components/Footer';

import './App.css';
import useList from './hooks/useList';
import { Hero, IFilter } from './types';
import usePlayer from './hooks/usePlayer';
import useCountDown from './hooks/useCountDown';

function App() {
  const { heros, allHeros, filterHero } = useList();
  const [checkHero, setCheckHero] = useState<Hero | null>(null)
  const [filter, setFilter] = useState<IFilter>({ position: '', keyword: '' })
  const time = useCountDown(1200)
  const { players, updateCurrentPlayer, initPlayer } = usePlayer();
  const { players: enemies, initPlayer: initEnemies } = usePlayer();

  useEffect(() => {
    // 随机生成5个敌方英雄
    if (!enemies.length && heros.length) {
      initEnemies(heros, 5, false)
    }
    // 随机生成5个友方英雄
    if (!players.length && heros.length) {
      initPlayer(heros, 5, true)
    }
  }, [heros, enemies.length, players.length, initPlayer, initEnemies])

  // 切换位置后重置列表信息
  const handleFilterChange = (newFilter: IFilter) => {
    const { position: currentPosition, keyword } = newFilter;
    const newPosition = currentPosition === filter.position ? '' : currentPosition
    setFilter({ ...newFilter, position: newPosition });
    // 过滤英雄列表
    filterHero(({ position, keywords }) => {
      const isRightPosition = newPosition ? position.includes(newPosition) : true;
      const isRightKeyword = keyword ? keywords.includes(keyword) : true;
      return isRightPosition && isRightKeyword
    })
  }

  const handleHeroChange = (hero: Hero) => {
    let currentHero = hero;
    const { heroId } = hero;
    // 如果选则了随机，则从展示的英雄列表里随机抽一个选中，排除第一项，因为第一项是随机选择
    if (heroId === 'random') {
      const index = Math.floor(Math.random() * heros.length) || 1;
      currentHero = heros[index]
    }
    setCheckHero(currentHero)
    updateCurrentPlayer(currentHero)
  }

  return (
    <div className="App">
      <Header time={time}></Header>
      <Filter onFilterChange={handleFilterChange} filter={filter}></Filter>
      <div className="content">
        <Queue players={players} time={time}></Queue>
        <ChampionList allHeros={allHeros} heros={heros} currentHero={checkHero} onHeroChange={handleHeroChange}></ChampionList>
        <Queue players={enemies} position="right"></Queue>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
