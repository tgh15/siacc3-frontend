import { Fragment, useEffect, useState }    from "react";
import { Card, CardBody, CardText }         from "reactstrap";

//Components
import CustomToast                          from '../../../components/widgets/custom-toast';
import OrganizationChart                    from '../../../components/widgets/org-chart';

//API
import OrganizationalStructureApi           from '../../../services/pages/configuration/organizational-structure';


const CardChart = (props) => {
    const {
        data,
        satker
    } = props;

    return (
        <Card>
            <CardBody>
                <CardText className="font-weight-bolder">
                    Struktur Organisasi {satker}
                </CardText>
                <OrganizationChart
                    draggable   = {true} 
                    datasource  = {data} 
                    zoominLimit = {5}
                />
            </CardBody>
        </Card>
    );
};

const OrganizationalStructure = () => {
    //State
    const [dataKejati,setDataKejati]        = useState([]);
    const [dataKejari,setDataKejari]        = useState([]);
    const [dataCabjari,setDataCabjari]      = useState([]);
    const [dataKejagung,setDataKejagung]    = useState([]);

    const getData = ({workunit_level_id,onSuccessData}) => {
        OrganizationalStructureApi.get({
            onSuccess : (res) => {
                onSuccessData(res);
            }, onFail : (err) => {
                CustomToast("danger",err.message);
            },
            data : {
                is_structure        : true,
                workunit_level_id   : workunit_level_id
            }
        })
    };

    useEffect(() => {
        getData({ workunit_level_id :1, onSuccessData : (res) => {setDataKejagung(res)} })
    }, []);

    useEffect(() => {
        getData({ workunit_level_id :2, onSuccessData : (res) => {setDataKejati(res)} })
    }, []);

    useEffect(() => {
        getData({ workunit_level_id :3, onSuccessData : (res) => {setDataKejari(res)} })
    }, []);

    useEffect(() => {
        getData({ workunit_level_id :4, onSuccessData : (res) => {setDataCabjari(res)} })
    }, []);

    return (
        <Fragment>
            <div id="structure-kejagung">
                <CardChart data={dataKejagung} satker="Kejaksaan Agung"/>
            </div>
            <div id="structure-kejati">
                <CardChart data={dataKejati} satker="Kejaksaan Tinggi"/>
            </div>
            <div id="structure-kejari">
                <CardChart data={dataKejari} satker="Kejaksaan Negeri"/>
            </div>
            <div id="structure-capjari">
                <CardChart data={dataCabjari} satker="Kejaksaan Cabang Kejaksaan Negeri"/>
            </div>
        </Fragment>
    );
};

export default OrganizationalStructure;