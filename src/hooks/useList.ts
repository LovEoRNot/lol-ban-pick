import { useCallback, useEffect, useState } from "react"
import { Hero, Position } from "../types"

const heroUrl = '//game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js'
const positionUrl = '//lol.qq.com/act/lbp/common/guides/guideschampion_position.js'

const RANDOM_HERO = {
  heroId: 'random',
  name: '',
  alias: 'random',
  title: '',
  keywords: '',
  position: [],
  avatar: 'data:image/png;base64,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'
}

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
      // 如果是搜索情況，也要把隨機英雄換這個框給塞入
      if (filteredHeros.length > 1 && filteredHeros.length !== heros.length) {
        filteredHeros.unshift(RANDOM_HERO)
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
      hero.unshift(RANDOM_HERO);
      setHeros(hero)

      filterHero(() => true, hero)
    }

    if (!cachedHeros.length) {
      init()
    }

  }, [filterHero, cachedHeros])

  return { heros: displayedList, filterHero, allHeros: cachedHeros };
}
