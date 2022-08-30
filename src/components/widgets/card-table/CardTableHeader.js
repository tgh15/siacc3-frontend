import React,{ Fragment } from "react"
import { Col, Row } from "reactstrap"



export const CardTableHeader = ({tableElements})=>{
    
    return(
        <Fragment>
            {Array.isArray(tableElements)?(
                <div className="container-fluid">
                    <Row>
                        {tableElements.map((value,index)=>{
                            return(
                                <Col md={value.md} sm={value.sm} className={`text-primary ${(value.hasOwnProperty("className")?value.className:"text-left")}`} key={`th-${index+1}`}>
                                    <small>{value.text}</small>
                                </Col>
                            )
                        })}
                    </Row>

                </div>
            ):null}
        </Fragment>
    )
}