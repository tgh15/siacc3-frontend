import { Fragment, useContext } from "react"
import { ChevronUp } from "react-feather"
import { useLocation, useRouteMatch } from "react-router-dom"
import { Button } from "reactstrap"
import { ChatContext } from "../../../../context/ChatContext"
import ChatPopup from "../chat-popup"
import ChatRoomPopup from "../chat-room-popup"


const ButtonPopupChat = () => {
    let location = useLocation();

    const { setChatRoomPopup, setChatPopup } = useContext(ChatContext)
    
    return (
        <Fragment>
            {location.pathname != "/chats" ? <Button.Ripple
                color="primary"
                onClick={() => { setChatRoomPopup(true) }}
                style={{ position: "fixed", bottom: '-0.5%', right: "5%", width: "15em" }}
                className="d-flex justify-content-between">
                <span style={{ marginTop: "auto", marginBottom: "auto" }}> Percakapan </span>
                <ChevronUp />
            </Button.Ripple>
                : null}
            <ChatRoomPopup />
            <ChatPopup />

        </Fragment>
    )
}

export default ButtonPopupChat