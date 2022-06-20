import { useEffect, useState } from "react";
import { ChampionGrid, ChampionStyle, Hero } from "../../types";

export default function useChampions(heros: Hero[], style: ChampionStyle) {
    const [champions, setChampions] = useState<Map<string, ChampionGrid>>(new Map())

    // 生成每个英雄头像所在的位置信息
    useEffect(() => {
        const res: Map<string, ChampionGrid> = new Map();
        const length = heros.length;

        const { width, height, marginTop, marginRight, column } = style;

        for (let i = 0; i < length; i++) {
            const row = i / column | 0;
            const col = i % column;

            const hero = heros[i];

            res.set(hero.heroId, {
                top: row * (height + marginTop),
                left: col * (width + marginRight),
                hero: heros[i]
            })
        }

        setChampions(res)
    }, [heros, style])

    return {
        champions,
    }
}