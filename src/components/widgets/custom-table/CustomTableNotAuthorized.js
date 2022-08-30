import ImageRounded from "../image-rounded"
import ImgDataEmpty from "../../../assets/images/pages/emptydata.png"
import { Card, CardBody } from "reactstrap"

const CustomTableNotAuthorized = () => {
    return (
        <Card>
            <CardBody className="d-flex justify-content-center">
                <div className="d-block">
                    <div className="text-center">
                        <ImageRounded src={ImgDataEmpty} width={80}/>
                    </div>
                    <h4 className="mt-1"> Anda Tidak memiliki akses halaman ini. </h4>
                </div>
            </CardBody>
        </Card>
    )
}

export default CustomTableNotAuthorized;