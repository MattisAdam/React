import React from "react";
import  {GetPlayerById} from "../HttpRequest/PlayerRequest";
import { Button } from "@mui/material";
import { castDateAsParam } from "../core/dateHelper";

export interface DetailsCaseProps {
  playerId: number
}

const DetailsCase = (props: DetailsCaseProps) => {
    let {data, isLoading, refetch, isRefetching} = GetPlayerById(props.playerId);
    const date = data?.birthDate;
    const dateString = castDateAsParam(date);
    return (
        <>
        <div 
          style=
          {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '50px',
            fontSize: '20px'
        }}>
          <h1>Details</h1>
            {isLoading == true && <div>Loading...</div>}
            {data && (
              <div>
                <p>Pseudo: {data.pseudo}</p>
                <p>Age: {data.age}</p>
                Birthdate : {dateString.toLocaleDateString('fr-FR')}
                
              </div>
            )
          }
          {
              isRefetching && <div>Loading...</div>
          } 
          
          <Button
              onClick={() => refetch()}>
            <p>
              load data
            </p>
          </Button>
          </div>
        </>
    )
}
export default DetailsCase;