import { useCallback, useEffect, useState } from "react"
import { Hero, Position } from "../types"

const heroUrl = '//game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js'
const positionUrl = '//lol.qq.com/act/lbp/common/guides/guideschampion_position.js'

// 查询英雄列表
function fetchHero() {
  return fetch(`${heroUrl}?ts=${Date.now() / 60000 >> 0}`).then(res => res.json())
}

// 查询英雄位置列表，jsonp获取
function fetchPosition() {
  return new Promise(resolve => {
    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute('src', `${positionUrl}`);
    jsonpScript.onload = () => {
      resolve((window as any).CHAMPION_POSITION);
    }
    document.body.appendChild(jsonpScript);
  })
}

export default function useList() {
  const [cachedHeros, setHeros] = useState<Array<Hero>>([]);

  const [displayedList, setDisplayedList] = useState<Array<Hero>>([])

  // 查询
  const filterHero = useCallback(
    (condition: (h: Hero, i: number) => Boolean = () => true, heros = cachedHeros) => {
      const filteredHeros = heros.filter(condition);
      if (filteredHeros.length > 1) {
        filteredHeros.unshift({
          heroId: 'random',
          name: '',
          alias: 'random',
          title: '',
          keywords: '',
          position: [],
          avatar: '/assets/random.png'
        })
      }
      setDisplayedList(filteredHeros)
    },
    [cachedHeros]
  )

  useEffect(() => {
    const init = async () => {
      const { hero } = (await fetchHero()) as { hero: Hero[] };
      const { list } = (await fetchPosition()) as Record<string, any>
      hero.forEach((h: Hero) => {
        h.position = Object.keys(list[h.heroId] || {}) as Position[]
        h.avatar = `//game.gtimg.cn/images/lol/act/img/champion/${h.alias}.png`
      })
      hero.sort((h1: Hero, h2: Hero) => h1.alias > h2.alias ? 1 : -1)
      setHeros(hero)

      filterHero(() => true, hero)
    }

    if (!cachedHeros.length) {
      init()
    }

  }, [filterHero, cachedHeros])

  return { heros: displayedList, filterHero };
}
