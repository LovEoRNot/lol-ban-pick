import { Hero } from '../../types';
import './index.css'

interface Props {
  hero: Hero;
  onSelect: Function;
  isChecked: Boolean;
}

function Item({ hero, onSelect, isChecked }: Props) {
  const { title: name, avatar } = hero;
  const style: Record<string, string> = {}

  if (name.length > 6) {
    const num = name.length - 6;
    style.width = `${100 + num * 17}%`
    style.marginLeft = `-${num * 17 / 2}%`
  }

  return <div className='champion' onClick={() => onSelect(hero)}>
    <div className={`champion-avatar${isChecked ? ' checked' : ''}`}>
      <div className="border">
        <div className="clip"></div>
      </div>
      <div className="img-wrapper">
        <img alt={name} className="img" src={avatar} />
      </div>
      <div className="round"></div>
    </div>

    <p className="champion-title" style={style}>
      {name}
    </p>
  </div>
}

export default Item;