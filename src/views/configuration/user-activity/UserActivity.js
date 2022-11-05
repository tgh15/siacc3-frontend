import { 
    useRef, 
    Fragment, 
    useState, 
    useEffect, 
}                            from 'react';
import { Col, Media }        from 'reactstrap';

import Skeleton              from 'react-loading-skeleton';

//Helper
import Helper                from '../../../helpers';

//Service
import UserActivityApi       from '../../../services/pages/configuration/user-activity';

//Components
import Avatar                from '@components/avatar';
import TourFilter            from './TourFilter';
import headerTable           from './headerTable';
import CustomTable           from '../../../components/widgets/custom-table';
import CustomToast           from '../../../components/widgets/custom-toast';
import SearchTable           from '../../../components/widgets/custom-table/SearchTable';
import ButtonFilter          from '../../../components/widgets/custom-table/ButtonFilter';
import { ModalBase }         from '../../../components/widgets/modals-base';
import CustomTableBody       from '../../../components/widgets/custom-table/CustomTableBody';
import CustomTablePaginate   from '../../../components/widgets/custom-table/CustomTablePaginate';
import CustomTableBodyEmpty  from '../../../components/widgets/custom-table/CustomTableBodyEmpty';


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
        setListData(false);

        let params = {
            page    : pageActive.current,
            filter  : filter.current,
            keyword : searchTerm.current
        }

        UserActivityApi.get({
            onSuccess: (res) => {
                setListData(res.data.result);

                var customPagination = {
                    has_next        : (res.data.pagination.has_next == "") ? false : true,
                    has_previous    : (res.data.pagination.has_previous == "") ? false : true,
                    current_page    : res.data.pagination.current_page,
                    total_page      : res.data.pagination.page_total,
                    data_total      : res.data.pagination.data_total
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

            {/* filter and search */}
            <div className='d-flex justify-content-between'>
                <div id="filter-data">
                    <ButtonFilter onClick={() => {setFilterModal(!filterModal)}}/>
                </div>
                <div style={{ width: '350px' }}>
                    <SearchTable 
                        onSearch = {(par) => {
                            filter.current     = "all"; 
                            pageActive.current = 1; 
                            searchTerm.current = par; 
                            getData(); 
                        }}
                    />
                </div>
            </div>

            {/* pagination */}
            <div style={{ marginBottom: '20px', marginRight: '-20px' }}>
                <CustomTablePaginate 
                    onNext          = {() => {pageActive.current = pagination.current_page+1; getData()}} 
                    onPrev          = {() => {pageActive.current = pagination.current_page-1; getData()}}
                    pagination      = {pagination}  
                    offsetSearch    = {10} 
                />
            </div>
            
            {/* table */}
            <CustomTable
                header = {headerTable}
            >
                {
                    listData && listData.map((data, i) => (
                        <div 
                            id  = "activity-table"
                            key = {i}
                        >
                            <CustomTableBody>
                                <Col md="2">
                                    {Helper.dateIndo(data.time)}
                                </Col>
                                <Col md="5">
                                    <Media>
                                        <Media 
                                            left 
                                            href='#'
                                        >
                                            <Avatar 
                                                img         = {data.avatar} 
                                                status      = 'online'
                                                onError     = {fallbackImage_}
                                                imgHeight   = '40' 
                                                imgWidth    = '40' 
                                            />
                                        </Media>
                                        <Media body>
                                            <Media className="mb-0 ml-1">
                                                {data.name}
                                            </Media>
                                            <h6 className="text-muted ml-1 mt-0">
                                                {data.origin}
                                            </h6>
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