import { 
    useRef, 
    Fragment, 
    useState, 
    useEffect, 
}                                       from 'react';
import { Col, Media, Row }              from 'reactstrap';

import Avatar                           from '@components/avatar';
import Skeleton                         from 'react-loading-skeleton';

//Components
import Helper                           from '../../../helpers';
import TourFilter                       from './TourFilter';
import headerTable                      from './headerTable';
import CustomTable                      from '../../../components/widgets/custom-table';
import CustomToast                      from '../../../components/widgets/custom-toast';
import SearchTable                      from '../../../components/widgets/custom-table/SearchTable';
import ButtonFilter                     from '../../../components/widgets/custom-table/ButtonFilter';
import { ModalBase }                    from '../../../components/widgets/modals-base';
import CustomTableBody                  from '../../../components/widgets/custom-table/CustomTableBody';
import UserActivityAPI                  from '../../../services/pages/configuration/user-activity';
import CustomTablePaginate              from '../../../components/widgets/custom-table/CustomTablePaginateV2';
import CustomTableBodyEmpty             from '../../../components/widgets/custom-table/CustomTableBodyEmpty';
import { Eye } from 'react-feather';
import DetailUserActivity from './DetailUserActivity';


const UserActivity = (props) => {
    //Props
    const {setShowAction}                                       = props;

    const {fallbackImage_, useQuery}                            = Helper;
    let query                                                   = useQuery();

    //State
    const [search, setSearch]                                   = useState(null);
    const [listData, setListData]                               = useState(null);
    const [pagination, setPagination]                           = useState(false);
    const [filterType, setFilterType]                           = useState(null);
    const [filterModal, setFilterModal]                         = useState(false);
    const [filterValue, setFilterValue]                         = useState(null);
    const [selectedDetail, setSelectedDetail]                   = useState(null);
    const [detailListData, setDetailListData]                   = useState(null);
    const [paginationDetail, setPaginationDetail]               = useState(false);
    const [isDetailActivityVisible, setIsDetailActivityVisible] = useState(false);

    const handleDetail = (data) => {
        setSelectedDetail(data);
        setIsDetailActivityVisible(true);
    };

    const getUserActivity = (page = 1) => {

        if(selectedDetail == null){
            setListData(null);
        }else{
            setDetailListData(null);
        }

        const param = {
            page : page,
        }

        if(selectedDetail != null){
            param.uuid = selectedDetail.uuid
        }else{
            param.list = true
        }

        if(search != null){
            param.keyword = search
        }

        UserActivityAPI.getUserActivity(param).then(
            res => {

                if(!res.is_error){
                    if(res.data.result != null){

                        if(selectedDetail == null){
                            setListData(res.data.result);
                            setPagination(res.data.pagination);
                        }else{
                            setDetailListData(res.data.result)
                            setPaginationDetail(res.data.pagination);
                        }

                    }else{
                        if(selectedDetail == null){
                            setListData([]);
                            setPagination(res.data.pagination);
                        }else{
                            setDetailListData([]);
                            setPaginationDetail(res.data.pagination);
                        }
                    }
                }else{
                    CustomToast("danger", res.code);
                }
            },
            err => { 
                CustomToast("danger", err.code);
            }
        )
    }

    useEffect(() => {
        getUserActivity();
    }, [selectedDetail, search]);

    useEffect(() => {
        if (query.get('action') === 'get'){
            setShowAction('get');
        }else if(query.get('action') === 'filter'){
            setShowAction('filter');
        }else if(query.get('action') === 'search'){
            setShowAction('search');
        }
    }, []);

    return (
        <Fragment>
            {/* Modal Tour */}
            <ModalBase
                size    = "sm"
                show    = {filterModal}
                title   = "Filter"
                setShow = {(par) => { setFilterModal(par) }}
            >
                <TourFilter
                    setFilterType  = {setFilterType}
                    selectedDetail = {selectedDetail}
                    setFilterValue = {setFilterValue}
                    setFilterModal = {setFilterModal}
                />
            </ModalBase>

            {/* Modal Detail Log */}
            <DetailUserActivity
                setSearch                   = {setSearch}
                pagination                  = {paginationDetail}
                detailListData              = {detailListData}
                selectedDetail              = {selectedDetail}
                getUserActivity             = {getUserActivity}
                setSelectedDetail           = {setSelectedDetail}
                isDetailActivityVisible     = {isDetailActivityVisible}
                setIsDetailActivityVisible  = {setIsDetailActivityVisible}
            />

            <Row className="mr-0">
                <Col md={3}>
                    <ButtonFilter onClick={() => {setFilterModal(!filterModal)}}/>
                </Col>
                <Col 
                    md          = {{size : 4, offset : 5}}
                    id          = "search-data"
                    className   = "d-flex justify-content-end px-0"
                >
                    <SearchTable onSearch= {(par) => {setSearch(par)}}/>
                </Col>
            </Row>

            {/* pagination */}
            <CustomTablePaginate 
                getData         = {(params) => { getUserActivity(params.page)}}
                pagination      = {pagination}  
                placeholder     = "Cari Aktifitas Pengguna"
                offsetSearch    = {10} 
            />
            
            {/* table */}
            <CustomTable
                header      = {headerTable} 
                placeholder = "Cari Aktifitas Pengguna..."
            >
                {
                    listData && listData.map((data, i) => (
                        <div 
                            id          = "activity-table" 
                        >
                            <CustomTableBody key={i}>
                                <Col md="2" className="d-flex align-items-center">
                                    {Helper.dateIndo(data.time)}
                                </Col>
                                <Col md="3" className='d-flex align-items-center'>
                                    <div className='d-flex align-items-center'>

                                        <Media left href='#'>
                                            <Avatar 
                                                img         = {data.avatar} 
                                                onError     = {fallbackImage_}
                                                imgWidth    = '40' 
                                                imgHeight   = '40' 
                                            />
                                        </Media>
                                        <div>
                                            <Media className="mb-0 ml-1">{data.name}</Media>
                                            <h6 className="text-muted ml-1 mt-0">{data.origin} </h6>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="3" className=" d-flex align-items-center">
                                    {data.message}
                                </Col>
                                <Col md="2" className='d-flex align-items-center'>
                                    <div>
                                        <Media className="mb-0">{data.device}</Media>
                                        <h5 className="text-muted mt-0">IP : {data.ip} </h5>
                                    </div>
                                </Col>
                                <Col md="1" className='d-flex align-items-center'>
                                    <Media className="mb-0">{data.status === 200 ? 'Sukses' : 'Gagal'}</Media>
                                </Col>
                                <Col md="1" className='d-flex align-items-center'>
                                    <Eye 
                                        size    = {20}
                                        onClick = {() => {handleDetail(data)}}
                                        className   = {'cursor-pointer'}

                                    />
                                </Col>
                            </CustomTableBody>
                        </div>
                    ))
                }

                {!listData && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
                {listData && listData.length == 0 && <CustomTableBodyEmpty />}
            </CustomTable>
        </Fragment>
    );
};

export default UserActivity;