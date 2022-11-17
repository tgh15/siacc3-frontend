import { useContext, useState } from "react"
import { Search } from "react-feather"
import { Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, Media } from "reactstrap"
import { EmployeeContext } from "../../../context/EmployeeContext"
import Avatar from "../avatar"
import { ModalBase } from "../modals-base"
import PerfectScrollbar from "react-perfect-scrollbar"
import Helper from "../../../helpers"

const SelectSingleUser = props => {

    const {
        show,
        setShow,
        title,
        size,
        onSelect
    } = props

    const [searchUser, setSearchUser] = useState("")
    const {employees} = useContext(EmployeeContext)

    const { fallbackImage_ } = Helper

    const renderUsers = () => {
        return (
            <PerfectScrollbar style={{ maxHeight: "300px" }}>
                <ListGroup>
                    {employees.filter(opt => opt.uuid != Helper.getUserData().uuid).filter((val) => {
                        if (searchUser == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchUser.toLowerCase())) {
                            return val
                        }
                    }).map((item, index) => {
                        return (
                            <ListGroupItem key={index} className="cursor-pointer" onClick={() => { onSelect(item) }}>
                                <Media>
                                    <Media left href='#'>
                                        <Avatar onError={fallbackImage_} img={item.photo == "" ? `https://ui-avatars.com/api/?name=${item ? item.name : "UN"}&background=4e73df&color=fff&bold=true` : item.photo} imgHeight='40' imgWidth='40' />
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
        <ModalBase show={show} setShow={() => { setShow(!show) }} title={title} size={size || "sm"}>
            <InputGroup className='input-group-merge mb-1'>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <Search size={14} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder='Cari...' onChange={(e) => { setSearchUser(e.target.value) }} />
            </InputGroup>
            {renderUsers()}
        </ModalBase>
    )
}

export default SelectSingleUser