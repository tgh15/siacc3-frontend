import React, { 
    Fragment, 
    useState, 
    useEffect 
} from 'react';
import { Col }                  from 'reactstrap';
import Skeleton                 from 'react-loading-skeleton';

//Icon
import { Eye, Trash2, Upload }  from 'react-feather';

//API
import { ReportAPI }            from '../../../services/pages/helpdesk/report';

//Components
import FormDelete               from '../../../components/widgets/form-delete/FormDelete';
import CustomToast              from '../../../components/widgets/custom-toast';
import CustomTable              from '../../../components/widgets/custom-table';
import index_header             from './index_header';
import CreateReport             from './create';
import CustomTableBody          from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTableBodyEmpty     from '../../../components/widgets/custom-table/CustomTableBodyEmpty';


const Report = () => {
    const [loading, setLoading]               = useState(false);
    const [listData, setListData]             = useState(false);
    const [selectedId, setSelectedId]         = useState(null);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = (params) => {
        ReportAPI.getAllReport(params).then(
            res => {
                setListData(res.data);
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    const onDelete = () => {
        setLoading(true);

        ReportAPI.deleteReport(selectedId).then(
            res => {
                setLoading(false);
                setListData(false);
                setShowDeleteForm(false);

                //Success Message
                CustomToast("success", "Data Berhasil di hapus");

                //Refresh page
                getData();
            },
            err => {
                CustomToast("danger", err.message);
            }
        )
    };
    
    return (
        <Fragment>
            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Laporan Kategori"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {onDelete}
                description = "Laporan Halpdesk"
            />

            <CreateReport
                //Function
                getData     = {getData}

                //State
                loading     = {loading}
                setLoading  = {setLoading}
                setListData = {setListData}
            />

            <CustomTable
                header      = {index_header}
                getData     = {(params) => { getData(params) }}
                onSearch    = {(keyword) => { setListData(false); getData( keyword ) }}
                placeholder = "Klik untuk mencari..."
            >
                {
                    listData && listData.map((data, index) => (
                        <CustomTableBody>
                            <Col md="1">
                                {index+1}
                            </Col>
                            <Col md="9">
                                {data.title}
                            </Col>
                            <Col md="2">
                                <Upload 
                                    size        = {20} 
                                    className   = "mr-1 cursor-pointer"
                                />
                                <a href={`/helpdesk/report/detail/${data.id}`}>
                                    <Eye 
                                        size        = {20} 
                                        className   = "mr-1 cursor-pointer text-secondary"
                                    />
                                </a>
                                <Trash2 
                                    size        = {20} 
                                    onClick     = {() => { 
                                                    setShowDeleteForm(true); 
                                                    setSelectedId(data.id) 
                                                }}
                                    className   = "mr-1 cursor-pointer"
                                />
                            </Col>
                        </CustomTableBody>
                    ))
                }
                {
                    !listData && listData !== null &&
                    <Skeleton
                        count   = {3} 
                        style   = {{ marginBottom: "10px" }}
                        height  = {60}
                    />
                }
                {
                    listData && listData.length === 0 &&
                    <div style={{ border: '1px solid #efefef', borderRadius:'7px' }}>
                        <div className='mt-2'>
                            <CustomTableBodyEmpty/>
                        </div>
                    </div>
                }
            </CustomTable>
        </Fragment>
    );
};

export default Report;