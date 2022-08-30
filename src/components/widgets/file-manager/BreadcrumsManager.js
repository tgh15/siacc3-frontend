import { Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap"
import { FileManagerContext } from "../../../context/FileManagerContext"
import ModalDeleteTag from "./ModalDeleteTag"



const BreadcrumsManager = () => {

    const { menuActive, dataBreadcums,getData,setDataBreadcums } = useContext(FileManagerContext)
    
    let cekMenu = menuActive.indexOf("tag");
    const itemBreadcums =  (data,i) => {
        if(i == dataBreadcums.length-1){
            return <div> {data.name}</div>
        }else{
            return <Fragment><Link onClick={() => {
                getData(data.url)
                setDataBreadcums(dataBreadcums.splice(0,i+1))
            }}>{data.name}</Link> </Fragment>
        }
    }

    return (
        <div className='d-flex justify-content-between mt-1'>
            <div className='justify-content-start breadcrumb-wrapper'>
                <Breadcrumb className='ms-1'>
                    {dataBreadcums.map((data, i) => (
                        <BreadcrumbItem key={i}>
                           {itemBreadcums(data,i)}
                        </BreadcrumbItem>
                    ))}


                </Breadcrumb>
            </div>
            {
                cekMenu != -1 && menuActive != "tag" && menuActive != "tag-add-tag" &&
                <ModalDeleteTag />
            }

        </div>
    )
}

export default BreadcrumsManager