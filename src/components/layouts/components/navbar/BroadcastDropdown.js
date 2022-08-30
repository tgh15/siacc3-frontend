// ** React Imports
import { Fragment, useContext, useState } from 'react'

// ** Custom Components
import Avatar from '../../../widgets/avatar'
import ImgDefault from '@src/assets/images/portrait/small/150x150.png'
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Radio, Edit, Search, Image, FileText, ChevronDown, X, File } from 'react-feather'
import {
    Badge,
    Media,
    Input,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    InputGroupAddon,
    InputGroup,
    InputGroupText,
    Label,
    FormGroup,
    ModalFooter,
    Button,
    Card,
    CustomInput,
    Spinner
} from 'reactstrap'
import { ModalBase } from '../../../widgets/modals-base'
import CardBody from 'reactstrap/lib/CardBody'
import { BroadcastContext } from '../../../../context/BroadcastContext'
import Helper from '../../../../helpers'
import BroadcastDetail from '../broadcast/BroadcastDetail'
import SelectMultipleUser from '../../../widgets/select-multiple-user'
import { EmployeeContext } from '../../../../context/EmployeeContext'
import "../../../scss/base/pages/broadcast.scss"
import classNames from 'classnames'
import CustomToast from '../../../widgets/custom-toast'
import ChatApi from '../../../../services/pages/chat'


