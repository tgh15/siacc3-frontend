import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Clipboard, MoreHorizontal, Settings, Share } from 'react-feather'
import { Button, FormGroup, Row, Col } from 'reactstrap'
import { ModalChild, ModalAccess } from '../ModalShare'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import DriveApi from '../../../../services/pages/drive'
import { FileManagerContext } from '../../../../context/FileManagerContext'
import CustomToast from '../../custom-toast'
import CardFooter from 'reactstrap/lib/CardFooter'
import Helper from '../../../../helpers'



const ShareOnFullScreen = (props) => {

    const [show, setShow] = useState(false)

    const toggle = () => {
        setShow(!show)
    }
    const [modalChildShow, setModalChildShow] = useState(false)

    const [showModalAction, setShowModalAction] = useState(false)

    const toggleModalChild = () => { setModalChildShow(!modalChildShow) }
    const toggleModalAction = () => { setShowModalAction(!showModalAction) }

    const { dataSelected, apiActive, getData, setDataDetail } = useContext(FileManagerContext)

    const [userShare, setUserShare] = useState([])
    const [editedAccess, setEditedAccess] = useState(0)
    const [users, setUsers] = useState([])

    const editedTable = (param, index) => {
        userShare[index] = { ...userShare[index], ...param }
        setUserShare(userShare)
    }


    const onCopyClipboard = () => {
        navigator.clipboard.writeText(props.dataDetail && props.dataDetail.shared ? props.dataDetail.shared[0].url : null);
        CustomToast("success", "Link berhasil di copy ke clipboard")
    }

    const getUsers = () => {
        DriveApi.user({
            onSuccess: (res) => {
                setUsers(res)
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    const getDetail = () => {
        DriveApi.get({
            path: "?detail=" + dataSelected.id,
            onSuccess: (res) => {
                setDataDetail(res)
            }, onFail: (err) => {
                CustomToast("danger", err)
            }
        })
    }

    const onDeleteShare = () => {
        DriveApi.shareDelete({
            id: props.dataDetail.shared[0].id,
            onSuccess: (res) => {
                getDetail()
                getData(apiActive)
                CustomToast("success", "Share File Berhasil dihapus")

            }, onFail: (err) => {
                console.log(err)
            }
        })
    }

    const onSubmit = () => {
        let request = {};
        request["owner_id"] = localStorage.getItem("uuid")
        request["object_id"] = dataSelected.id
        request["recipients"] = userShare
        request["is_private"] = true
        request["role"] = 1
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

    // use Effect
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Fragment>
            <ModalChild show={show} setShow={toggle} />
            <ModalAccess show={showModalAction} setShow={setShowModalAction} setAccess={(param) => {
                editedTable(param, editedAccess)
                setShowModalAction(false)
            }} />

            <ModalChild show={modalChildShow} setShow={toggleModalChild} />
            <FormGroup>
                <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    options={users}
                    isClearable={false}
                    placeholder="Pilih User..."
                    isMulti
                    onChange={(e) => {
                        let tb = e.map(evalue => {
                            return {
                                name: evalue.label,
                                user_uuid: evalue.value,
                                role: 1
                            }
                        })
                        setUserShare(tb)
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Button block color="primary" size="sm" disabled={props.dataDetail && props.dataDetail.shared ? false : true} onClick={onCopyClipboard}><Clipboard size={16} /> Salin Tautan</Button>
            </FormGroup>
            <FormGroup>
                <Button block color="primary" size="sm" onClick={() => { toggleModalChild() }}> Pengaturan Tautan</Button>
            </FormGroup>
            <FormGroup>
                {userShare.map((v, key) => {
                    return (
                        <Row key={`tuyyj01922-${key}`} style={{ marginTop: "1em", marginBottom: "1em" }}>
                            <Col>{v.name}</Col>
                            <Col>{Helper.accessRole(v.role)}</Col>
                            <Col className="text-right">
                                <Button color="" size="sm" onClick={() => {
                                    toggleModalAction()
                                    setEditedAccess(key)
                                }}>
                                    <MoreHorizontal />
                                </Button>
                            </Col>
                        </Row>
                    )
                })}
            </FormGroup>

            <CardFooter className=" d-flex justify-content-between py-1 px-0">
                {props.dataDetail && props.dataDetail.shared ? <Button.Ripple color="danger" outline onClick={onDeleteShare}>
                    Hapus
                </Button.Ripple> : <div></div>}

                {props.dataDetail && userShare.length ? <Button.Ripple color="primary" onClick={() => { onSubmit() }}>
                    Submit
                </Button.Ripple> : null}
            </CardFooter>

        </Fragment>
    )
}


export default ShareOnFullScreen