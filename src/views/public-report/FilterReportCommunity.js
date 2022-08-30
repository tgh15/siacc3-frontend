import { Fragment, useContext, useState } from 'react'
import { Button, Col, FormGroup, Label, Row } from 'reactstrap'
import { PublicReportContext } from '../../context/PublicReportContext'


const FilterReportCommunity = (props) => {

    const {getData} = useContext(PublicReportContext)
    const [newsType, setNewsType] = useState("asc")

    const onToggle = (tab) => {
        setNewsType(tab)
        props.onClose(false)
        getData(tab)
    } 

    return (
        <Fragment>
            <FormGroup>
                <Label>Urutkan</Label>
                <Row>
                    <Col>
                        {(newsType === "asc") ? <Button.Ripple block color="primary" onClick={() => onToggle("asc")}>Terbaru</Button.Ripple> : <Button.Ripple outline block color="primary" onClick={() => onToggle("asc")}>Terbaru</Button.Ripple>}
                    </Col>
                    <Col className="mr-1">
                        {(newsType === "desc") ? <Button.Ripple block className="ml-1" color="primary" onClick={() => onToggle("desc")}>Terlama</Button.Ripple> : <Button.Ripple outline block className="ml-1" color="primary" onClick={() => onToggle("desc")}>Terlama</Button.Ripple>}
                    </Col>
                </Row>
            </FormGroup>
        </Fragment>
    )
}

export default FilterReportCommunity