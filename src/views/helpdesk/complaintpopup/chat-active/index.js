import "./index.scss";
import PerfectScrollBar from 'react-perfect-scrollbar'
// import IconHandlingStatus from "../iconHandlingStatus";
import { Fragment, useEffect, useRef, useState } from "react";
import ChatCard from "./chat-card";
import ReactDOM from 'react-dom'
import Viewer from "react-viewer";

const ChatActive = ({ data }) => {

  const [dataMessage, setDataMessage] = useState([])
  const [imageSelected, setImageSelected] = useState(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(messagesEndRef.current)
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER

  }

  useEffect(() => {
    setDataMessage(data?.messages)
    scrollToBottom()

  }, [data])

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

      <div className="chat-active" >

        <div className="chat-complaint" style={{ height: "350px" }} >
          <PerfectScrollBar style={{ maxHeight: "350px" }} ref={messagesEndRef}>

            <ChatCard
              messages={dataMessage}
              uuid={data?.uuid}
              scrollToBottom={scrollToBottom}
              setImageSelected={setImageSelected} />


          </PerfectScrollBar>

        </div>
      </div >
    </Fragment>
  )
}

export default ChatActive