import { useContext, useState }     from "react"
import { Search }                   from "react-feather"
import { 
    Media,
    Input, 
    ListGroup, 
    InputGroup, 
    ListGroupItem, 
    InputGroupText, 
    InputGroupAddon,
    Label,
    FormGroup,
    Button, 
}                                   from "reactstrap"
import { EmployeeContext }          from "../../../context/EmployeeContext"
import Avatar                       from "../avatar"
import { ModalBase }                from "../modals-base"
import PerfectScrollbar             from "react-perfect-scrollbar"
import Helper                       from "../../../helpers"
import Skeleton                     from "react-loading-skeleton"
import CustomTableBodyEmpty         from "../custom-table/CustomTableBodyEmpty"

const SelectSingleUser = props => {

    const {
        show,
        size,
        title,
        setShow,
        onSelect
    } = props

    const {
        employeesFilter,
        getEmployeesWithKeyword,
    }                                   = useContext(EmployeeContext)

    const [keyword, setKeyword]         = useState(null);

    const { fallbackImage_ } = Helper

    const RenderUsers = () => {
        return (
            <PerfectScrollbar style={{ maxHeight: "300px" }}>
                <ListGroup>
                    {
                        employeesFilter != null ?
                            employeesFilter.length > 0 ?
                                employeesFilter.filter(opt => opt.uuid != Helper.getUserData().uuid).map((item, index) => {
                                    return (
                                        <ListGroupItem 
                                            key         = {index} 
                                            onClick     = {() => { onSelect(item) }}
                                            className   = "cursor-pointer" 
                                        >
                                            <Media>
                                                <Media left href='#'>
                                                    <Avatar 
                                                        img         = {item.photo == "" ? `https://ui-avatars.com/api/?name=${item ? item.name : "UN"}&background=4e73df&color=fff&bold=true` : item.photo} 
                                                        onError     = {fallbackImage_} 
                                                        imgHeight   = '40' 
                                                        imgWidth    = '40' 
                                                    />
                                                </Media>

                                                <Media body>
                                                    <Media header className="mb-0 ml-1">{item.name}</Media>
                                                    <h6 className="text-muted ml-1 mt-0">{item.workunit} </h6>
                                                </Media>
                                            </Media>
                                        </ListGroupItem>
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
            size        = {size || "sm"}
            show        = {show} 
            title       = {title} 
            setShow     = {() => { setShow(!show) }} 
        >
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
        </ModalBase>
    )
}

export default SelectSingleUser