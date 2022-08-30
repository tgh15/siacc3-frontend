import React from 'react'
import { File } from 'react-feather'
import { Card, CardBody, CardTitle, Nav, NavLink, Progress } from 'reactstrap'
import NavItem from 'reactstrap/lib/NavItem'

export const ProgressComponent=({datas})=>{
    return(
        <Card style={{display:"fixed"}}>
            <CardBody>
                <CardTitle>Upload Progress</CardTitle>
                <Nav vertical>
                <hr/>
                {
                    datas.map((value,index)=>{
                        return(<NavItem tag="a" href="#" key={`nav-item-progress-${index}`}>
                            <NavLink>

                                <File/>&nbsp;{value.name} {value.progress}%
                                <br/>
                                <br/>
                                <Progress color="success" value={value.progress}/>
                            </NavLink>
                        </NavItem>)
                    })
                }
                </Nav>
            </CardBody>
        </Card>
    )
}   