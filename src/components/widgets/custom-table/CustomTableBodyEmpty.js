import ImageRounded from "../image-rounded"
import ImgDataEmpty from "../../../assets/images/pages/emptydata.png"
import { Card, CardBody } from "reactstrap"

const CustomTableBodyEmpty = () => {
    return (
        <Card>
            <CardBody className="d-flex justify-content-center py-1">
                <div className="d-block ">
                    <div className="px-3">
                        <ImageRounded src={ImgDataEmpty} width={80}  />
                    </div>
                    <h4 className="mt-1"> Data tidak ditemukan. </h4>
                </div>
            </CardBody>
        </Card>
    )
}

export default CustomTableBodyEmpty