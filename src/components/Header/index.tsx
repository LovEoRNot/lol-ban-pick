import './header.css';

interface Props {
  time: number;
}

function Header({ time }: Props) {
  return (
    <header className="header">
      <h1 className="title">選擇英雄</h1>
      <div>
        <span className="count-down">{time}</span>
      </div>
    </header>
  );
}

export default Header;