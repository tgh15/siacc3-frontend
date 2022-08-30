import React, { 
    Fragment, 
    useState, 
    useEffect 
} from 'react';

import parse                from 'html-react-parser';
import { Card, CardBody }   from 'reactstrap';

//Icon
import { ArrowLeftCircle }  from 'react-feather';

//URL API
import { InstructionAPI }   from '../../../../services/pages/helpdesk/instruction';


const DetailHelpPage = ({ match }) => {
    const [detailGuide, setDetailGuide] = useState(false);

    useEffect(() => {
        getDetailGuideHelpdesk();
    }, []);

    //Get detail
    const getDetailGuideHelpdesk = () => {
        InstructionAPI.getDetailGuide(match.params.id).then(
            res => {
                if (res.status === 200) {
                    setDetailGuide(res.data);
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
                    <h5 className="font-weight-bolder mb-1">
                        {detailGuide.title}
                    </h5>
                    <p className='text-justify m-0'>
                        {
                            detailGuide.content != null ?
                                parse(detailGuide.content) 
                            : null
                        }
                    </p>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default DetailHelpPage;