import React, { 
    Fragment, 
    useState, 
    useEffect 
}  from 'react';
import { Card, CardBody }   from 'reactstrap';
import { Link }             from 'react-router-dom';

//Icon
import { ArrowLeftCircle }  from 'react-feather';

//URL API
import { InstructionAPI }   from '../../../../services/pages/helpdesk/instruction';

//Component
import CustomToast          from '../../../../components/widgets/custom-toast';


const HelpPage = () => {
    const [guideAll, setGuideAll] = useState(false);

    useEffect(() => {
        getGuideHelpdesk();
    }, []);

    //Get all
    const getGuideHelpdesk = () => {
        InstructionAPI.getGuideAll().then(
            res => {
                if (res.status === 200 && res.data != null ) {
                    setGuideAll(res.data);
                }
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    return (
        <Fragment>
            <div className="d-flex mb-2">
                <a href="/helpdesk/instruction">
                    <ArrowLeftCircle size={35}/>
                </a>
                <h4 
                    style       = {{ margin: '7px 0px 0px 20px' }}
                    className   = "font-weight-bolder" 
                >
                    Halaman Bantuan/Petunjuk
                </h4>
            </div>
            <Card>
                <CardBody>
                    <h5 className="font-weight-bolder">Petunjuk</h5>
                    <ol>
                        {
                            guideAll && guideAll.map((data) => (
                                <li>
                                    <Link to={`/helpdesk/help-page/${data.id}`}>
                                        {data.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ol>
                    <h5 className="font-weight-bolder mt-2">
                        Informasi Pembaharuan
                    </h5>
                    <ol>
                        <h5 className="font-weight-bolder">
                            <li>Mobile Aplikasi Update - Versi 1.0.2</li>
                        </h5>
                        <ul>
                            <li>Tema baru aplikasi</li>
                        </ul>
                    </ol>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default HelpPage;