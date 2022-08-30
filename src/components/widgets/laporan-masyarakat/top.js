import React from 'react'
import {Button,Row,Col} from 'reactstrap'
import { Filter } from'react-feather'

export const TopLaporanMasyarakat = (props)=>{
    return(
        <Row>
            <Col>
                <Button color="primary" className="btn-icon"><Filter/></Button>
            </Col>
        </Row>
    )
}