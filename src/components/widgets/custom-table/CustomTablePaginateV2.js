import { Fragment }                  from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Col }                       from "reactstrap";


const CustomTablePaginate = (props) => {

    const {
        size,
        onPrev,
        onNext,
        getData,
        pagination,
        length = 10,
        offsetSearch,
    } = props

    return (
        <Fragment>
            {
                pagination && pagination.total_data > length  && 
                <Col id="pagination-data" sm={{ size: size ?? 2, offset: offsetSearch }} className="text-right pr-0 mb-1">
                    Halaman {pagination.page} dari {pagination.total_page}
                    {pagination.has_prev ? <ChevronLeft className="cursor-pointer" onClick={() => {onPrev ? onPrev() : getData({page : pagination.page-1})}} /> : <ChevronLeft className="text-muted" /> }
                    {pagination.has_next ? <ChevronRight className="cursor-pointer" onClick={() => {onNext ? onNext() : getData({page : pagination.page+1})}}  /> : <ChevronRight className="text-muted" />} 
                </Col>
            }
        </Fragment>
    );
};

export default CustomTablePaginate;