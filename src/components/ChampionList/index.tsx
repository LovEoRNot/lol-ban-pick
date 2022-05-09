import { useEffect, useRef, useState } from 'react';
import { Hero } from '../../types';
import './index.css'

import Item from './Item'

interface Props {
  heros: Hero[],
  currentHero: Hero|null,
  onHeroChange: (h: Hero) => void
}

function ChampionList({ heros, currentHero, onHeroChange }: Props) {
  const [contentTop, setContentTop] = useState(0);
  const [thumbTop, setThumbTop] = useState(0)
  const [thumbHeight, setHeight] = useState(0)

  const startMoving = useRef(false);
  const startPos = useRef(0);
  const scrollHeight = useRef(0);

  const scrollBar = useRef<HTMLDivElement>(null)
  const contentList = useRef<HTMLDivElement>(null)

  const handleMouseDown: React.MouseEventHandler<HTMLElement> = (e) => {
    const { clientY } = e;

    startPos.current = clientY - thumbTop;
    startMoving.current = true
  }

  const calculateThumbHeight = () => {
    if (!scrollHeight.current) {
      scrollHeight.current = scrollBar.current?.offsetHeight || 0;
    }
    const contentHeight = contentList.current?.offsetHeight || 1;
    const height = scrollHeight.current < contentHeight ? scrollHeight.current / contentHeight : 0
    setHeight(height)
  }

  // 计算初始滚动条高度
  useEffect(() => {
    setThumbTop(0);
    setContentTop(0);
    setHeight(0)
    setTimeout(() => {
      calculateThumbHeight()
    }, 200);
  }, [heros])

  // 添加事件监听
  useEffect(() => {
    const changeTop = (offset: number) => {
      if (offset <= 0) offset = 0;
      if (offset >= scrollHeight.current * (1 - thumbHeight)) {
        offset = scrollHeight.current * (1 - thumbHeight);
      }
      setContentTop(offset / scrollHeight.current * (contentList.current?.offsetHeight || 1))
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
  }, [thumbHeight, thumbTop])


  return <div className="champion-content">
    <div className="champion-list-wrapper">
      <div ref={contentList} className="champion-list" style={{ marginTop: `-${contentTop}px` }}>
        {
          heros.map((hero) => (
            <Item
              isChecked={currentHero?.heroId === hero.heroId}
              key={hero.heroId}
              hero={hero}
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