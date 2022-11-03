import { 
    Col, 
    Row,
    Card, 
    Badge, 
    Media, 
    CardBody, 
    CardFooter, 
    CardHeader, 
}                       from "reactstrap";
import Avatar           from "../../components/widgets/avatar";
import Helper           from "../../helpers";

const VideoPlayer = (props) => {

    const {
        data,
        live,
        detail
    }                       = props;

    const { fallbackImage_} = Helper;
    return (
        <>
            {
                data &&
                <Card className="mb-0">
                    <CardHeader className="p-1">
                        <a href={`/video-streaming/${data.id}`}>

                            <h4 className="card-title my-1">{data.title}</h4>
                        </a>
                        {
                            live &&
                            <Badge color='danger'>
                                Live
                            </Badge>
                        }
                    </CardHeader>
                    <CardBody className="text-center pb-1 px-1 pt-0">
                        <video 
                            style           = {detail ? {borderRadius: '10px', width: '70%'} : {borderRadius: '10px', width: '80%'}}
                            poster          = "https://media.giphy.com/media/PjIKNsWUOhwL6/giphy.gif"
                            autoPlay 
                            controls 
                            className       = 'img-fluid img-video'
                        />
                    </CardBody>
                    <CardFooter className={detail ? "px-1 pt-1 pb-0" : "p-1"}>
                        <Row >
                            <Col 
                                md          = {7}
                                className   = "d-flex align-items-center"
                            >
                                <div>
                                    <Media>
                                        <Media left href='#'>
                                            <Avatar 
                                                img         = {`https://ui-avatars.com/api/?name=UN&background=4e73df&color=fff&bold=true`} 
                                                onError     = {fallbackImage_} 
                                                imgWidth    = '40' 
                                                imgHeight   = '40' 
                                            />
                                        </Media>
                                        <Media body>
                                            <Media className="mb-0 ml-1 text-capitalize">{data.owner.name}</Media>
                                            <h6 className="text-muted ml-1 mt-0">{data.owner.origin}</h6>
                                        </Media>
                                    </Media>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="d-flex align-items-center justify-content-end">
                                    <h6 className="card-title mt-1">
                                        {data.viewer_count} Penonton
                                    </h6>
                                </div>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            }
        </>
    )

};

export default VideoPlayer;