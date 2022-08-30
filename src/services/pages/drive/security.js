import { Delete, Put } from "../../core/request";


//GET
const deleteVirus = (id) => Delete(`drive/virus/${id}`);
const updateAction = (id,action) => Put(`drive/virus/${id}/${action}`);

const DriveSecurity = {
    deleteVirus,
    updateAction
}

export default DriveSecurity;