import { useFormik } from "formik"
import { string } from "yup"

const AddPlayerFormik =() =>{

  const formik = useFormik({
    initialValues: {
      pseudo: "",
    },
    onSubmit: () => {
      console.log(formik);
    },
  })
  return(
    <form autoComplete="off">
      <label htmlFor="pseudo">Pseudo</label>
      <input
        value={formik.values.pseudo}
        onChange={formik.handleChange}
        id="pseudo"
        type="string" 
        placeholder="Enter your pseudo: John Doe" />
    </form>
  )
}


export default AddPlayerFormik