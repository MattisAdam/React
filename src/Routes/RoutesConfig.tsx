import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import PlayerDetailPage from "../Pages/PlayerDetailPage"
import PlayersPage from "../Pages/PlayersPage"
import Compteur from "../component/Counter"


export const RoutesConfig = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="" element={<PlayersPage/>} />
                <Route path="player/detail/:playerId" element={<PlayerDetailPage/>} />
                <Route path="player/compteur/" element={<Compteur/>} />
            </Routes>
        </BrowserRouter>
    )

}