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
import UserActivityApi                  from '../../../services/pages/configuration/user-activity';
import CustomTablePaginate              from '../../../components/widgets/custom-table/CustomTablePaginate';
import CustomTableBodyEmpty             from '../../../components/widgets/custom-table/CustomTableBodyEmpty';


const UserActivity = (props) => {
    //Props
    const {setShowAction}               = props;

    const {fallbackImage_, useQuery}    = Helper;
    let query                           = useQuery();

    //Ref
    const filter                        = useRef("all");
    const searchTerm                    = useRef(null);
    const pageActive                    = useRef(1);

    //State
    const [listData, setListData]       = useState(false);
    const [pagination, setPagination]   = useState(false);
    const [filterModal, setFilterModal] = useState(false);

    useEffect(() => {
        if (query.get('action') === 'get'){
            setShowAction('get');
        }else if(query.get('action') === 'filter'){
            setShowAction('filter');
        }else if(query.get('action') === 'search'){
            setShowAction('search');
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let params = {
            page    : pageActive.current,
            filter  : filter.current,
            search  : searchTerm.current
        }
        setListData(false);

        UserActivityApi.get({
            onSuccess: (res) => {
                setListData(res.data);
                var customPagination = {
                    has_next        : (res.next == "") ? false : true,
                    has_previous    : (res.prev == "") ? false : true,
                    current_page    : res.current_page,
                    total_page      : res.total_page,
                    data_total      : res.total
                }
                setPagination(customPagination);
            }, onFail: (err) => {
                CustomToast("danger", err.message);
            }, params: params
        })
    };

    return (
        <Fragment>
            <ModalBase
                size    = "sm"
                show    = {filterModal}
                title   = "Filter"
                setShow = {(par) => { setFilterModal(par) }}
            >
                <TourFilter
                    onReset         = {() => { getData(); setFilterModal(!filterModal);}}
                    onFilter        = {() => { getData(); setFilterModal(!filterModal);}}
                    setFilter       = {(par) => {filter.current = par}}
                    setPageActive   = {(par) => {pageActive.current = par}}
                    setSearchTerm   = {(par) => {searchTerm.current = par}}
                />
            </ModalBase>

            <Row>
                <div id="filter-data">
                    <Col md={1}>
                        <ButtonFilter onClick={() => {setFilterModal(!filterModal)}}/>
                    </Col>
                </div>
                <Col 
                    sm = {{ size: 4, offset: 7 }} 
                    id = "search-data"
                >
                    <SearchTable onSearch= {(par) => {
                            filter.current     = "all"; 
                            pageActive.current = 1; 
                            searchTerm.current = par; 
                            getData(); 
                        }}
                    />
                </Col>
            </Row>

            {/* pagination */}
            <CustomTablePaginate 
                onNext          = {() => {pageActive.current = pagination.current_page+1; getData()}} 
                onPrev          = {() => {pageActive.current = pagination.current_page-1; getData()}}
                pagination      = {pagination}  
                offsetSearch    = {10} 
            /><br/>
            
            {/* table */}
            <CustomTable
                header      = {headerTable} 
                placeholder = "Cari Aktifitas Pengguna..."
            >
                {
                    listData && listData.map((data, i) => (
                        <div id = "activity-table">
                            <CustomTableBody key={i}>
                                <Col md="2">
                                    {Helper.dateIndo(data.time)}
                                </Col>
                                <Col md="5">
                                <Media>
                                    <Media left href='#'>
                                        <Avatar 
                                            img         = {data.avatar} 
                                            status      = 'online'
                                            onError     = {fallbackImage_}
                                            imgHeight   = '40' 
                                            imgWidth    = '40' 
                                        />
                                    </Media>
                                    <Media body>
                                        <Media className="mb-0 ml-1">{data.name}</Media>
                                            <h6 className="text-muted ml-1 mt-0">{data.origin} </h6>
                                        </Media>
                                    </Media>
                                </Col>
                                <Col md="4">
                                    {data.activity}
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