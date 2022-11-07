import { Bookmark } from "react-feather";
import { Col, Row } from "reactstrap";
import Avatar       from "../../components/widgets/avatar";
import Helper       from "../../helpers";

const ChatItem = (props) => {

    const {
        data,
        pinned
    }                      = props;

    const {fallbackImage_} = Helper;

    return (
        <>
            {
                data &&
                <div style={{borderRadius: '10px'}} className="w-100 p-1">
                    <Row>
                        <Col md={1} className="d-flex align-items-center">
                            <Avatar 
                                img         = {`https://ui-avatars.com/api/?name=Masrudin&background=4e73df&color=fff&bold=true`} 
                                onError     = {fallbackImage_} 
                                imgWidth    = '40' 
                                imgHeight   = '40' 
                            />
                        </Col>
                        <Col md={8}>
                            <p className="mb-0 ml-2">{data.user.name} - {data.user.origin}</p>
                            <p className="mb-0 ml-2">{data.message}</p>
                        </Col>
                        <Col md={3} className="text-center">
                            { pinned && <Bookmark/> }
                            <p>21.00</p>
                        </Col>
                    </Row>
                </div>
            }
        </>
    )
}

export default ChatItem;

