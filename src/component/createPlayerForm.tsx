import React, { useState } from "react";
import { Formik, Field} from "formik";
import { PostPlayer, PutPlayerRequest, UpdatePlayer } from "../HttpRequest/PlayerRequest";
import AddPlayer from "./addPlayer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const CreatePlayerForm = () => {
    const[errorMessage, setErrorMessage] = useState<string | null> (null)
    return(
      <Formik<PutPlayerRequest>

        initialValues={{id:0 , pseudo: '',  birthDate: null }}

        onSubmit={async (values, {setErrors}) => {
            try {
                await PostPlayer(values)
                console.log("Request Valid", values)
            } 
            catch (error: any) {
              console.log("mattis est pas la", error?.response.data.Errors)
              if (Array.isArray(error?.response.data.Errors)) {
                const formattedErrors: Record<string, string> = {};
                error?.response.data.Errors.forEach((err: any) => {
                  if (err.PropertyName && err.ErrorMessage) {
                    formattedErrors[err.PropertyName] = err.ErrorMessage;
                  }
                });
                
                console.log("formattedErrors",formattedErrors)
              setErrors(formattedErrors);
              }
            
            }
        }}
      >
 
        {({values, errors, setFieldValue, handleSubmit, isSubmitting }) => (
 
           <form onSubmit={handleSubmit}
                style={{display :"flex", justifyContent: "center", marginTop :"60px", flexDirection :"column", alignItems:"center"}}
            >
                <label>Pseudo</label>
                <Field type="text" name ="pseudo" placeholder="Pseudo" style={{backgroundColor: errors.pseudo ? 'red': '#FFFFFF'}}/>
                <div style={{display:"flex", flexDirection:"column", textAlign: "center" }}>
                    <label>Date de naissance</label>
                    <DatePicker
                      selected={values.birthDate}
                      onChange={(date: Date | null) => setFieldValue("birthDate", date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select a date"
                      className="datepicker"
                      showMonthDropdown
                      showYearDropdown
                      allowSameDay
                      minDate={new Date("1900-01-01")}
                      maxDate={new Date()}
                  />
                </div>
                <div style={{display: "flex", flexDirection:"column", gap:"15px"}}>
                  <button type="submit" disabled={isSubmitting} style={{ marginTop:"15px"}}>
                      Create
                  </button>
                  <button
                    onClick={() => window.history.back()}
                  >
                    back
                  </button>
                </div>
            </form>
 
        )}
      </Formik>
  );
}
  export default CreatePlayerForm;

function useField(name: string): [any, any, any] {
  throw new Error("Function not implemented.");
}
