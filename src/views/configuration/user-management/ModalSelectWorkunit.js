import { useState } from "react";
import { Card, CardBody, FormGroup, Input, Label, Spinner } from "reactstrap";
import CustomTableBodyEmpty from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomToast from "../../../components/widgets/custom-toast";
import { ModalBase } from "../../../components/widgets/modals-base";
import { workunitAPI } from "../../../services/pages/configuration/workunit";

const ModalSelectWorkunit = (props) => {

    const {
        visible,
        setVisible,
        handleAction
    }               = props;


    const [workunitResult, setWorkunitResult] = useState(null);

    const findWorkunit = (value) => {
        workunitAPI.getWorkunit(1, value).then(
            res => {
                if(res.data.workunit != null && res.data.workunit.length > 0){
                    setWorkunitResult(res.data.workunit);
                }else{
                    setWorkunitResult([]);
                }
            },
            err => {
                console.log(err, 'find workunit');
            }
        )
    }

    const handleClick = (value) => {
        handleAction(value);

        setVisible(false);
        setWorkunitResult(null);
        
        CustomToast('success', 'Data Satuan kerja Berhasil Dipilih.');
    }

    return (
        <ModalBase
            show    = {visible}
            title   = "Pencarian Satuan Kerja"
            setShow = {(par) => { setVisible(par) }}
            unmount = {false}
        >
            <FormGroup className="pb-1">
                <Label>Pilih Satuan Kerja</Label>
                <Input 
                    placeholder = "Ketik Nama Lokasi" 
                    onKeyDown   = {(e) => {
                        const {keyCode,target:{value}} = e;

                        if(keyCode===13){
                            findWorkunit(value);
                        }
                    }}
                />
                <Label>Tekan Enter untuk memulai pencarian</Label>
            </FormGroup>

            {
                workunitResult != null ?
                    workunitResult.length > 0 ?
                        <>
                            
                            <h4 className="mb-2">Hasil Pencarian :</h4>
                            {
                                workunitResult.map((data) => (
                                    <Card 
                                        onClick     = {() => handleClick(data)}
                                        className   = "mb-1 cursor-pointer"
                                    >
                                        <CardBody>
                                            {data.name}
                                        </CardBody>
                                    </Card>
                                ))
                            }

                        </>

                    :
                    <CustomTableBodyEmpty/>
                :
                    null
            }

        </ModalBase>
    )
};

export default ModalSelectWorkunit;