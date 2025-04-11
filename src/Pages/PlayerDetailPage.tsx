import React from "react";
import { useParams } from "react-router-dom";
import DetailsCase from "../component/DetailsCase";


const PlayerDetailPage = () => {
    const params = useParams();

    return (
       <DetailsCase playerId={Number(params.playerId)}></DetailsCase>
    )
}

export default PlayerDetailPage;