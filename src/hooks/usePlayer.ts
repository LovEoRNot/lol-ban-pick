import { useCallback, useState } from "react";
import { Hero, Player } from "../types";

export default function usePlayer() {
    const [players, setPlayers] = useState<Player[]>([])

    const updateCurrentPlayer = (hero: Hero) => {
        const index = players.findIndex(p => p.isCurrent);
        if (index !== -1) {
            players[index].hero = hero
            setPlayers([...players])
        }
    }

    const initPlayer = useCallback((allHeros: Hero[], playerNum: number, isCurrent: boolean) => {
        const buildPlayer = (index: number, id: string, isCurrent: boolean) => {
            return {
                name: '測試用戶' + Math.round(Math.random() * 10),
                id: id,
                status: 0,
                isCurrent: isCurrent,
                hero: index && !isCurrent ? allHeros[index] : null
            } as Player;
        }

        const players = new Array(playerNum).fill('');
        const existHeros = new Set()
        const currentIndex = isCurrent ? Math.floor(Math.random() * playerNum) : -1
        players.forEach((_, i) => {
            let heroIndex: number = -1;
            let isOver = false
            while (!isOver) {
                heroIndex = Math.floor(Math.random() * allHeros.length) || 1;
                if (!existHeros.has(heroIndex)) {
                    existHeros.add(heroIndex)
                    isOver = true
                }
            }
            players[i] = buildPlayer(heroIndex, `${i}`, currentIndex === i)
        })

        setPlayers(players)
    }, [])

    return { players, updateCurrentPlayer, initPlayer }
}