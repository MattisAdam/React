import React, { useState, useEffect, use } from "react";
import { UpdatePlayer, GetPlayerById } from "../HttpRequest/PlayerRequest";
import { Button, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {castObjectAsParam} from "../core/dataHelper";
import {castDateAsParam} from "../core/dateHelper";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

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
        backgroundColor: "#BD9E77",
        color: "#fff",
        
      }}
    />
  ));
  


const EditPlayer = () => {
    const  navigate = useNavigate();
    const id = Number(useParams().playerId);
    const { data, isLoading } = GetPlayerById(id);
    console.log("date", data?.birthDate);
    const [pseudo, setPseudo] = useState(data?.pseudo || "");
    const [birthDate, setBirthDate] = useState<Date | null>(data?.birthDate ? new Date(data.birthDate) : null); 
    
    if (isLoading) return <p>Chargement...</p>;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (pseudo === "" || birthDate === null) {
          toast.error("Please Fill all fields");
          return;
        }
    
        try {
          await UpdatePlayer({
            id,
            pseudo,
            birthDate: castDateAsParam(birthDate),
          });
          toast.success("Player updated successfully");
          navigate(-1);
        } catch (error) {
          console.error("Error during update process", error);
          toast.error("Error during update process");
        }
      };
    return (
        <>
        <form onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", fontSize: "20px"}}
        >
            <h1
                style={{ fontSize: "80px", marginBottom: "20px", color: "#520000", textDecoration: "underline" }}
            >Edit {data?.pseudo} </h1>
            <div
                style={{
                    backgroundColor: "#8E775E",
                    color: "#fff",
                    borderRadius: "8px",
                    textAlign: "center",
                } }>
                <TextField
                    label="Name"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    
                />
            </div>
                <DatePicker
                    selected={castDateAsParam(birthDate)}
                    onChange={(birthDate: Date | null) => setBirthDate(birthDate)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    showYearDropdown
                    scrollableMonthYearDropdown
                    customInput={<CustomInput /> }
                />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                    fontSize: "20px",
                    gap: "20px",
                } }
            >

                <Button
                    onClick={() => window.history.back()}
                    color="primary"
                    style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "8px", cursor : "pointer", 
                        display: "flex", alignItems: "center", justifyContent: "center", 
                        backgroundColor: "#520000", color: "#fff", border: "none", marginTop: "20px"}}
                    >
                    Back
                </Button>       
                <Button type="submit" 
                    style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", borderRadius: "8px", 
                    cursor : "pointer", backgroundColor: "#520000", color: "#fff", border: "none", 
                    }}>
                    Save Change
                </Button>
                
            
            </div>
        </form>
        </>
  );
};

export default EditPlayer;