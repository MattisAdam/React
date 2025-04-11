import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { PostPlayer } from "../HttpRequest/PlayerRequest";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import { castDateAsParam } from "../core/dateHelper";
import "react-datepicker/dist/react-datepicker.css";


const CustomInput = React.forwardRef(({ value, onClick }: any, ref) => (
    <input
        ref={ref as React.Ref<HTMLInputElement>}
        onClick={onClick}
        value={value}
        readOnly
        placeholder="Select a date"
        
        style={{
        width: "200px", 
        height: "45px", 
        fontSize: "16px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        cursor: "pointer",
        marginTop: "20px",
        textAlign: "center",
      }}
    />
  ));
const AddPlayer =  () => {
    const [id, setId] = useState<number>(0);
    const [pseudo, setPseudo] = useState("John Doe");
    const [error, setError] = useState("");
    const [checking, setChecking] = useState(false);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const  navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (pseudo == "" || birthDate == null) {
            toast.error("Please Fill all fields");
            return;
        }
        const CheckPseudoExists = async (pseudo: string): Promise<boolean> => {
            const response = await fetch(`/api/player/exists?pseudo=${encodeURIComponent(pseudo)}`);
            const result = await response.json();
            return result.exists;
            };

        
        let player = PostPlayer({id: id, pseudo: pseudo, birthDate: castDateAsParam(birthDate)})
            .then((response) => {
                toast.success(" Player added successfully");
                navigate(-1);
            })

            .catch((error) => {
                console.error("Error during update process", error);
                //toast.error(error.response.data.Errors[0].ErrorMessage)
                toast.error("Error during update process")
              });

            
    }
    return (
        <>
        <form onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", fontSize: "20px" }}
        >
        <h1>
            Add Player
        </h1>
        
            <TextField
                label="Name"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
            />
            <div>
                <br />
                <DatePicker
                    selected={birthDate}
                    onChange={(date: Date | null) => setBirthDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    showYearDropdown
                    scrollableMonthYearDropdown
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    customInput={<CustomInput/>}
                />
            </div>
            <br />
            <Button type="submit" variant="contained" color="primary"
                style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", borderRadius: "8px", }}
            >
                Add the player
            </Button>
            <br />
            <Button
                 onClick={() => window.history.back()}
                color="primary"
                style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "8px", cursor : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                Back
            </Button>
        </form>
        </>
    );
};
export default AddPlayer;


