import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  { GetPlayerById, Player } from "../HttpRequest/PlayerRequest";
import DetailsCase from "../component/DetailsCase";
import { useDispatch } from 'react-redux';


const PlayerDetailPage = () => {
    const params = useParams();

    return (
       <DetailsCase playerId={Number(params.playerId)}></DetailsCase>
    )
}

export default PlayerDetailPage;