import { Fragment }                     from "react";
import { Card, CardBody, Row, Col }     from "reactstrap";
import ButtonAdd                        from "./ButtonAdd";
import ButtonFilter                     from "./ButtonFilter";
import SearchTable                      from "./SearchTable";
import CustomTablePaginate              from "./CustomTablePaginate";


const CustomTable = (props) => {
    // ** Props
    const {
        header,
        onClickFilter,
        pagination,
        onSearch,
        onClickForm,
        placeholder,
        getData,
        roleAdd,
        onNext,
        onPrev
    } = props

    const placeholders = placeholder == undefined || placeholder == null ? "Cari..." : placeholder
    const offsetSearch = (onClickForm) ? 8 : 10

    return (
        <Fragment>
            <Row>
                <Col sm="1">
                    {
                        (onClickFilter) ? 
                            <ButtonFilter onClick={onClickFilter}/> 
                        : null
                    }
                </Col>
                <Col sm={{ size: 4, offset: 7 }}>
                    {
                        (onSearch) ?
                            <SearchTable 
                                id          = "search-data" 
                                onSearch    = {onSearch}
                                placeholder = {placeholders} 
                            />
                        : null
                    }
                </Col>
                <Col sm={{ size: 2 }}>
                    {
                        roleAdd ? 
                            (onClickForm) ? 
                                <ButtonAdd 
                                    id      = "add-data" 
                                    onClick = {onClickForm}
                                />
                            : null
                        :
                            null
                    }
                </Col>
                <CustomTablePaginate 
                    getData         = {getData}
                    pagination      = {pagination} 
                    offsetSearch    = {offsetSearch}
                    onNext          = {onNext}
                    onPrev          = {onPrev} 
                />
            </Row>
            <Card 
                style       = {{ backgroundColor: "transparent" }}
                className   = "bg-transparant mb-0"
            >
                <CardBody>
                    <Row>
                        {header.map((col, index) => (
                            <Col 
                                md          = {col.size} 
                                key         = {`th-key-${index}`} 
                                className   = {col.className}
                            >
                                {col.title}
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            </Card>
            {props.children}
        </Fragment>
    );
}

export default CustomTable;