import { Fragment } from "react"
import { Button, Spinner } from "reactstrap"
import { ModalBase } from "../modals-base"

const Footer = ({ onCancel, onDelete,isLoading, text }) => {
    return (
        <Fragment>
            <Button.Ripple color="primary" onClick={onCancel} outline>
                Batal
            </Button.Ripple>
            <Button.Ripple color="primary" onClick={onDelete} disabled={(isLoading)}>
                {(isLoading) ? <Spinner size="sm" color='success' /> : text ? 'Ya' : 'Hapus'}
            </Button.Ripple>
        </Fragment>
    )
}

const FormDelete = (props) => {
    const {
        show,
        title,
        setShow,
        onDelete,
        description,
        loading,
        size,
        customDescription,
        text
    } = props


    return (
        <Fragment>
            <ModalBase
                size        = {size ?? "xs"}
                center      = {true}
                show        = {show}
                title       = {title}
                setShow     = {() => { setShow(!show) }}
                footer      = {
                    <Footer 
                        onCancel    = {() => { setShow(!show) }} 
                        onDelete    = {onDelete} 
                        isLoading   = {loading} 
                        text        = {text}
                    />
                }
            >
               {customDescription ? <h4>{customDescription}</h4> : <h4 className="text-center">{text ? text : 'Yakin anda akan menghapus'} {description} ?</h4>} 
            </ModalBase>

        </Fragment>
    )
}

export default FormDelete