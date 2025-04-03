import React, { useEffect, useState } from "react";
import  { fetchPlayer, GetPlayerById, Player,  } from "../HttpRequest/PlayerRequest";

import axios from "axios";

export interface DetailsCaseProps {
  playerId: number
}

const DetailsCase = (props: DetailsCaseProps) => {
    let {data, isLoading} = GetPlayerById(props.playerId);
    return (
        <>
          <h1>Details</h1>
            {isLoading == true && <div>Loading...</div>}
            {data && (
              <div>
                <h2>{data.pseudo}</h2>
                <p>Age: {data.age}</p>
                <p>ID: {data.id}</p>
              </div>
            )
          }
          
        </>
    )
}
export default DetailsCase;