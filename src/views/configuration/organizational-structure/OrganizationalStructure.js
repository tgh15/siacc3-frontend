import { Fragment, useEffect, useState }    from "react";
import Skeleton                             from "react-loading-skeleton";
import { Card, CardBody, CardText }         from "reactstrap";

//Components
import CustomToast                          from '../../../components/widgets/custom-toast';
import OrganizationChart                    from '../../../components/widgets/org-chart';

//API
import OrganizationalStructureAPI           from '../../../services/pages/configuration/organizational-structure';


const OrganizationalStructure = () => {
    //State
    const [loading, setloading]           = useState(false);
    const [dataKejati, setDataKejati]     = useState(null);
    const [dataKejari, setDataKejari]     = useState(null);
    const [dataCabjari, setDataCabjari]   = useState(null);
    const [dataKejagung, setDataKejagung] = useState(null);

    useEffect(() => {
        getData(1);
        getData(2);
        getData(3);
        getData(4);
    }, []);

    const getData = (level) => {
        setloading(true);

        const formData = {
            is_structure      : true,
            workunit_level_id : level
        };

        OrganizationalStructureAPI.getStructure(formData).then(
            res => {
                if (!res.is_error) {
                    setloading(false);

                    if (level === 1) {
                        setDataKejagung(res.data);
                    }else if (level === 2) {
                        setDataKejati(res.data);
                    }else if (level === 3) {
                        setDataKejari(res.data);
                    }else {
                        setDataCabjari(res.data);
                    }
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    return (
        <Fragment>
            {
                !loading ?
                    <div>
                        {
                            dataKejagung != null ?
                                <Card id="structure-kejagung">
                                    <CardBody>
                                        <CardText className="font-weight-bolder">
                                            Struktur Organisasi Kejaksaan Agung
                                        </CardText>
                                        <OrganizationChart
                                            draggable   = {true} 
                                            datasource  = {dataKejagung} 
                                            zoominLimit = {5}
                                        />
                                    </CardBody>
                                </Card>
                            : null
                        }

                        {
                            dataKejati != null ?
                                <Card id="structure-kejati">
                                    <CardBody>
                                        <CardText className="font-weight-bolder">
                                            Struktur Organisasi Kejaksaan Tinggi
                                        </CardText>
                                        <OrganizationChart
                                            draggable   = {true} 
                                            datasource  = {dataKejati} 
                                            zoominLimit = {5}
                                        />
                                    </CardBody>
                                </Card>
                            : null
                        }

                        {
                            dataKejari != null ?
                                <Card id="structure-kejari">
                                    <CardBody>
                                        <CardText className="font-weight-bolder">
                                            Struktur Organisasi Kejaksaan Negeri
                                        </CardText>
                                        <OrganizationChart
                                            draggable   = {true} 
                                            datasource  = {dataKejari} 
                                            zoominLimit = {5}
                                        />
                                    </CardBody>
                                </Card>
                            : null
                        }

                        {
                            dataCabjari != null ?
                                <Card id="structure-capjari">
                                    <CardBody>
                                        <CardText className="font-weight-bolder">
                                            Struktur Organisasi Cabang Kejaksaan Negeri
                                        </CardText>
                                        <OrganizationChart
                                            draggable   = {true} 
                                            datasource  = {dataCabjari} 
                                            zoominLimit = {5}
                                        />
                                    </CardBody>
                                </Card>
                            : null
                        }
                    </div>
                : <Skeleton height={60} count={3} style={{ marginBottom: "10px" }}/> 
            }
        </Fragment>
    );
};

export default OrganizationalStructure;