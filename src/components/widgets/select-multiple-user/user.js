import { useContext, useEffect, useState } from "react"
import { Search } from "react-feather"
import { 
    Input, 
    Media,
    Button,
    ListGroup, 
    FormGroup,
    InputGroup, 
    ModalFooter,
    ListGroupItem, 
    InputGroupText, 
    InputGroupAddon, 
}                               from "reactstrap"
import { EmployeeContext }      from "../../../context/EmployeeContext"
import Avatar                   from "../avatar"
import { ModalBase }            from "../modals-base"
import PerfectScrollbar         from "react-perfect-scrollbar"
import Helper                   from "../../../helpers"
import Skeleton                     from "react-loading-skeleton"
import CustomTableBodyEmpty         from "../custom-table/CustomTableBodyEmpty"


const SelectMultipleUserFull = props => {

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

    const [keyword, setKeyword]         = useState(null);
    const [userSelected, setUserSelected]   = useState([])

    const { 
        employeesFilter,
        getEmployeesWithKeyword,
    }                     = useContext(EmployeeContext)

    const { fallbackImage_ } = Helper

    const selectUserFull = (data) => {
        if (userSelected.map(e => e.uuid).indexOf(data.uuid) != -1) {
            setUserSelected(userSelected.filter(opt => opt.uuid != data.uuid));
        } else {
            setUserSelected([...userSelected, data]);
        }
    }

    useEffect(() => {
        console.log(userSelected);
    }, [userSelected]);

    const RenderUsers = () => {
        return (
            <PerfectScrollbar  style={{ maxHeight: "300px" }}>
                <ListGroup>
                    {
                        employeesFilter != null ?
                            employeesFilter.length > 0 ?
                                employeesFilter.filter(opt => opt.uuid != Helper.getUserData().uuid).map((item, index) => {
                                    return (
                                        <>
                                            <ListGroupItem 
                                                key         = {index} 
                                                active      = {userSelected.map((data) => data.uuid).indexOf(item.uuid) != -1 ? "true" : "" } 
                                                onClick     = {() => { selectUserFull(item)}} 
                                                className   = "cursor-pointer" 
                                            >
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
                                        </>
                                    )
                                })
                            :
                                <CustomTableBodyEmpty/>
                        :
                            <Skeleton height={50} count={5}/>
                    }
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
            <FormGroup>
                <InputGroup className='input-group-merge'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                        onChange    = {(e) => { setKeyword(e.target.value) }} 
                        placeholder = 'Masukkan Nama Pengguna ...' 

                    />
                    <Button 
                        color      = 'primary' 
                        outline
                        onClick    = {() => { getEmployeesWithKeyword(keyword) }} 
                    >
                        Cari
                    </Button>
                </InputGroup>
            </FormGroup>

            <RenderUsers/>

            <ModalFooter>
                <Button color="primary" block onClick={() => {onSelect(userSelected)}}  >
                    {titleButton}
                </Button>
            </ModalFooter>
        </ModalBase>
    )
}

export default SelectMultipleUserFull;