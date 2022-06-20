export type Position = 'top' | 'jungle' | 'mid' | 'bottom' | 'support';

export interface IFilter {
    position: Position | '';
    keyword: string | undefined;
}

export type Hero = {
    heroId: string;
    name: string;
    alias: string,
    avatar: string;
    title: string;
    selectAudio?: string;
    keywords: string;
    position: Array<Position>
    // roles: Array<string>
}

export type Player = {
    id: string;
    name: string;
    status: 0 | 1; // 0: 未選擇, 1: 已選擇
    isCurrent?: Boolean,
    hero?: Hero;
}

export type ChampionGrid = {
    left: number;
    top: number;
    hero: Hero;
}

export type ChampionStyle = {
    width: number;
    height: number;
    marginTop: number;
    marginRight: number;
    column: number;
}