const BroadcastDropdown = () => {

    // contexts
    const { broadcastCount, broadcast, setBroadcastSelected, readBroadcast, socketBroadcast,modalDetailBroadcast,setModalDetailBroadcast } = useContext(BroadcastContext)
    const { employees } = useContext(EmployeeContext)

    // states
    const [modalSelectContact, setModalSelectContact] = useState(false)
    const [seachTerm, setSeachTerm] = useState("")
    
    const [userSelected, setUserSelected] = useState([])
    const [fileSelected, setFileSelected] = useState([])
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [modalBroadcast, setModalBroadcast] = useState(false)
    // helper
    const { dateIndo, fallbackImage_ } = Helper

    // ** Function to render Notifications
    /*eslint-disable */
    const renderNotificationItems = () => {
        return (
            <PerfectScrollbar
                component='li'
                className='media-list scrollable-container'
                options={{
                    wheelPropagation: false
                }}
            >
                {broadcast != null && broadcast.length > 0 && broadcast.filter((val) => {
                    if (seachTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(seachTerm.toLowerCase())) {
                        return val
                    }
                }).map((item, index) => {
                    return (
                        <a key={index} className='d-flex' href='/' onClick={e => { e.preventDefault(); setModalDetailBroadcast(!modalDetailBroadcast); setBroadcastSelected(item); readBroadcast(item.id) }}>
                            <Media
                                className={classnames('d-flex', {
                                    'align-items-start': !item.switch,
                                    'align-items-center': item.switch
                                })}
                            >

                                <Fragment>
                                    <Media left>
                                        <Avatar color='primary' icon={<Radio size={14} />} />
                                    </Media>
                                    <Media body>
                                        {item.name}<br />
                                        <small className='notification-text'>{item.last_message}</small>
                                    </Media>
                                    <Media right style={{ fontSize: "9pt" }}>
                                        {dateIndo(item.time)}
                                    </Media>
                                </Fragment>


                            </Media>
                        </a>
                    )
                })}

                {broadcast != null && broadcast.length == 0 &&
                    <h4 className='d-flex align-items-center justify-content-center py-2'>
                        Tidak Ada Pesan Siaran
                    </h4>
                }
            </PerfectScrollbar>
        )
    }
    /*eslint-enable */

    const selectFile = e => {
        const reader = new FileReader(),
            files = e.target.files

        if (!fileSelected.filter(f => f == files[0]).length) {
            setFileSelected([...fileSelected, files[0]])
        } else {
            setFileSelected(fileSelected.filter(u => u != files[0]))
        }
    }

    const removeFile = (file) => {
        setFileSelected(fileSelected.filter(f => f != file))
    }

    const SelectUser = user => {
        if (!userSelected.filter(u => u == user).length) {
            setUserSelected([...userSelected, user])
        } else {
            setUserSelected(userSelected.filter(u => u != user))
        }
    }

    const onSubmit = () => {
        setLoading(true)


        if (userSelected.length < 2) {
            CustomToast("danger", "Jumlah kontak harus lebih dari 1.")
            setLoading(false)
        }

        var val = {
            type: "communication-message-broadcast",
            is_secure: true,
            token: localStorage.getItem('token'),
            payload: {
                content: content,
                member_id: Array.from(userSelected, u => u.uuid),
                attachment_id: [],
            }
        };


        if (socketBroadcast != null) {


            if (fileSelected.length > 0) {
                const formData = new FormData()
                fileSelected.forEach(file => {
                    formData.append('attachment[]', file)
                })
                ChatApi.uploadAttachment({
                    dataFile: formData,
                    onSuccess: (res) => {


                        val.payload.attachment_id = Array.from(res, r => r.id)

                        socketBroadcast.send(JSON.stringify(val))
                        setLoading(false)
                        setModalBroadcast(false)
                        setFileSelected([])
                        setUserSelected([])
                    }, onFail: (err) => {
                        console.log(err)
                    }
                })




            } else {
                socketBroadcast.send(JSON.stringify(val))

                setLoading(false)
                setModalBroadcast(false)
                setUserSelected([])
            }
        }

    }

    return (
        <Fragment>
            {/* modal */}
            <ModalBase
                show={modalBroadcast}
                title="Pesan Siaran"
                center={true}
                setShow={(par) => { setModalBroadcast(par) }}
            >
                <FormGroup>
                    <Label>Apa yang terjadi</Label>
                    <Input type="textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Apa yang terjadi" />
                </FormGroup>

                <FormGroup>
                    <Label>Pilih Kontak</Label><br />
                    <Button.Ripple outline block className="d-flex justify-content-between" size="sm" onClick={() => { setModalSelectContact(true) }}>
                        <span >Pilih Kontak</span>
                        <span > <ChevronDown size={14} /></span>
                    </Button.Ripple>

                </FormGroup>

                {userSelected.length > 0 ? <div className="card-selected">
                    <p> Kontak </p>
                    {userSelected.map((u, index) => (
                        <div className="column">

                            <span>
                                <Avatar style={{ marginRight: "5px" }} onError={fallbackImage_} img={u.photo == "" ? `https://ui-avatars.com/api/?name=${u ? u.name : "UN"}&background=4e73df&color=fff&bold=true` : u.photo} imgHeight='40' imgWidth='40' />
                                {u.name}
                            </span>
                            <X size={20} onClick={() => SelectUser(u)} />
                        </div>

                    ))}
                </div> : null}

                {fileSelected.length > 0 ? <div className="card-selected">
                    <p>Media Pendukung</p>
                    {fileSelected.map((f, index) => (
                        <div className="column">

                            {f.name}
                            <X size={20} onClick={() => removeFile(f)} />
                        </div>

                    ))}
                </div> : null}

                <FormGroup className="d-flex justify-content-between">
                    <small>
                        Media Pendukung
                    </small>
                    <div>
                        <Label className='attachment-icon mb-0' for='attach-doc'>
                            <Image className='cursor-pointer text-secondary' size={20} />
                            <input type='file' id='attach-doc' onChange={(e) => selectFile(e)} hidden />
                        </Label>

                        <Label className='attachment-icon mb-0 ml-1' for='attach-doc'>
                            <File className='cursor-pointer text-secondary' size={20} />
                            <input type='file' id='attach-doc' hidden />
                        </Label>

                    </div>
                </FormGroup>

                <ModalFooter className="px-0">
                    <Button.Ripple color="primary" disabled={!userSelected.length || content == "" || loading} onClick={() => { onSubmit() }} block>
                        {loading ? <Spinner color="success" size="sm" /> : "Kirim"}
                    </Button.Ripple>
                </ModalFooter>

            </ModalBase>

            {/* modal select user */}
            <ModalBase show={modalSelectContact}
                title="Pilih Kontak"
                center={true}
                scrollable={true}
                footer={
                    <Button.Ripple color="primary" disabled={!userSelected.length} onClick={() => setModalSelectContact(false)} block>
                        Pilih Kontak
                    </Button.Ripple>
                }
                setShow={(par) => { setModalSelectContact(par) }}>

                <InputGroup className='input-group-merge mb-1'>
                    <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                            <Search size={14} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='Cari...' onChange={(e) => { setSeachTerm(e.target.value) }} />
                </InputGroup>

                <PerfectScrollbar style={{ maxHeight: "300px" }}>
                    {employees.length > 0 && employees.filter((e) => e.uuid != localStorage.getItem("uuid")).filter((val) => {
                        if (seachTerm == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(seachTerm.toLowerCase())) {
                            return val
                        }
                    }).map((item, index) => (
                        <Card key={index} color="secondary" outline className={classNames("card-user", {
                            active: userSelected.filter(u => u == item).length
                        })} onClick={() => { SelectUser(item) }}>
                            <CardBody className="py-1 d-flex justify-content-between">
                                <Media left>
                                    <Avatar onError={fallbackImage_} img={item.photo == "" ? `https://ui-avatars.com/api/?name=${item ? item.name : "UN"}&background=4e73df&color=fff&bold=true` : item.photo} imgHeight='40' imgWidth='40' />
                                    <span className="ml-1">{item.name}</span>
                                </Media>
                            </CardBody>
                        </Card>
                    ))}
                </PerfectScrollbar>


            </ModalBase>

            <BroadcastDetail show={modalDetailBroadcast} setShow={(par) => { setModalDetailBroadcast(par) }} />
            <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
                <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
                    <Radio size={21} />
                    {broadcastCount > 0 && (
                        <Badge pill color='primary' className='badge-up'>
                            {broadcastCount}
                        </Badge>
                    )}

                </DropdownToggle>

                <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>

                    <li className='dropdown-menu-header'>
                        <DropdownItem className='d-flex' tag='div' header>
                            <h4 className='notification-title mb-0 mr-auto'>Pesan Siaran</h4>
                            <Edit size={20} className="cursor-pointer" onClick={() => { setModalBroadcast(true) }} />
                        </DropdownItem>
                        <InputGroup className='input-group-merge mb-1'>
                            <InputGroupAddon addonType='prepend'>
                                <InputGroupText>
                                    <Search size={14} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder='Cari...' onChange={(e) => { setSeachTerm(e.target.value) }} />
                        </InputGroup>
                    </li>
                    {renderNotificationItems()}
                </DropdownMenu>
            </UncontrolledDropdown>
        </Fragment>
    )
}

export default BroadcastDropdown