import { Fragment, useState, useContext }           from "react"
import { Archive, MoreVertical, Users, XCircle }    from "react-feather"
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import ModalFooter                                  from "reactstrap/lib/ModalFooter"
import CustomTableBodyEmpty                         from "../../components/widgets/custom-table/CustomTableBodyEmpty"
import { ModalBase }                                from "../../components/widgets/modals-base"
import { PublicReportContext }                      from "../../context/PublicReportContext"
import Helper                                       from "../../helpers"
import Detail                                       from "./Detail"
import Skeleton                                     from "react-loading-skeleton";
import CustomTableBody                              from "../../components/widgets/custom-table/CustomTableBody"
import FormDelete                                   from "../../components/widgets/form-delete/FormDelete"
import PublicReportApi                              from "../../services/pages/public-report"
import CustomToast                                  from "../../components/widgets/custom-toast"
import ForwardModal                                 from "./ForwardModal"

const CardReportCommunity = () => {

    // states
    const [loading,setLoading]                  = useState(false)
    const [modalDetail, setModalDetail]         = useState(false)
    const [modalForward, setModalForward]       = useState(false)
    const [showFormDelete, setShowFormDelete]   = useState(false)

    // context
    const { listData,setDataSelected,dataSelected,getData } = useContext(PublicReportContext)

    const { getRoleByMenuStatus }               = Helper;

    const onDelete = () => {
        setLoading(true);
        PublicReportApi.delete({
            id : dataSelected.id,
            onSuccess : (res) => {
                setLoading(false)
                setShowFormDelete(false)
                getData()
                CustomToast("success","Data Berhasil Dihapus")
            },
            onFail : (err) => {
                console.log(err)
            }
        })
    }

    return (
        <Fragment>
            <FormDelete
                show={showFormDelete}
                title = "Hapus Laporan Masyarakat"
                setShow={(par) => {setShowFormDelete(par)}}
                description="Laporan Masyarakat"
                loading={loading}
                onDelete={onDelete}
            />

             {/* modal forward */}
            <ForwardModal show={modalForward} onClose={() => {setModalForward(!modalForward)}} />

            <ModalBase
                show={modalDetail}
                size="lg"
                title="Detail Laporan Masyarakat"
                setShow={(par) => { setModalDetail(par) }}
                >
                <Detail />
                <ModalFooter className="d-flex justify-content-between px-0">
                    {
                        getRoleByMenuStatus('Laporan Masyarakat', 'delete') ? 
                            <Button.Ripple color="primary" size="sm" outline onClick={ () => {setModalDetail(false);setShowFormDelete(!showFormDelete) }}>
                                Hapus
                            </Button.Ripple>
                        :
                            null
                    }
                    {
                        getRoleByMenuStatus('Laporan Masyarakat', 'submit_a_discussion') ? 
                            <Button.Ripple color="primary" size="sm">
                                Ajukan Pembahasan
                            </Button.Ripple>
                        :
                            null
                        
                    }
                    {
                        getRoleByMenuStatus('Laporan Masyarakat', 'forward_to_leader') ? 
                            <Button.Ripple color="primary" size="sm" >
                                Teruskan Kepimpinan
                            </Button.Ripple>
                        :
                            null
                    }
                </ModalFooter>
            </ModalBase>

            {listData && listData != null &&
                listData.map((data, i) => (
                    
                    <CustomTableBody key={i}>
                        <Col md="1">
                            {/* <CustomInput
                            type='checkbox'
                            className='custom-control-primary'
                            id='secondary'
                            inline
                        /> */}
                        </Col>
                        <Col md="2" className="cursor-pointer" onClick={() => { setDataSelected(data); setModalDetail(true) }}>
                            {data.reporter_name} <br />
                            {data.reporter_phone}
                        </Col>
                        <Col md="5" className="cursor-pointer" onClick={() => { setDataSelected(data); setModalDetail(true) }}>
                            {data.content}
                        </Col>
                        <Col md="3" className="cursor-pointer" onClick={() => {  setDataSelected(data); setModalDetail(true) }}>
                            {Helper.dateIndo(data.created_at)}<br />
                            {data.address}
                        </Col>
                        <Col md="1">
                            <UncontrolledDropdown direction='left'>
                                <DropdownToggle tag='div' onClick={e => e.preventDefault()} className="cursor-pointer">
                                    <MoreVertical />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem  tag='a' >
                                        <Users size={14} className="mr-1" /> Ajukan Pembahasan
                                    </DropdownItem>
                                    <DropdownItem tag='a' onClick={() => {setDataSelected(data); setModalForward(!modalForward)}} >
                                        <Archive size={14} className="mr-1" /> Teruskan Kepimpinan
                                    </DropdownItem>
                                    <DropdownItem tag='a'  onClick={() => {setDataSelected(data); setShowFormDelete(!showFormDelete)}}>
                                        <XCircle size={14} className="mr-1" /> Hapus
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Col>
                    </CustomTableBody>
                ))
            }

            {!listData && listData != null && <Skeleton height={60} count={3} style={{ marginBottom: "10px" }} />}
            {!listData && listData == null && <CustomTableBodyEmpty />}

        </Fragment>
    )
}

export default CardReportCommunity