import { Bookmark } from "react-feather";
import { Col, Media, Row } from "reactstrap";
import Avatar from "../../components/widgets/avatar";

import Helper from "../../helpers";


const ChatItem = (props) => {


    const {pinned}   = props;

    const {fallbackImage_} = Helper;

    return (
        <>
            <div style={{borderRadius: '10px'}} className="w-100 p-1">
                <Row>
                    <Col md={1}>
                        <Avatar 
                            img         = {`https://ui-avatars.com/api/?name=Masrudin&background=4e73df&color=fff&bold=true`} 
                            onError     = {fallbackImage_} 
                            imgWidth    = '40' 
                            imgHeight   = '40' 
                        />
                    </Col>
                    <Col md={8}>
                        <p className="mb-0 ml-1 card-title">Masrudin - Kejati Sulsel</p>
                        <p className="mb-0 ml-1">Halo</p>
                    </Col>
                    <Col md={3} className="text-center">
                        { pinned && <Bookmark/> }
                        <p>21.38</p>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ChatItem;

