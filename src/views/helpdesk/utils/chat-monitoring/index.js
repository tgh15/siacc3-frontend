import { CornerUpRight, File, Hash, Home, Image, List, Send } from "react-feather";
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Media } from "reactstrap";
import Avatar from "../../../../components/widgets/avatar"
import "./index.scss";
import PerfectScrollBar from 'react-perfect-scrollbar'
import IconHandlingStatus from "../iconHandlingStatus";
import { Fragment, useEffect, useRef, useState } from "react";
import ChatCard from "./chat-card";
import Helper from "../../../../helpers";
import { HelpdeskMessageApi } from "../../../../services/pages/helpdesk/message";
import ReactDOM from "react-dom";
import Viewer from "react-viewer";
import AutoTextArea from "../../../../components/widgets/autotextarea";



const ChatMonitoring = ({ data }) => {

  const [msg, setMsg] = useState('')
  const [dataMessage, setDataMessage] = useState([])
  const [imageSelected, setImageSelected] = useState(null)

  const { fallbackImage_ } = Helper

  const messagesEndRef = useRef(null)

  const createData = formData => {
    HelpdeskMessageApi.create(formData).then(
      (res) => {
        let datas = [];

        dataMessage.map((item, index) => {
          datas.push(item)
        })
        datas.push(res.data)

        setMsg('')
        setDataMessage(datas)
        setTimeout(() => {

          scrollToBottom()
        }, 500)
      }, err => {
        console.log(err)
      }
    )
  }

  const handleSendMsg = (e) => {
    e.preventDefault();

    let formData = {
      content: msg,
      chat_bot_id: parseInt(data?.id),
      sender_id: Helper.getUserData().uuid
    }

    createData(formData)

  }

  const selectFile = (e) => {
    let formData = new FormData();
    formData.append("files[]", e.target.files[0]);
    formData.append("chat_bot_id", data?.id);
    formData.append("sender_id", Helper.getUserData().uuid);

    createData(formData)
  }


  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(messagesEndRef.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER

  }

  useEffect(() => {
    setDataMessage(data?.messages)
    setTimeout(() => {

      scrollToBottom()
    }, 500)

  }, [])



  return (
    <Fragment>

      <Viewer
        visible={imageSelected}
        onClose={() => {
          setImageSelected(null)
        }}
        images={[{ src: imageSelected }]}
        container={document.getElementById("container")}
      />

      {/* content */}
      <div className="chat-active" >
        <div className="info-detail">
          <div className="d-flex justify-content-between">
            <Media>
              <Media left>
                <Avatar
                  onError={fallbackImage_}
                  img={data?.questioner?.photo}
                  className="mr-1"
                />
              </Media>
              <Media>
                <dl>
                  <dt className="font-weight-bolder">{data?.questioner?.name} - {data?.questioner?.workunit}</dt>
                </dl>
              </Media>
            </Media>
            <div>
              <IconHandlingStatus
                status={data?.status}
                className="mr-1"
                description={true}
              />
            </div>
          </div>


        </div>

        <div className="chat-complaint" style={{ height: "460px" }}>
          <PerfectScrollBar style={{ maxHeight: "460px" }} ref={messagesEndRef}>

            <ChatCard
              messages={dataMessage}
              setImageSelected={setImageSelected}
            />

          </PerfectScrollBar>

          <Form className='chat-app-form' onSubmit={(e) => { handleSendMsg(e) }}>
            <InputGroup className='input-group-merge mr-1 form-send-message'>
            <AutoTextArea
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value)
                }}
              />
              <InputGroupAddon addonType='append'>
                <InputGroupText>
                  <Label className='attachment-icon mb-0' for='attach-doc'>
                    <Image className='cursor-pointer text-secondary' size={20} />
                    <input type='file' id='attach-doc' hidden onChange={(e) => selectFile(e)} />
                  </Label>

                  <Label className='attachment-icon mb-0 ml-2' for='attach-doc'>
                    <File className='cursor-pointer text-secondary' size={20} />
                    <input type='file' id='attach-doc' hidden />
                  </Label>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <Button type="submit" color='primary' disabled={!msg.length} >
              <Send size={14} className='d-lg-none' />
              <span className='d-none d-lg-block'  >Kirim</span>
            </Button>
          </Form>
        </div>
      </div >
    </Fragment>
  )
}

export default ChatMonitoring