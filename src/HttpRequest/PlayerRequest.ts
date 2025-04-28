import axios from 'axios';
import { useQuery } from "react-query";
import { castObjectAsParam } from '../core/dataHelper';

export interface Player  {
    pseudo: string,
    age: number,
    id: number,
    birthDate: Date,
}


export const fetchPlayer = async (id: number) => {
    const response = await axios.get<Player>((`https://localhost:7118/api/player/${id}`));
    return response.data;
};

export const GetPlayerById = (id: number) => {
    
    const { data, isLoading, refetch, isRefetching} = useQuery(
        [(`https://localhost:7118/api/player/${id}`), id],
        () => fetchPlayer(id),
        {enabled: true, staleTime: Infinity} 
    );
    return { data, isLoading, refetch, isRefetching };
};
export interface PlayerCriteria {
    isActive: boolean | null,
    filterText: string | null,
    maxAge: number | null
};

export const GetPlayerByCriteria = async (criteria: PlayerCriteria) => {
    
    const response = await axios.post<Player[]>('https://localhost:7118/api/player/by-criteria', criteria);
    return response.data;
}

export const PostPlayer = async (player: PutPlayerRequest) => {
    console.log("PostPlayer", player);
    let response = await axios.post<Player>('https://localhost:7118/api/player/Add-Player', player);
    return response.data;
}

export interface DeletePlayerRequest {
    id: number
    pseudo: string
    birthDate: Date
}
export const DeletePlayer = async (player: DeletePlayerRequest) => {
    const response = await axios.post<Player>(`https://localhost:7118/api/player/Delete-Player`, castObjectAsParam(player));
    return response.data;
}

export interface PutPlayerRequest {
    pseudo: string,
    birthDate: Date | null, 
    id?: number
}

export const UpdatePlayer = async (player: PutPlayerRequest) => {
    const response = await axios.put<Player>(`https://localhost:7118/api/player/Update`,castObjectAsParam(player));
    return response.data;
}
