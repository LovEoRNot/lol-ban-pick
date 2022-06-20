import { useEffect, useMemo, useRef, useState } from 'react';
import { ChampionStyle, Hero } from '../../types';
import useChampions from './hooks';
import './index.css'

import Item from './Item'

interface Props {
  allHeros: Hero[],
  heros: Hero[],
  currentHero: Hero|null,
  onHeroChange: (h: Hero) => void
}

const style: ChampionStyle = {
  width: 88,
  height: 133,
  marginTop: 0,
  marginRight: 38,
  column: 6
}

function ChampionList({ heros, allHeros, currentHero, onHeroChange }: Props) {
  // 英雄列表的滚动距离
  const [contentTop, setContentTop] = useState(0);
  // 滑块的滚动距离
  const [thumbTop, setThumbTop] = useState(0);
  // 滑块的高度
  const [thumbHeight, setThumbHeight] = useState(0);
  // 英雄列表的总高度
  const [contentHeight, setContentHeight] = useState(0);

  const startMoving = useRef(false);
  const startPos = useRef(0);

  const scrollHeight = useMemo(() => 580, []);

  const { champions } = useChampions(heros, style)

  const scrollBar = useRef<HTMLDivElement>(null)

  // 计算初始滚动条高度
  useEffect(() => {
    const { column, height, marginTop } = style;

    const row = Math.ceil(champions.size / column);
    const contentHeight = row * (height + marginTop);

    const thumbHeight = scrollHeight < contentHeight ? scrollHeight / contentHeight : 0;

    setThumbTop(0);
    setContentTop(0);
    setContentHeight(contentHeight);
    setThumbHeight(thumbHeight)
  }, [champions, scrollHeight, contentHeight])

  // 添加事件监听
  useEffect(() => {
    const changeTop = (offset: number) => {
      if (offset <= 0) offset = 0;
      if (offset >= scrollHeight * (1 - thumbHeight)) {
        offset = scrollHeight * (1 - thumbHeight);
      }
      setContentTop(offset / scrollHeight * (contentHeight || 1))
      setThumbTop(offset)
    }

    const handleMouseMove = (ev: globalThis.MouseEvent) => {
      if (startMoving.current) {
        const { clientY } = ev;
        const offset = clientY - startPos.current;
        changeTop(offset)
      }
      return true
    }

    const handleMouseUp = (e: globalThis.MouseEvent) => {
      startMoving.current = false
    }

    const handleMouseWheel = (e: Event) => {
      if (thumbHeight > 0) {
        const { deltaY } = e as globalThis.WheelEvent;
        changeTop(thumbTop + 30 * deltaY / 120)
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousewheel', handleMouseWheel)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousewheel', handleMouseWheel)
    }
  }, [thumbHeight, thumbTop, contentHeight, scrollHeight])

  const handleMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    const { clientY } = e;

    startPos.current = clientY - thumbTop;
    startMoving.current = true
  }

  return <div className="champion-content">
    <div className="champion-list-wrapper">
      <div className="champion-list" style={{ marginTop: `-${contentTop}px` }}>
        {
          allHeros.map((hero) => (
            <Item
              isChecked={currentHero?.heroId === hero.heroId}
              key={hero.heroId}
              champion={champions.get(hero.heroId)}
              visible={champions.has(hero.heroId)}
              onSelect={onHeroChange}
            />
          ))
        }
      </div>
    </div>
    <div ref={scrollBar} className="scroll-bar">
      <div
        style={{ marginTop: `${thumbTop}px`, height: `${thumbHeight * 100}%` }}
        className="scroll-thumb"
        onMouseDown={handleMouseDown}
      />
    </div>
  </div >
}

export default ChampionList;