import React from "react";
import { Formik, Field, Form } from "formik";
import { PostPlayer, PutPlayerRequest, UpdatePlayer, GetPlayerById } from "../HttpRequest/PlayerRequest";
import AddPlayer from "./addPlayer";
import DatePicker from "react-datepicker";
import { useParams } from "react-router"
import "react-datepicker/dist/react-datepicker.css";

const EditPlayerForm = () => {
    const {params} = useParams()
    
    const handleBackButton = () => {

        window.history.back();
    }
    return(
    <Formik<PutPlayerRequest>
        
    initialValues ={{
        id: 0,
        pseudo: '',
        birthDate : null
    }}

    onSubmit={ async (values, {setErrors}) =>{
        try{
            await UpdatePlayer(values)
        }
        catch (error : any) {
            if(Array.isArray(error?.response.data.Errors)) {
                const formattedErrors: Record<string, string> = {};
                error?.response.data.Errors.forEach((err: any) => {
                    if(err.PropertyName && error.ErrorMessage){
                        formattedErrors[error.PropertyName] = err.ErrorMessage;
                    }
                });
                setErrors(formattedErrors)
            }
        }
    }}
    >

        { ({values, errors, touched, setFieldValue, handleBlur, handleSubmit, isSubmitting}) =>(
            
          <form onSubmit={handleSubmit}style={{display :"flex", justifyContent: "center", marginTop :"60px", flexDirection :"column", alignItems:"center"}}>
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
                      minDate={new Date("1900-01-01")}
                      maxDate={new Date()}
                  />
              </div>
              <div style={{display: "flex", flexDirection:"column", gap:"15px"}}>
                <button type="submit" disabled={isSubmitting} style={{ marginTop:"15px"}}>
                    Edit
                </button>
                <button
                  onClick={handleBackButton}
                >
                  back
                </button>
              </div>
          </form>
        )}
    </Formik>
    );
}


export default EditPlayerForm;