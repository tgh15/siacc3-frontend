import { ModalBase } from "../../../components/widgets/modals-base"


const FilterResult = props => {

    // props
    const {
        show,
        onClose,
    } = props

    return (
        <ModalBase
            title="Hasil Automation"
            show={show}
            setShow={() => onClose()}
            size="lg"
        >

        </ModalBase>
    )
}


export default FilterResult