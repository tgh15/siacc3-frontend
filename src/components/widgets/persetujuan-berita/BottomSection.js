import React,{ useState } from "react"
import { Archive, Globe, User } from "react-feather"
import {Button, Card, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Media, UncontrolledButtonDropdown} from "reactstrap"
import { SelectWilayah } from "./"
import { SelectLeader } from "./SelectLeader"


export const BottomPersetujuan = ({data,onSubmit})=>{
    const [showWilayah,setShowWilayah] = useState(false)
    const toggleWilayah = ()=>{setShowWilayah(!showWilayah)}
    const [showLeader,setShowLeader] = useState(false)
    const toggleLeader = ()=>{setShowLeader(!showLeader)}
    return(
        <Card>
            <SelectWilayah 
                data    = {data.agent_report} 
                onSubmit= {onSubmit}
                show    = {showWilayah} 
                setShow = {toggleWilayah}/>
            <SelectLeader 
                show     = {showLeader} 
                setShow  = {toggleLeader} 
                agentRpt = {data.agent_report}
                />
            <div className='media-list'>
                <Media>
                    <Media left href="#">
                        <Media
                            className='rounded-circle'
                            object
                            src={data.avatar}
                            height='64'
                            width='64'
                            alt='Generic placeholder image'
                            />
                    </Media>
                    <Media body>
                        
                            <Media heading>{data.account}</Media>
                            <small className="text-muted">{data.timeUpdate} - {data.location}</small>
                            <br/>
                            <FormGroup><strong>{data.title}</strong></FormGroup>
                            <FormGroup>{data.text}</FormGroup>
                            <UncontrolledButtonDropdown>
                                <Button color="primary" size="sm" onClick={toggleWilayah}>Tentukan Status</Button>
                                <DropdownToggle className='dropdown-toggle-split' color='primary' caret></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href='#' onClick={toggleLeader} tag='a'><User/>&nbsp;Teruskan Ke Pimpinan</DropdownItem>
                                    <DropdownItem href='#' onClick={toggleWilayah} tag='a'><Globe/>&nbsp;Publikasikan Berita</DropdownItem>
                                    <DropdownItem href='#' tag='a'><Archive/>&nbsp;Arsipkan Berita</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                    </Media>
                </Media>
            </div>
        </Card>
    )
}