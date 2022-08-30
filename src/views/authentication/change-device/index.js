// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Button, Spinner } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import Logo                     from '@src/assets/images/logo/logo_dark.svg'
import ImageRounded             from '@src/components/widgets/image-rounded'
import { useEffect, useState }  from 'react'
import AuthService              from '../../../services/pages/authentication/AuthService'
import { useQuery }             from '../../../components/utility/hooks/useQuery';
import CustomToast              from '../../../components/widgets/custom-toast'

//PUT
//auth/request/update

const ChangeDevice = () => {

    let query                     = useQuery();
    let token                     = query.get('token');


    const [status, setStatus]     = useState(null);

    const checkToken = () => {
        console.log('check token',token)
        
        if(token === null){
            console.log('disini')
            setStatus(undefined);
        }else{
            console.log('disini2')

            const params = {
                token : token
            }

            AuthService.checkResetDevice(params).then(
                res => {
                    if(res.status === 200){
                        setStatus(res.data);
                    }else{
                        setStatus(undefined)
                    }
                }
            )
        }

    };

    useEffect(() => {
        if(status === null){
            checkToken()
        }
    }, [status])

    return (
        <div className='auth-wrapper auth-basic px-2'>
            <div className='auth-inner my-2'>
                <Card className='mb-0'>
                    {
                        status != null || status == undefined ?
                            status == undefined ?
                                <CardBody>
                                    <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                                        <ImageRounded src={Logo} width={50} />
                                        <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                                    </Link>
                                    <CardTitle tag='h2' className='fw-bolder mb-1'>
                                        Tidak Valid
                                    </CardTitle>
                                    <CardText className='mb-2'>
                                        Token yang anda masukkan tidak valid.
                                    </CardText>
                                    <Button block tag={Link} to='/login' color='primary'>
                                        Kembali
                                    </Button>
                                </CardBody>
                            :
                                <CardBody>
                                    <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                                        <ImageRounded src={Logo} width={50} />
                                        <h1 className='brand-text text-primary ml-1 mt-1'>SIACC</h1>
                                    </Link>
                                    <CardTitle tag='h2' className='fw-bolder mb-1'>
                                        Permintaan Reset Device Berhasil.
                                    </CardTitle>
                                    <CardText className='mb-2'>
                                        Silahkan menunggu informasi selanjutnya.
                                    </CardText>
                                    <Button block tag={Link} to='/login' color='primary'>
                                        Kembali
                                    </Button>
                                </CardBody>
                        :
                            <CardBody className="text-center">
                                <Spinner/>
                            </CardBody>
                    }
                </Card>
            </div>
        </div>
    )
}

export default ChangeDevice;