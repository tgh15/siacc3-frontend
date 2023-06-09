import { securityVirusURL } from "./url";
import { Delete, Get, Put } from "../../../core/request";
import Helper               from "../../../../helpers";


const getVirus    = () => localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin' ? 
                                Get(`${securityVirusURL.drivePrefix}/${securityVirusURL.virus}/${securityVirusURL.quarantine}?all`)
                            :
                                Get(`${securityVirusURL.drivePrefix}/${securityVirusURL.virus}/${securityVirusURL.quarantine}?uuid=${Helper.getUserData().uuid}`);
const deleteVirus = (id) => Delete(`${securityVirusURL.drivePrefix}/${securityVirusURL.virus}/${id}`); 
const updateVirus = (id, action) => Put(`${securityVirusURL.drivePrefix}/${securityVirusURL.virus}/${id}/${action}`);

export const SecurityVirusAPI = {
    getVirus,
    deleteVirus,
    updateVirus,
};