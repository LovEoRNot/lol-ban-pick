import React from 'react'
import { Player } from '../../types';
import './index.css'

interface Props {
  position?: 'left' | 'right';
  players: Player[];
  time?: number
}

const Queue: React.FC<Props> = ({ position, players, time }) => {
  return <div className={`queue-content queue-${position}`}>
    <div className="player-list">
      {
        players.map(({id, name, hero, isCurrent, status}, i) => (
          <div key={id} className={`player-item${ isCurrent? ' active':'' }`}>
            {!i && <div className="splitter" style={{ top: 0 }}></div>}
            <div className="hero-avatar">
              {hero && <img alt="厄斐琉斯" src={hero.avatar} />}
            </div>
            <div className="hero-info">
              <p className="hero-name">{status === 0 && !hero ? '選擇中...' : hero?.title}</p>
              <p className="player-name">{name}</p>
            </div>
            {
              isCurrent && (
                <div className="count-down">
                  {time}
                </div>
              )
            }
            <div className="splitter" style={{ bottom: 0 }}></div>
          </div>
        ))
      }
    </div>
  </div>
}

Queue.defaultProps = {
  position: 'left'
};

export default Queue