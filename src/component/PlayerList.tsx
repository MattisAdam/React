import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { GetPlayerByCriteria, Player } from "../HttpRequest/PlayerRequest";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setPlayerId } from "./playerSlice";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from "./delete";


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
  
    const sortByAgeDesc = () => {
      const sortedPlayers = [...players].sort((a, b) => b.age - a.age);
      setPlayers(sortedPlayers);
    }
    const sortByAgeAsc = () => {
      const sortedPlayers = [...players].sort((a, b) => a.age - b.age);
      setPlayers(sortedPlayers);
    }
    const sortByPseudoDesc= () => {
      const sortedPlayers = [...players].sort((a, b) => b.pseudo.localeCompare(a.pseudo));
      setPlayers(sortedPlayers)
    }
    const sortByPseudoAsc= () => {
      const sortedPlayers = [...players].sort((a, b) => a.pseudo.localeCompare(b.pseudo));
      setPlayers(sortedPlayers) 
    }
    
    const [anchorElAge, setAnchorElAge] = useState<null | HTMLElement>(null);
    const openAge = Boolean(anchorElAge);

    const [anchorElPseudo, setAnchorElPseudo] = useState<null | HTMLElement>(null);
    const openPseudo = Boolean(anchorElPseudo);

    const handleClickPseudo = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElPseudo(event.currentTarget);
    };
    const handleClosePseudo = () => {
      setAnchorElPseudo(null);
    };
    const handleClickAge = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElAge(event.currentTarget);
    };
    const handleCloseAge = () => {
      setAnchorElAge(null);
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
                  >
                    Pseudo

                    <IconButton
                        onClick={handleClickPseudo}
                        style={{ color: 'white', marginLeft: '10px' }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu anchorEl={anchorElPseudo} open={openPseudo} onClose={handleClosePseudo}>
                        <MenuItem
                          onClick={() => {
                            sortByPseudoAsc();
                            handleClosePseudo();
                          }}
                        >
                          Sort by Asc ⬇
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            sortByPseudoDesc();
                            handleClosePseudo();
                          }}
                        >
                          Sort by Desc ⬆
                        </MenuItem>
                      </Menu>
                  </TableCell>
                  <TableCell style={{ color: 'white', textAlign: 'center' }}>
                      Age
                      <IconButton
                        onClick={handleClickAge}
                        style={{ color: 'white', marginLeft: '10px' }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu anchorEl={anchorElAge} open={openAge} onClose={handleCloseAge}>
                        <MenuItem
                          onClick={() => {
                            sortByAgeAsc();
                            handleCloseAge();
                          }}
                        >
                          Sort by Asc ⬇
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            sortByAgeDesc();
                            handleCloseAge();
                          }}
                        >
                          Sort by Desc ⬆
                        </MenuItem>
                      </Menu>
                    </TableCell>
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
                      style={{ cursor: 'pointer', fontSize: '15px', marginRight: '20px', textAlign: 'center' }}
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