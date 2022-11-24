import React, { useContext, useState } from 'react'

import { Clipboard, MoreHorizontal, Trash } from "react-feather"
import Select from 'react-select'
import { Button, FormGroup, Input, Row, Col, CustomInput, Label } from 'reactstrap'
import { ModalBase } from '../modals-base'

import { selectThemeColors } from '@utils'
import ModalFooter from 'reactstrap/lib/ModalFooter'
import { FileManagerContext } from '../../../context/FileManagerContext'
import Helper from '../../../helpers'
import DriveApi from '../../../services/pages/drive'
import CustomToast from '../custom-toast'

export const ModalChild = ({ show, setShow, request, setRequest }) => {
    const [limitOpen, setLimitOpen] = useState(request ? request["is_limit"] : null)
    const [expired, setExpired] = useState(request ? request["is_password"] : null)
    const [password, setPassword] = useState(request ? request["is_expire"] : null)
    const [limitInput, setLimitInput] = useState(request ? request["limit"] : null)
    const [passwordInput, setPasswordInput] = useState(request ? request["password"] : null)
    const [expireInput, setExpireInput] = useState(request ? request["expire"] : null)

    const onSubmit = () => {
        request["is_limit"] = limitOpen;
        request["limit"] = parseInt(limitInput);
        request["is_password"] = password;
        request["password"] = passwordInput;
        request["is_expire"] = expired;
        request["expire"] = new Date() + expireInput
        setRequest(request)
        setShow(!show)
    }

    return (
        <ModalBase title="Pengaturan Tautan" show={show} setShow={setShow}>
            <FormGroup>
                <Row>
                    <Col md={3} sm={3}>
                        <CustomInput
                            type="switch"
                            id="pembatasanPembukaan"
                            inline
                            onChange={(e) => {
                                const isChecked = e.target.checked
                                if (!isChecked) {
                                    setLimitOpen(false)
                                } else {
                                    setLimitOpen(true)
                                }
                            }}
                            checked={limitOpen}
                        />
                    </Col>
                    <Col>
                        {!limitOpen ? <strong>Pembatasan Pembukaan Berkas di nonaktifkan</strong> : (
                            <Row>
                                <Col>
                                    <Label>Batasi Buka Berkas :</Label></Col>
                                <Col>
                                    <Input type="number" onChange={(e) => { setLimitInput(e.target.value) }} defaultValue={limitInput} />
                                </Col>
                                <Col>Kali</Col>

                            </Row>
                        )}
                        <p>Batas pengguna mengkases berkas dengan tautan</p>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col md={3} sm={3}>
                        <CustomInput
                            type="switch"
                            id="tanggalKadaluarsa"
                            inline
                            onChange={(e) => {
                                const isChecked = e.target.checked
                                if (!isChecked) {
                                    setExpired(false)
                                } else {
                                    setExpired(true)
                                }
                            }}
                            checked={expired}
                        />
                    </Col>
                    <Col>
                        {!expired ? <strong>Tanggal kadaluarsa dinonaktifkan</strong> : (
                            <Row>
                                <Col><Label>Kadaluarsa:</Label></Col>
                                <Col>
                                    <Input type="number" onChange={(e) => { setExpireInput(e.target.value) }} defaultValue={expireInput} />
                                </Col>
                                <Col>Hari</Col>

                            </Row>
                        )}
                        <p>Akses berkas dihapus pada tanggal tertentu</p>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col md={3} sm={3}>
                        <CustomInput
                            type="switch"
                            id="kataSandi"
                            inline
                            onChange={(e) => {
                                const isChecked = e.target.checked
                                if (!isChecked) {
                                    setPassword(false)
                                } else {
                                    setPassword(true)
                                }
                            }}
                            checked={password}
                        />
                    </Col>
                    <Col>
                        {!password ? <strong>Kata sandi dinonaktifkan</strong> : (
                            <Row>
                                <Col ><Label>Atur Ulang Password:</Label></Col>
                                <Col>
                                    <Input type="password" onChange={(e) => { setPasswordInput(e.target.value) }} defaultValue={passwordInput} />
                                </Col>
                                <Col></Col>

                            </Row>
                        )}
                        <p>Lindungi tautan dengan kata sandi unik</p>
                    </Col>
                </Row>
            </FormGroup>
            <ModalFooter className="justify-content-between px-0">
                <Button outline color="primary" onClick={setShow}>Batal</Button>&nbsp;
                <Button color="primary" onClick={onSubmit}>Simpan</Button>
            </ModalFooter>
        </ModalBase >
    )
}


export const ModalAccess = ({ show, setShow, setAccess, userShareSelected, removeUserShare }) => {
    return (
        <ModalBase title="Pilih Hak Akses" show={show} setShow={setShow}>
            <FormGroup>
                Hak Akses
                <CustomInput
                    id="hak-akses-a"
                    name="akses"
                    type="radio"
                    className="mt-1"
                    label="Hanya Membaca"
                    onChange={(e) => {
                        setAccess({ role: 1 })
                    }}
                    checked={(userShareSelected && userShareSelected.role == 1 ? true : false)}
                />
                <CustomInput
                    id="hak-akses-b"
                    name="akses"
                    type="radio"
                    label="Perbolehkan Unggah dan Ubah Berkas"
                    className="mt-1"
                    onChange={() => {
                        setAccess({ role: 2 })
                    }}
                    checked={(userShareSelected && userShareSelected.role == 2 ? true : false)}
                />
                <CustomInput
                    id="hak-akses-c"
                    name="akses"
                    type="radio"
                    className="mt-1"
                    label="Hanya Bisa Unggah Berkas"
                    onChange={() => {
                        setAccess({ role: 3 })
                    }}
                    checked={(userShareSelected && userShareSelected.role == 3 ? true : false)}
                />
            </FormGroup>
            <ModalFooter className="justify-content-start px-0">

                <Button size="sm" color="primary"
                    onClick={() => { removeUserShare(userShareSelected); }}
                >
                    <Trash size={14} />&nbsp;Hapus Akses
                </Button>
            </ModalFooter>
        </ModalBase>
    )
}

