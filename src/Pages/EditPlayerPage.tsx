import React from "react";
import EditPlayer  from "../component/EditPlayer";
import { useParams } from "react-router-dom";

const EditPlayerPage = () => {

    const id = Number(useParams().playerId);
    const birthDate = new Date();
    return (
        <>
            <EditPlayer></EditPlayer>
        </>
    )
}

export default EditPlayerPage;