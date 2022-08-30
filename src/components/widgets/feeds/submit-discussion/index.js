import React, { useContext, useState }          from 'react'
import { 
    ListGroup, 
    ListGroupItem, 
    Media, 
    Input, 
    InputGroup, 
    InputGroupAddon, 
    InputGroupText, 
    Button 
}                                               from 'reactstrap'
import PerfectScrollbar                         from "react-perfect-scrollbar"
import { Search }                               from "react-feather"


//Widget
import Avatar                                   from "../../avatar"
import ModalFooter                              from "reactstrap/lib/ModalFooter"
import { ModalBase}                             from "../../modals-base"
import CustomTableBodyEmpty                     from "../../custom-table/CustomTableBody"

//Context
import { ChatContext }                          from '../../../../context/ChatContext'

//Helper
import Helper                                   from '../../../../helpers'

const SubmitDiscussion = (props) => {

    const {discussion, toggleDiscussion} = props;

    const [search, setSearch]                           = useState("");
    const {fallbackImage_}                              = Helper;
    const {
        room, 
        sendMessage,
        roomSelected, 
        setRoomSelected, 
        connectChatSocket, 
    }    = useContext(ChatContext);

    const onSelect = (item) => {
        setRoomSelected(item);

        connectChatSocket(item.id);
    };

    const sendDisscussion = () => {
        if("type" in props){
            sendMessage(props.dataNews.toString(),[],props.type);
            toggleDiscussion();
        }else{
            sendMessage(props.dataNews.toString(),[],"public_report");
            toggleDiscussion();
        }
    };

    const renderChoice = () => {
        return (
            <PerfectScrollbar style={{ maxHeight: "300px" }}>
                <ListGroup>
                    {
                        room != null ? room.filter((val) => {
                            if (search == "") {
                                return val
                            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                                return val
                            }
                        }).map((item, index) => {
                            return (
                                <ListGroupItem key={index} className="cursor-pointer" onClick={() => { onSelect(item) }} active={roomSelected != null ? roomSelected.id == item.id ? true : false : false}>
                                    <Media>
                                        <Media left href='#'>
                                            <Avatar onError={fallbackImage_} img={item.avatar == "" ? `https://ui-avatars.com/api/?name=${item ? item.name : "UN"}&background=4e73df&color=fff&bold=true` : item.photo} imgHeight='40' imgWidth='40' />
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
                    }
                </ListGroup>
            </PerfectScrollbar>
        )
    }
    

    return(
        <ModalBase title="Ajukan Pembahasan" show={discussion} setShow={toggleDiscussion}>
            <InputGroup className='input-group-merge mb-1'>
                <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                        <Search size={14} />
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder='Cari...' onChange={(e) => { setSearch(e.target.value) }} />
            </InputGroup>
            {renderChoice()}
            <ModalFooter>
                <Button color="primary" block onClick={() => {sendDisscussion()}}  >
                    Selesai
                </Button>
            </ModalFooter>
        </ModalBase>
    )
}

export default SubmitDiscussion