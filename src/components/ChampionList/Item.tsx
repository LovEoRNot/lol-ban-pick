import { ChampionGrid } from '../../types';
import './index.css'

interface Props {
  champion: ChampionGrid| undefined;
  onSelect: Function;
  isChecked: Boolean;
  visible: Boolean;
}

function Item({ champion, onSelect, isChecked, visible }: Props) {
  const { top, left, hero } = champion || {};
  const { title: name = '', avatar } = hero || {};
  const nameStyle: Record<string, string> = {}

  if (name.length > 6) {
    const num = name.length - 6;
    nameStyle.width = `${100 + num * 17}%`
    nameStyle.marginLeft = `-${num * 17 / 2}%`
  }

  return <div className='champion' style={{ left, top, display: visible ? 'block' : 'none' }} onClick={() => onSelect(hero)}>
    <div className={`champion-avatar${isChecked ? ' checked' : ''}`}>
      <div className="border">
        <div className="clip"></div>
      </div>
      <div className="img-wrapper">
        <img alt={name} className="img" src={avatar} />
      </div>
      <div className="round"></div>
    </div>

    <p className="champion-title" style={nameStyle}>
      {name}
    </p>
  </div>
}

export default Item;