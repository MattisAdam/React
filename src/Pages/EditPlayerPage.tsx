import { PlayerFormik } from "../component/formikPlayer"
import { useParams } from "react-router-dom";
const EditPlayerPage = () => {
    const params = useParams();
    return (
        <>
            <PlayerFormik IsAddMode = {false} id={Number(params.playerId)}></PlayerFormik>
           
        </>
    )
}

export default EditPlayerPage;