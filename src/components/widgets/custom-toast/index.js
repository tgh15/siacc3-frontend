import { Fragment } from 'react'
import Avatar from '../../../components/widgets/avatar'
import { AlertTriangle, Check, X } from 'react-feather'
import { toast } from 'react-toastify'

const titleDefault = (type) => {
    switch (type) {
        case 'success':
            return "Berhasil!"
            break;
        case 'danger':
            return "Terjadi Kesalahan"
            break;
        case 'warning' :
            return "Perhatian"
    }
}

const iconDefault = (type) => {
    switch (type) {
        case 'success':
            return <Check size={12} />
            break;
        case 'danger':
            return <X size={12} />
            break;
        case 'warning' :
            return <AlertTriangle size={12} />
            break;
    }
}

const SuccessToast = ({ type, title, description }) => {

    return (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color={`${type}`} icon={iconDefault(type)} />
                    <h6 className={`toast-title text-${type}`}>{ title ?? titleDefault(type)  }</h6>
                </div>
            </div>
            <div className='toastify-body'>
                <span aria-label='toast-text'>
                    {description}
                </span>
            </div>
        </Fragment>
    )
}

const CustomToast = (type, description, title) => toast(<SuccessToast type={type} title={title} description={description} />, { hideProgressBar: false })


export default CustomToast