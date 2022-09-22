//Component
import Avatar           from "../../../components/widgets/avatar";
import { Col, Media, Row }        from "reactstrap";
import { ModalBase }    from "../../../components/widgets/modals-base";
import CustomTable      from "../../../components/widgets/custom-table";

//Utils
import Helper           from '../../../helpers';
import headerDetailTable from "./headerDetailTable";
import Skeleton from "react-loading-skeleton";
import CustomTableBodyEmpty from "../../../components/widgets/custom-table/CustomTableBodyEmpty";
import CustomTableBody from "../../../components/widgets/custom-table/CustomTableBody";
import CustomTablePaginate from "../../../components/widgets/custom-table/CustomTablePaginateV2";
import SearchTable from "../../../components/widgets/custom-table/SearchTable";


const DetailUserActivity = (props) => {
    
    const {
        setSearch,
        pagination,
        selectedDetail,
        detailListData,
        getUserActivity,
        setSelectedDetail,
        isDetailActivityVisible,
        setIsDetailActivityVisible
    }                         = props;

    const {fallbackImage_}    = Helper;


    return (
        <ModalBase
            size        = "xl"
            show        = {isDetailActivityVisible}
            title       = {`Aktifitas Akun`} 
            center      = {true}
            setShow     = {setIsDetailActivityVisible}
            onclose     = {() => {setSelectedDetail(null);}}
        >
            <div className='d-flex align-items-center my-2'>
                <Media left href='#'>
                    <Avatar 
                        img         = {selectedDetail?.avatar} 
                        onError     = {fallbackImage_}
                        imgWidth    = '40' 
                        imgHeight   = '40' 
                    />
                </Media>
                <div>
                    <Media className="mb-0 ml-1">{selectedDetail?.name}</Media>
                    <h6 className="text-muted ml-1 mt-0">{selectedDetail?.origin} </h6>
                </div>
            </div>

            <Row className="mr-0">
                <Col md={3}>
                </Col>
                <Col 
                    md = {{size : 4, offset : 5}}
                    id = "search-data"
                    className = "d-flex justify-content-end px-0"
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
            
            <CustomTable
                header      = {headerDetailTable} 
                placeholder = "Cari Aktifitas Pengguna..."
            >
                {
                    detailListData && detailListData?.data.map((data, i) => (
                        <div 
                            id          = "activity-table" 
                        >
                            <CustomTableBody key={i}>
                                <Col md="2" className="d-flex align-items-center">
                                    {Helper.dateIndo(data.time)}
                                </Col>
                                <Col md="4" className=" d-flex align-items-center">
                                    {data.message}
                                </Col>
                                <Col md="4">
                                    <div>
                                        <Media className="mb-0">{data.device}</Media>
                                        <h5 className="text-muted mt-0">IP : {data.ip} </h5>
                                    </div>
                                </Col>
                                <Col md="2">
                                    <Media className="mb-0">{data.status === 200 ? 'Sukses' : 'Gagal'}</Media>
                                </Col>
                            </CustomTableBody>
                        </div>
                    ))
                }

                {!detailListData && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
                {detailListData && detailListData.length == 0 && <CustomTableBodyEmpty />}
            </CustomTable>

        </ModalBase>
    )
};

export default DetailUserActivity;