import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal} from "@mui/material";
import { GetPlayerByCriteria, Player } from "../HttpRequest/PlayerRequest";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerDetail from "../component/DetailsCase"
import DetailsCase from "../component/DetailsCase";
import { useDispatch } from 'react-redux'
import { setPlayerId } from "./playerSlice";


export interface PlayerListProps {
  maxAge: number
}
const PlayerList = (props: PlayerListProps) => {

    let [players, setPlayers] = useState<Player[]>([])
    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        const data = await GetPlayerByCriteria({ filterText: null, isActive: null, maxAge : props.maxAge });
        setPlayers(data);
      };
      fetchData();
    }, [props.maxAge]);

    const handleClick = (player: Player) => {
      navigate("player/detail/" + player.id);
    };

    const handleClickDispatch =(player: Player) =>{
      dispatch(setPlayerId(player.id))
    }
    const dispatch = useDispatch()
    return (
      <>
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pseudo</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => (
                <TableRow key={index} hover>
                  <Button onClick={() => handleClickDispatch(player)}>
                    <TableCell>{player?.pseudo}</TableCell>
                    <TableCell>{player?.age}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleClick(player)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                    </Button>
                </TableRow>                
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      </>
      
    )
}




export default PlayerList;