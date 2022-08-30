import React, { Fragment, useContext, useState } from 'react'
import { X, BarChart2, MessageCircle, Share2 } from 'react-feather'
import { Button, Card, CardBody, CardTitle, Col, Form, Input, InputGroup, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import { FileManagerContext } from '../../../../context/FileManagerContext'
import Helper from '../../../../helpers'
import RowAvatarWidget from '../../rw-avatar'
import ShareOnFullScreen from './ShareOnFullscreen'
import PerfectScrollbar from 'react-perfect-scrollbar'
import DriveApi from '../../../../services/pages/drive'
import CustomToast from '../../custom-toast'



export const DetailFileComponent = ({ file, close }) => {

    const [active, setActive] = useState('1')
    const { fullScreen, dataSelected, setDataSelected, dataDetail,setDataDetail } = useContext(FileManagerContext)
    let userData = JSON.parse(localStorage.getItem("userData"))
    const [commentInput, setCommentInput] = useState(null)

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

    const comment = () => {
        DriveApi.comment({
            comment: commentInput,
            id: dataSelected.id,
            onSuccess: (res) => {
                CustomToast("success", "Komentar Berhasil Ditambahkan")
                getDetail()
                setCommentInput(null)
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    const ActiviesItems = (val, index) => {
        return (
            <Fragment>
                <Card key={`activity-file-${index}`} >
                    <CardBody className="py-0">
                        <div className="d-flex justify-content-start">
                            <RowAvatarWidget img={val.user.avatar} /> {Helper.actionTypeIndo(val.action_type)}
                            {val.user.name}
                            <br />
                            {Helper.dateIndo(val.action_time)}
                        </div>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }

    const CommentItems = (val, index) => {
        return (
            <Fragment>
                <Card key={`comment-file-${index}`} >
                    <CardBody className="py-0">
                        <div className="d-flex justify-content-start">
                            <RowAvatarWidget img={val.user.avatar} />
                            <div className='d-flex flex-column'>
                                <h5> {val.user.name} </h5>
                                {val.text}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }

    if (fullScreen && dataSelected != undefined) {

        const toggle = tab => {
            if (active !== tab) {
                setActive(tab)
            }
        }
        return (
            <Col md={5}>
                <Card>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            {dataSelected.name}
                            <Button.Ripple className="btn-icon" color="primary" onClick={() => { setDataSelected(undefined) }}>Tutup</Button.Ripple>
                        </div>
                        <small>{Helper.dateIndo(dataSelected.last_open)}</small>
                        <hr />
                        <Nav tabs justified>
                            <NavItem>
                                <NavLink
                                    active={active === '1'}
                                    onClick={() => {
                                        toggle('1')
                                    }}
                                >
                                    <BarChart2 /><br />Aktifitas
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={active === '2'}
                                    onClick={() => {
                                        toggle('2')
                                    }}
                                >
                                    <MessageCircle /> <br />Komentar
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={active === '3'}
                                    onClick={() => {
                                        toggle('3')
                                    }}><Share2 /><br /> Bagikan</NavLink>
                            </NavItem>
                        </Nav>
                        <hr />
                        <Fragment>
                            <TabContent className='py-50' activeTab={active}>
                                <TabPane tabId='1'>
                                    <PerfectScrollbar style={{ maxHeight: "450px" }}>
                                        {dataDetail && dataDetail.activities.map((val, index) => (
                                            ActiviesItems(val, index)
                                        ))}
                                    </PerfectScrollbar>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <div className="d-flex justify-content-start">
                                        <RowAvatarWidget img={userData["photo"]} />
                                        <div className='d-flex flex-column' style={{ width: "100%" }}>
                                            <h5 className='ml-1'> {userData["name"]} </h5>
                                            <InputGroup>
                                                <Input size="sm" name="comment" onChange={(e) => { setCommentInput(e.target.value) }} defaultValue={commentInput} />
                                                <Button className="ml-1" type="submit" color='primary' size="sm" disabled={!commentInput} onClick={() => { comment() }}>
                                                    Kirim
                                                </Button>
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <hr />
                                    {dataDetail && dataDetail.comments ? <PerfectScrollbar style={{ maxHeight: "260px" }}>
                                        {dataDetail && dataDetail.comments.map((val, index) => (
                                            CommentItems(val, index)
                                        ))}
                                    </PerfectScrollbar> : null}
                                </TabPane>
                                <TabPane tabId="3">
                                    <ShareOnFullScreen dataDetail={dataDetail} />
                                </TabPane>
                            </TabContent>
                        </Fragment>
                    </CardBody>
                </Card>
            </Col>
        )

    } else if (fullScreen && !dataSelected && dataSelected != undefined) {
        return (
            <Col md={5}>
                <Card>
                    <CardBody>
                        <div className="text-primary text-center">Data Tidak Ditemukan</div>
                    </CardBody>
                </Card>
            </Col>)
    } else {
        return null
    }
}

