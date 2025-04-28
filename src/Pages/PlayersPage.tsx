import { Button} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DetailsCase from "../component/detailsCase";
import { useSelector } from "react-redux";
import { RootState } from "../component/store";
import PlayerList from "../component/playerList";


const PlayersPage = () => {

  const playerId = useSelector((state : RootState) => state.player.id)
  const navigate = useNavigate();

  const handleClickCompteur = () =>{ navigate("player/compteur/");}

    return (
        <>
        <PlayerList maxAge={0}></PlayerList>
       
        <DetailsCase playerId={Number(playerId)}></DetailsCase>
     
        <Button
            variant="outlined"
            color="success"
            onClick={() => handleClickCompteur()}
            style={{ marginTop: '5px', width: '200px', fontSize:'20px'} }
          >
            Compteur
         </Button>
          
        </>
    )
}



export default PlayersPage;