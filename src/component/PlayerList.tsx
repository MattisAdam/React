import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal} from "@mui/material";
import { GetPlayerByCriteria, Player } from "../HttpRequest/PlayerRequest";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setPlayerId } from "./playerSlice";
import AddPlayer from "../component/AddPlayer";
import  Delete  from "./Delete";


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

    const handleClickAdd = () => {
      navigate("player/add");
    }

    const handleClickEdit = (player: Player) => {
      navigate("player/edit/" + player.id);
    }

    
    const dispatch = useDispatch()
    return (
      <>
          <TableContainer>
            <Table
              style={{ width: '80%', marginLeft: '100px', marginTop: '50px', fontSize: '20px' }}
            >
              <TableHead style={{ backgroundColor: '#B7A7A9', fontSize: '25px', color: '#FFFFFF' }}>
                <TableRow>
                  <TableCell style={{ paddingRight: '5px', marginLeft: '5px', color: 'white' }}>
                    <Button
                      onClick={() => handleClickAdd()}
                      style={{ marginRight: '20px', fontSize: '15px', color:'#000000', backgroundColor: '#FFFFFF' }}
                    >
                      +
                    </Button>
                    Actions
                  </TableCell>
                  <TableCell
                    style={{ color: 'white'}}
                  >Pseudo</TableCell>
                  <TableCell
                    style={{ color: 'white'}}
                  >Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ fontSize: '20px' }}>
                {players.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ padding: '5px 10px', display: 'flex', justifyContent: 'flex-start' }}>
                      <Button
                        style={{ fontSize: '15px', marginLeft: '5px', textAlign: 'start' }}
                        color="primary"
                        variant="outlined"
                        onClick={() => handleClickDispatch(player)}
                      >
                        👁
                      </Button>
                      <Button
                        style={{ fontSize: '15px', marginLeft: '5px', textAlign: 'start' }}
                        color="secondary"
                        variant="outlined"
                        onClick={() => handleClickEdit(player)}
                      >
                        ✎
                      </Button>
                      <Delete
                        id={player.id}
                        pseudo={player.pseudo}
                        birthDate={player.birthDate}
                      />
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer', fontSize: '15px', marginLeft: '-15px', textAlign: 'start' }}
                    >
                      {player?.pseudo}
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer', fontSize: '15px', marginLeft: '-15px', textAlign: 'start' }}
                    >
                      {player?.age}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
         </>
 )
}




export default PlayerList;