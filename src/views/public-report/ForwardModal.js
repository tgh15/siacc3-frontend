import { Fragment, useContext, useState } from "react"
import { Search } from "react-feather"
import { Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, Media } from "reactstrap"
import { ModalBase } from "../../components/widgets/modals-base"
import { PublicReportContext } from "../../context/PublicReportContext"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Avatar from "../../components/widgets/avatar"
import ModalFooter from "reactstrap/lib/ModalFooter"
import PublicReportApi from "../../services/pages/public-report"
import CustomToast from "../../components/widgets/custom-toast"

const ForwardModal = ({ show, onClose }) => {
    const { leaders,dataSelected } = useContext(PublicReportContext)
    const [searchLeaders, setSearchLeaders] = useState("")
    const [leaderSelected, setLeaderSelected] = useState([])

    const selectLeader = uuid => {
        if(leaderSelected.indexOf(uuid) != -1){
            setLeaderSelected(leaderSelected.filter(opt => opt != uuid));
        }else{
            setLeaderSelected([...leaderSelected,uuid]);
        } 
    }

    const onForward = () => {

        let leaders = [];
        leaderSelected.map((data,i) => (
            leaders.push({"uuid":data})
        ))
        let datas = {
            id : dataSelected.id,
            leaders : leaders
        }


        PublicReportApi.forward({
            datas : datas,
            onSuccess : (res) => {
                CustomToast("success","Berita Berhasil diteruskan")
                onClose()
            },onFail : (err) => {
                console.log(err)
            }
        })
    }

    return (
        <ModalBase title="Pilih Pimpinan" show={show} setShow={onClose}>
            <InputGroup className='input-group-merge mb-1'>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <Search size={14} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder='Cari...' onChange={(e) => { setSearchLeaders(e.target.value) }} />
            </InputGroup>

            <PerfectScrollbar style={{ maxHeight: "300px" }}>
                <ListGroup>
                    {leaders.filter((val) => {
                        if (searchLeaders == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchLeaders.toLowerCase())) {
                            return val
                        }
                    }).map((data, i) => (


                        <ListGroupItem className="cursor-pointer" onClick={() => { selectLeader(data.uuid) }} active={leaderSelected.indexOf(data.uuid) != -1 ? "true" : "" }>
                            <Media>
                                <Media left href='#'>
                                    <Avatar img={data.photo == "" ? `https://ui-avatars.com/api/?name=${data ? data.name : "UN"}&background=4e73df&color=fff&bold=true` : data.photo} imgHeight='40' imgWidth='40' />
                                </Media>

                                <Media body>
                                    <Media header className="mb-0 ml-1">{data.name}</Media>
                                    <h6 className="text-muted ml-1 mt-0">{data.position} </h6>
                                </Media>
                            </Media>

                        </ListGroupItem>
                    ))}
                </ListGroup>
            </PerfectScrollbar>

            <ModalFooter className="justify-content-center  cursor-pointer mt-2 text-primary" style={{ fontWeight:"bold" }} onClick={onForward}>
                Selesai dan Bagikan Berita
            </ModalFooter>
        </ModalBase>
    )
}

export default ForwardModal