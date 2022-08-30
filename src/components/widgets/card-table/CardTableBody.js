import { Fragment } from "react"
import { Card,Col,CardBody, Row } from "reactstrap"



export const CardTableBody  = ({items})=>{
    if(Array.isArray(items)){
        return(
            <Fragment>
                {
                    items.map((value,index)=>{
                        let rows = []
                        if(Array.isArray(value.data)){
                            value.data.map(valChild=>{
                                rows.push(<Col sm={valChild.sm} md={valChild.md}>{valChild.text}</Col>)
                            })
                        }
                    
                        return (
                            <Card style={{marginTop:"1.5em",marginBottom:"1.5em"}}>
                                <CardBody>
                                    <Row>
                                        {rows}
                                    </Row>
                                </CardBody>
                            </Card>
                        )
                    })
                }
            </Fragment>
        )
    }else{
        return(
            <Card style={{marginTop:"1.5em",marginBottom:"1.5em"}}>
                <CardBody className='text-center'>
                    Tidak ada Data
                </CardBody>
            </Card>
        )
    }
}