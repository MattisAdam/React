import { Formik, Field} from "formik";
import { PostPlayer, PutPlayerRequest, GetPlayerById, UpdatePlayer } from "../HttpRequest/PlayerRequest";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";



export interface PropsPlayerFormik{
  IsAddMode : boolean
  id: number
}


export const PlayerFormik = (props : PropsPlayerFormik) => {
  const navigate = useNavigate()
  let x;
  if (props.IsAddMode) {
    const initialValues = {
      id: 0, 
      pseudo: '', 
      birthDate: new Date() 
    };
    console.log("CreateUser", initialValues)
    x = initialValues;
  } 

  else {
    const {data : player} = GetPlayerById(props.id)
    const initialValues = { 
      id: player?.id ?? 0, 
      pseudo: player?.pseudo ?? 'Pseudo', 
      birthDate: player?.birthDate ?? new Date() 
    };
    console.log("UpgradeUser", initialValues)
    x = initialValues;
  }
   
  return(
    <Formik<PutPlayerRequest>
      onSubmit={ async (values, { setErrors }) => {
        try {

          if(props.IsAddMode){
            await PostPlayer(values);
            toast.success("Player added successfully ")
          }

          else{
            await UpdatePlayer(values);
            toast.success("Player successfully edited")
          }

          console.log("Request Valid", values);

        }
        catch (error: any) {

          console.log("Request Invalid", error?.response.data.Errors);
          if (Array.isArray(error?.response.data.Errors)) {

            const formattedErrors: Record<string, string> = {};

            error?.response.data.Errors.forEach((err: any) => {

              if (err.PropertyName && err.ErrorMessage) {
                formattedErrors[err.PropertyName] = err.ErrorMessage;
              }
              if(String(err.ErrorMessage).includes("Cannot be born in futur")){
                toast.error("Cannot be born in futur")
              }
              if(String(err.ErrorMessage).includes("Pseudo is mandatory")){
                toast.error("Pseudo is mandatory")
              }
              if(String(err.ErrorMessage).includes("Cannot insert duplicate key row in object")){
                toast.error("Pseudo already exist")
                
              }
            })

            console.log("formattedErrors", formattedErrors);

            setErrors(formattedErrors);
          }
        }
      }}
      initialValues={x}    
    >

    {({values, errors, setFieldValue, handleSubmit, isSubmitting }) => (

      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", marginTop: "40px", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px", flexDirection:"column"}}>
        <div style={{ display: "flex", flexDirection: "column", textAlign: "center", width: '200px' }}>
          <label>Pseudo</label>
          <Field
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            className={`input-field ${errors.pseudo ? 'error' : ''}`}  
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", textAlign: "center", width: '200px' }}>
          <label>Date de naissance</label>
          <DatePicker
            selected={values.birthDate}
            onChange={(date: Date | null) => setFieldValue("birthDate", date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            className={`input-field ${errors.birthDate ? 'error' : ''}`}
            showMonthDropdown
            showYearDropdown
            popperPlacement="bottom-start"
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
          />
        </div>
      </div>
      <div style={{display: "flex", flexDirection:"column", gap:"15px", marginTop:"15px"}}>
        <button type="submit" disabled={isSubmitting}>Save</button>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
      </div>
      </form>
    )}
    </Formik>
  )
}

