import { useContext } from "react"
import { useRef } from "react"
import { Fragment, useState } from "react"
import { Edit2, Plus, Trash2 } from "react-feather"
import { Button, Col, FormGroup, Input, Row, Table, Label, CustomInput, ModalFooter } from "reactstrap"
import FormDelete from "../../components/widgets/form-delete/FormDelete"
import { ModalBase } from "../../components/widgets/modals-base"
import { PublicReportContext } from "../../context/PublicReportContext"
import PublicReportApi from "../../services/pages/public-report"
import BannerForm from './BannerForm'

const Banner = () => {

    const { banners, getBanner } = useContext(PublicReportContext)
    const [deleteBanner, setDeleteBanner] = useState(false)
    const [loadingBanner, setLoadingBanner] = useState(false)
    const [modalForm, setModalForm] = useState(false)
    const [bannerSelected,setBannerSelected] = useState(null)

    const onDelete = () => {
        setLoadingBanner(true)

        PublicReportApi.deleteBanner({
            id: bannerSelected.current.id,
            onSuccess: (res) => {
                getBanner()
                setDeleteBanner(false)
            },
            onFail: (err) => {
                console.log(err);
            }
        })

    }

    return (
        <Fragment>
            {/* Form Delete */}
            <FormDelete
                show={deleteBanner}
                title="Hapus Banner"
                setShow={(par) => { setDeleteBanner(par) }}
                description="Laporan Banner"
                loading={loadingBanner}
                onDelete={onDelete}
            />

            {/* Form */}
            <BannerForm show={modalForm} onClose={() => { setModalForm(!modalForm) }} data={bannerSelected} />

            <Button.Ripple size="sm" color="primary" onClick={() => { setBannerSelected(null); setModalForm(true) }}>
                <Plus size={12} />
            </Button.Ripple>

            <Table responsive className="mt-1">
                <thead>
                    <tr>
                        <th> No</th>
                        <th> Judul</th>
                        <th> Deskripsi</th>
                        <th style={{ width: "100px" }}> Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {banners && banners.map((data, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td> {data.title}</td>
                            <td>
                                {data.description}
                            </td>
                            <td>
                                <Edit2 size={15} className="mr-1 cursor-pointer" onClick={() => { setBannerSelected(data); setModalForm(true) }} />
                                <Trash2 size={15} className="cursor-pointer" onClick={() => { setBannerSelected(data); setDeleteBanner(true) }} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Fragment>
    )
}


export default Banner