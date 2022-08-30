import { Fragment, useContext, useState } from "react"
import { Button, Input, ModalFooter } from "reactstrap"
import CustomToast from "../../components/widgets/custom-toast"
import { PerformanceContext } from "../../context/PerformanceContext"
import PerformanceApi from "../../services/pages/performance"
import { GetAgentDetail } from "../../services/pages/performance/GetAgentDetail"
import { GetWorkunitDetail } from "../../services/pages/performance/GetWorkunitDetail"


const FormDeduction = props => {

    const {setModalLessPoint} = props
    const { dataDetail,active,getAgentDetail,getWorkunitDetail } = useContext(PerformanceContext)

    // state 
    const [points,setPoints] = useState(null)

    // onSubmit
    const onSubmit = () => {
        setModalLessPoint(false)

        if(active == "agent"){
            let datas = {
                uuid : dataDetail.uuid,
                points : parseInt(points)
            }
            
            PerformanceApi.agentPointsDeduction({
                datas : datas,
                onSuccess : (res) => {
                    
                    getAgentDetail(dataDetail.uuid)
                    CustomToast("success","Pengurangan Point Berhasil")
                },
                onFail : (err) => {
                    console.log(err)
                }
            });

        }else{
            let datas = {
                workunit_id : dataDetail.id,
                points : parseInt(points)
            }

            PerformanceApi.workunitPointsDeduction({
                datas : datas,
                onSuccess : (res) => {
                    getWorkunitDetail(dataDetail.id)
                    CustomToast("success","Pengurangan Point Berhasil")
                },
                onFail : (err) => {
                    console.log(err)
                }
            });
        }
    }

    return (
        <Fragment>
            <p>Total point yang didapat saat ini adalah <span className="font-weight-bolder">{dataDetail.performance.points_total} Point</span></p>
            <Input type="number" placeholder="Kurangi Point" className="mb-1" onChange={(e) =>{setPoints(e.target.value)} }></Input>
            <ModalFooter className="mt-2 px-0">
                <Button.Ripple color="primary" disabled={!points} block onClick={onSubmit}>
                    Kirim
                </Button.Ripple>
            </ModalFooter>
        </Fragment>
    )
}

export default FormDeduction