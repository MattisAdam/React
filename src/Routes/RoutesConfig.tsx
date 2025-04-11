import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import PlayerDetailPage from "../Pages/PlayerDetailPage"
import PlayersPage from "../Pages/PlayersPage"
import Compteur from "../component/Counter"
import AddPlayerPage from "../Pages/AddPlayerPage"
import EditPlayerPage from "../Pages/EditPlayerPage"


export const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<PlayersPage/>} />
                <Route path="player/detail/:playerId" element={<PlayerDetailPage/>} />
                <Route path="player/compteur/" element={<Compteur/>} />
                <Route path="player/add" element={<AddPlayerPage/>} />
                <Route path="player/edit/:playerId" element={<EditPlayerPage/>} />
            </Routes>
        </BrowserRouter>
    )

}