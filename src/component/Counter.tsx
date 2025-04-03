import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostMultiple } from "../HttpRequest/MultipleHistoryRequest";
import { useDispatch, useSelector } from "react-redux";
import { setNumber } from "./counterSlice";
import { RootState } from "../component/store";

const SendCompteurOnDb = async (counter: number, dispatch: any) => {
    try {
        const result = await PostMultiple(counter);
        console.log("Successful send", result);
        dispatch(setNumber(counter));
    } catch (error) {
        console.error("Error", error);
    }
};

const Compteur = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state: RootState) => state.number.num);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCounter = localStorage.getItem("counter");
        if (savedCounter !== null) {
            dispatch(setNumber(parseInt(savedCounter, 10)));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("counter", counter.toString());
        if (counter % 10 === 0 && counter !== 0) {
            SendCompteurOnDb(counter, dispatch);
        }
    }, [counter, dispatch]);

    return (
        <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Compteur : {counter}</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                <Button variant="contained" color="primary" onClick={() => dispatch(setNumber(counter + 1))}>
                    Increment
                </Button>
                <Button variant="contained" color="primary" onClick={() => dispatch(setNumber(Math.max(0, counter - 1)))}>
                    Decrement
                </Button>
                <Button variant="contained" color="secondary" onClick={() => dispatch(setNumber(counter + 10))}>
                    +10
                </Button>
                <Button variant="contained" color="secondary" onClick={() => dispatch(setNumber(counter + 5))}>
                    +5
                </Button>
            </div>
            <div>
                <Button onClick={() => navigate("../")}>Retour</Button>
            </div>
        </div>
    );
};

export default Compteur;