const ModalShare = ({ isShow, setShow }) => {
    const [modalChildShow, setModalChildShow] = useState(false)

    const [showModalAction, setShowModalAction] = useState(false)
    const [userShareSelected, setUserShareSelected] = useState(null)

    const toggleModalChild = () => { setModalChildShow(!modalChildShow) }
    const toggleModalAction = () => { setShowModalAction(!showModalAction) }


    const [userShare, setUserShare] = useState([])
    const [editedAccess, setEditedAccess] = useState(0)

    const editedTable = (param, index) => {
        userShare[index] = { ...userShare[index], ...param }
        setUserShare(userShare)
    }

    const removeUserShare = (selected) => {
        let remove = userShare.filter((data, i) => data.user_uuid != selected.user_uuid)
        setUserShare(remove)
        toggleModalAction()
    }

    const { users, dataSelected, getData, apiActive, shareSelected } = useContext(FileManagerContext)

    const [request, setRequest] = useState({
        owner_id: localStorage.getItem("uuid"),
        is_limit: false,
        limit: 0,
        is_private :true,
        role : 1,
        is_password: false,
        password: null,
        is_expire: false,
        expire: null,
        is_private: true,
    })

    const onSubmit = () => {
        request["object_id"] = dataSelected.id
        request["recipients"] = userShare
        DriveApi.share({
            data: request,
            onSuccess: (res) => {
                CustomToast("success", "Berkas Berhasil Di Bagikan")
                getData(apiActive)
                setShow(false)
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    const onDeleteShare = () => {

        DriveApi.shareDelete({
            id : shareSelected.id,
            onSuccess : (res) => {
                getData(apiActive)
                CustomToast("success","Share File Berhasil dihapus")
                setShow(false)
            },onFail : (err) => {
                console.log(err)
            }
        })
    }

    const onCopyClipboard = () => {
        navigator.clipboard.writeText(shareSelected.url);
        CustomToast("success","Link berhasil di copy ke clipboard")
    }
    return (
        <ModalBase title="Bagikan Berkas" show={isShow} setShow={setShow}>
            {/* Modal Accesss */}
            <ModalAccess
                userShareSelected={userShareSelected}
                show={showModalAction}
                setShow={setShowModalAction}
                setAccess={(param) => {
                    editedTable(param, editedAccess)
                    setShowModalAction(false)
                }}
                removeUserShare={(data) => {
                    removeUserShare(data)
                }} />

            <ModalChild 
                show        = {modalChildShow} 
                setShow     = {toggleModalChild} 
                request     = {request} 
                setRequest  = {(par => { setRequest(par) })} 
            />

            <FormGroup>
                <Select
                    theme           = {selectThemeColors}
                    isMulti
                    options         = {users}
                    className       = 'react-select'
                    placeholder     = "Pilih User"
                    isClearable     = {false}
                    classNamePrefix = 'select'
                    onChange        = {(e) => {
                        let tb = e.map(evalue => {
                            return {
                                name        : evalue.label,
                                user_uuid   : evalue.value,
                                role        : 1
                            }
                        })
                        setUserShare(tb)
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Button 
                    block 
                    color="primary" 
                    size="sm" 
                    disabled={shareSelected ? false : true} 
                    onClick={onCopyClipboard}>
                        <Clipboard size={16} /> Salin Tautan
                </Button>
            </FormGroup>
            <FormGroup>
                <Button block color="primary" onClick={() => {
                    toggleModalChild()
                }}>Pengaturan Tautan</Button>
            </FormGroup>
            <FormGroup>
                {userShare.map((v, key) => {
                    return (
                        <Row key={`tuyyj01922-${key}`} style={{ marginTop: "1em", marginBottom: "1em" }}>
                            <Col>{v.name}</Col>
                            <Col>{Helper.accessRole(v.role)}</Col>
                            <Col className="text-right">
                                <Button color="" size={"sm"} onClick={() => {
                                    toggleModalAction()
                                    setEditedAccess(key)
                                    setUserShareSelected(v)
                                }}>
                                    <MoreHorizontal />
                                </Button>
                            </Col>
                        </Row>
                    )
                })}
            </FormGroup>
            <ModalFooter className="d-flex justify-content-between px-0">
                <Button outline color="primary" onClick={setShow}>Batal</Button>
                {shareSelected ? <Button color="danger" onClick={onDeleteShare} outline>
                    Hapus
                </Button> : null}
                <Button color="primary" onClick={() => { onSubmit() }} disabled={userShare.length > 0 ? false : true}>Simpan</Button>
            </ModalFooter>
        </ModalBase>
    )
}

export default ModalShare


