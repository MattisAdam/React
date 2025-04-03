import axios from 'axios';
import { useQuery } from "react-query";

export interface Player {
    pseudo: string,
    age: number,
    id: number
}
export const fetchPlayer = async (id: number) => {
    const response = await axios.get<Player>((`https://localhost:7118/api/player/${id}`));
    return response.data;
};

export const GetPlayerById = (id: number) => {
    const { data, isLoading } = useQuery(['player', id], () => fetchPlayer(id));
    return { data, isLoading};
}


export interface PlayerCriteria {
    isActive: boolean | null,
    filterText: string | null,
    maxAge: number | null
}
export const GetPlayerByCriteria = async (criteria: PlayerCriteria) => {
    const response = await axios.post<Player[]>('https://localhost:7118/api/player/by-criteria', criteria);
    return response.data;
}

