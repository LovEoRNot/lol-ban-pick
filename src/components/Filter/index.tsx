import { useState } from 'react';
import { IFilter, Position } from '../../types';
import './filter.css'

interface Props {
    onFilterChange: (filter: IFilter) => any;
    filter: IFilter;
}

function debounce(fn: Function, timeout: number) {
    let timer: number;
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, timeout, ...args)
    }
}

export default function Filter({ onFilterChange, filter = { position: '', keyword: '' } }: Props) {
    const { position } = filter;
    const [value, setValue] = useState<string>('')
    const visiblePositions: Position[] = ['top', 'jungle', 'mid', 'bottom', 'support']

    const onPositionChange = (position: Position) => {
        onFilterChange({ ...filter, position })
    }

    const searchKeyword = debounce((value: string) => {
            console.log('value is : ', value)
            onFilterChange({ ...filter, keyword: value })
        }, 300)

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { target: { value } } = e;
        setValue(value);
        searchKeyword(value)
    }

    return <div className="filter">
        <div className="filter-position">
            {
                visiblePositions.map(pos => (
                    <div
                        key={pos}
                        className={`position-icon position-${pos}${position === pos ? ' active' : ''}`}
                        onClick={() => onPositionChange(pos)}
                    ></div>
                ))
            }

        </div>
        <div className="filter-search">
            <div className="custom-input">
                <input placeholder="搜尋" value={value} onChange={handleInputChange} />
                <span className="search-icon"></span>
            </div>
        </div>
    </div>
}