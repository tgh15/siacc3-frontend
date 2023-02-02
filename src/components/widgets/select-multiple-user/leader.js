import { useContext, useEffect, useState } from "react"
import { Search }               from "react-feather"
import { 
    Input, 
    Media,
    ListGroup, 
    InputGroup, 
    ListGroupItem, 
    InputGroupText, 
    InputGroupAddon, 
}                               from "reactstrap"
import { EmployeeContext }      from "../../../context/EmployeeContext"
import Avatar                   from "../avatar"
import { ModalBase }            from "../modals-base"
import PerfectScrollbar         from "react-perfect-scrollbar"
import Helper                   from "../../../helpers"
import ModalFooter              from "reactstrap/lib/ModalFooter"
import Button                   from "reactstrap/lib/Button"
import UserManagementApi from "../../../services/pages/configuration/user-management"

const SelectMultipleLeader = props => {

    const {
        size,
        show,
        title,
        center,
        setShow,
        onSelect,
        children,
        titleButton
    } = props

    const [searchUser, setSearchUser]       = useState("")
    const [userSelected, setUserSelected]   = useState([])

    const { leader }                        = useContext(EmployeeContext)

    const { fallbackImage_ } = Helper

    const selectUser = uuid => {
        if (userSelected.indexOf(uuid) != -1) {
            setUserSelected(userSelected.filter(opt => opt != uuid));
        } else {
            setUserSelected([...userSelected, uuid]);
        }
    }

    const renderUsers = () => {
        return (
            <PerfectScrollbar  style={{ maxHeight: "300px" }}>
                <ListGroup>
                    {
                    leader != null && leader.filter(opt => opt.uuid != Helper.getUserData().uuid).filter((val) => {
                        if (searchUser == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchUser.toLowerCase())) {
                            return val
                        }
                    }).map((item, index) => {
                        return (
                            <ListGroupItem
                                id          = {`leader_list_${index}`} 
                                key         = {index} 
                                active      = {userSelected.indexOf(item.position_id) != -1 ? "true" : "" } 
                                onClick     = {() => { selectUser(item.position_id) }} 
                                className   = "cursor-pointer" 
                            >
                                <Media>
                                    <Media left href='#'>
                                        <Avatar 
                                            img         = {item.photo == "" ? `https://ui-avatars.com/api/?name=${item ? item.name : "UN"}&background=4e73df&color=fff&bold=true` : item.photo} 
                                            onError     = {fallbackImage_} 
                                            imgWidth    = '40' 
                                            imgHeight   = '40' 
                                        />
                                    </Media>

                                    <Media body>
                                        <Media header className="mb-0 ml-1">{item.name}</Media>
                                        <h6 className="text-muted ml-1 mt-0">{item.workunit} </h6>
                                    </Media>
                                </Media>

                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </PerfectScrollbar>
        )
    }
    return (
        <ModalBase 
            show    = {show} 
            title   = {title} 
            size    = {size || "sm"} 
            center  = {center}
            setShow = {() => { setShow(!show) }} 
        >
            {children}
            <InputGroup className   = 'input-group-merge mb-1'>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <Search size={14} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input 
                    id          = {`search_filter_leader`}
                    onChange    = {(e) => { setSearchUser(e.target.value) }} 
                    placeholder = 'Cari...' 
                />
            </InputGroup>
            {renderUsers()}
            <ModalFooter>
                <Button 
                    id      = {`submit_button_filter_leader`}
                    block 
                    color   = "primary" 
                    onClick = {() => {onSelect(userSelected)}}  
                >
                    {titleButton}
                </Button>
            </ModalFooter>
        </ModalBase>
    )
}

export default SelectMultipleLeader;