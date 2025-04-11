import { Button} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PlayerList from "../component/PlayerList";
import DetailsCase from "../component/DetailsCase";
import { useSelector } from "react-redux";
import { RootState } from "../component/store";


const PlayersPage = () => {

  const playerId = useSelector((state : RootState) => state.player.id)
  const navigate = useNavigate();

  const handleClickCompteur = () =>{ navigate("player/compteur/");}

    return (
        <>
        <PlayerList maxAge={0}></PlayerList>
       
          <DetailsCase playerId={Number(playerId)}></DetailsCase>
     
        
        <br />
        <Button
            variant="outlined"
            color="success"
            onClick={() => handleClickCompteur()}
            style={{ marginTop: '20px', width: '200px', fontSize:'20px'} }
          >
            Compteur
         </Button>
          
        </>
    )
}



export default PlayersPage;