import { Fragment }                  from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Col }                       from "reactstrap";


const CustomTablePaginate = (props) => {
console.log(props, 'pagination')
    const {
        pagination,
        offsetSearch,
        getData,
        onNext,
        onPrev,
        size,
        length = 10,
    } = props

    return (
        <Fragment>
            {
                pagination && pagination.data_total > length  && 
                <Col id="pagination-data" sm={{ size: size ?? 2, offset: offsetSearch }} className="text-right">
                    {(pagination.current_page * length) - (length-1)} - {pagination.current_page * length} of {pagination.data_total}
                    {pagination.has_previous ? <ChevronLeft className="cursor-pointer" onClick={() => {onPrev ? onPrev() : getData({page : pagination.current_page-1})}} /> : <ChevronLeft className="text-muted" /> }
                    {pagination.has_next ? <ChevronRight className="cursor-pointer" onClick={() => {onNext ? onNext() : getData({page : pagination.current_page+1})}}  /> : <ChevronRight className="text-muted" />} 
                </Col>
            }
        </Fragment>
    );
};

export default CustomTablePaginate;