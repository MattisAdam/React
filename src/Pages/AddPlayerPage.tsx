
import { PlayerFormik } from "../component/formikPlayer"
import { useParams } from "react-router-dom";

const AddPlayerPage = () => {
    const params = useParams();
    return(
        <>
        <PlayerFormik IsAddMode={true} id={Number(params.playerId)}></PlayerFormik>
        </>
    )

}

export default AddPlayerPage