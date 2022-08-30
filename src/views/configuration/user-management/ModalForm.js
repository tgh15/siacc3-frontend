import { 
    Fragment, 
    useContext, 
    useEffect, 
    useState 
} from 'react';
import Select                   from 'react-select';
import { yupResolver }          from '@hookform/resolvers/yup';
import { selectThemeColors }    from '@utils';
import { useForm, Controller }  from 'react-hook-form';

//Image
import defaultPhoto             from '@src/assets/images/portrait/small/150x150.png';

import {
    Row,
    Col,
    Form,
    Input,
    Label,
    Media,
    Button,
    FormGroup,
    ModalFooter,
    CustomInput,
} from "reactstrap";

//Css
import "./UserManagement.scss";

//Component
import schema                                       from './validation';
import CustomToast                                  from "../../../components/widgets/custom-toast";
import AccountForm                                  from './AccountForm';
import SubmitButton                                 from '../../../components/widgets/submit-button';
import EditAccountForm                              from './EditAccoutForm';
import UserManagementApi                            from '../../../services/pages/configuration/user-management';
import SelectOptionsService                         from '../../../services/pages/select-options';

//Context
import { PerformanceContext }                       from '../../../context/PerformanceContext';

//Helper
import Helper                                       from '../../../helpers';
import AuthService                                  from '../../../services/pages/authentication/AuthService';

//Validation
import {schemaEdit, schemaEditAdmin}                from './validationEditAccount';


const ModalForm = (props) => {
    const {
        data,
        setListData,
        setModalForm,
    } = props;

    // context
    const { workunitOptions } = useContext(PerformanceContext);

    // states
    const [photo, setPhoto]                         = useState(data ? data.photo : defaultPhoto);
    const [loading, setLoading]                     = useState(false);
    const [sectorOptions, setSectorOptions]         = useState(false);
    const [PositionOptions, setPositionOptions]     = useState(false);
    const [AuthGroupOptions, setAuthGroupOptions]   = useState(false);

    const { register, errors, handleSubmit, control, setValue, setError, clearErrors } = useForm(
        { 
            mode: "onChange", resolver: yupResolver(
                !data ? 
                    schema 
                :  
                    (localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah') ?
                        schemaEditAdmin
                    :
                        schemaEdit
            )
        }
    )

    const handleLogout = () => {
        AuthService.logout({
            token : localStorage.getItem("token"),
            onSuccess : (data) => {
            localStorage.clear()
  
            window.location.href = "/login"
            },
            onFail : (err) => {
            localStorage.clear()
  
            window.location.href = "/login"
            }
        });
    }

    const selectPhoto = e => {
        const reader = new FileReader(),
        files = e.target.files
        
        reader.onload = function () {
            setPhoto(reader.result)
        }

        reader.readAsDataURL(files[0]);
    };

    const getAuthGroupOptions = () => {
        SelectOptionsService.authGroupList({
            onSuccess: (res) => {
                setAuthGroupOptions(res);
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const getPositionOptions = () => {
        SelectOptionsService.positionList({
            onSuccess: (res) => {
                setPositionOptions(res);
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const getSectorOptions = () => {
        SelectOptionsService.sector({
            onSuccess: (res) => {
                setSectorOptions(res);
            },
            onFail: (err) => {
                CustomToast("danger", err.message);
            }
        })
    };

    const getData = () => {
        setListData(false);

        UserManagementApi.get({
            onSuccess: (res) => {
                setListData(res.employee);
            }, onFail: (err) => {
                console.log(err);
            }
        })
    };

    const create = dataForm => {
        UserManagementApi.create({
            data: dataForm,

            onSuccess: (res) => {
                setLoading(false);
                setModalForm(false);
                CustomToast("success", "Data Berhasil Disimpan");
                getData();
            },
            onFail: (err) => {
                if(err.data.status == '409'){
                    if(err.data.message == 'Duplicate Username !'){
                        CustomToast("danger", 'Usename Telah Digunakan');
                    }else if(err.data.message == 'Duplicate Employee Data !'){
                        CustomToast("danger", 'Nomor KTP Telah Digunakan');
                    }else{
                        CustomToast("danger", err.data.message);
                    }
                }
                else if(err.data.message == 'Error While Update Employee ! Email Has Been Used' || err.data.message == 'Error While Create Employee ! Email Has Been Used'){
                    CustomToast("danger", 'Email Telah Digunakan');
                }else{
                    CustomToast("danger", err.data.message);
                }
                setLoading(false);
            }
        })
    };

    const update = dataForm => {

        UserManagementApi.update({
            id              : data.id,
            data            : dataForm,
            uuid            : data.uuid,
            photo           : data.photo,
            storage         : data.storage,
            photo_id        : data.photo_id,
            username        : data.username,
            uuid_user       : data.uuid_user,
            old_user_group  : parseInt(data.user_group[0].id),
            password        : dataForm.update_password.length > 0 ? dataForm.update_password : undefined,
            onSuccess: (res) => {
                setLoading(false);
                setModalForm(false);
                CustomToast("success", "Data Berhasil Diubah");
                getData();

                if(data.uuid === localStorage.getItem('uuid')){
                    CustomToast("warning", "Silahkan melakukan login ulang.");
                    setTimeout(() => {
                        handleLogout();
                    }, 3000)
                }
            },
            onFail: (err) => {
                console.log("danger", err);
                CustomToast("danger", err.data.message);
                setLoading(false);
            }
        })
    };

    const checkOldPassword = (data) => {

        const formData = {
            username : data.username,
            password : data.old_password
        }

        UserManagementApi.checkPassword({
            formData,
            onSuccess : (res) => {
                update(data)
            },
            onFail : (err) => {
                if(err.status === 401){
                    setError('old_password', {type: 'error', message: 'Password lama tidak sesuai.'});
                }else{
                    CustomToast("danger",err.message);
                    console.log('error check old password',err)
                    clearErrors('old_password');
                }
                setLoading(false);
            }
        })
    };

    const onSubmit = dataForm => {
        setLoading(true);

        dataForm.ktp            = dataForm.ktp.toString();
        dataForm.sector_id      = dataForm.sector_id.value;
        dataForm.user_group     = parseInt(dataForm.user_group.value);
        dataForm.position_id    = dataForm.position_id.value;
        dataForm.workunit_id    = dataForm.workunit_id.value;
        dataForm.identity_id    = dataForm.identity_id.toString();
        dataForm.phone_number   = dataForm.phone_number.toString();

        if (!data) {
            create(dataForm);
        } else {
            dataForm.password   = dataForm.update_password;

            if(localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah'){
                update(dataForm);
            }else{
                checkOldPassword(dataForm);
            }
        }
    };


    
    useEffect(() => {
        getAuthGroupOptions();
        getPositionOptions();
        getSectorOptions();

        if(data){
            setValue('sector_id'    ,{value: data.sector_id, label: data.sector})
            setValue('workunit_id'  ,{value: data.workunit_id, label: data.workunit})
            setValue('position_id'  ,{value: data.position_id, label: data.position})
            setValue('user_group'   ,{value: data.user_group[0].id, label: data.user_group[0].name})
        }
    }, []);

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div id="employee-data">
                    <Row>
                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='exampleCustomFileBrowser'>Foto Profile</Label>
                                <Media>
                                    <Media 
                                        left
                                        className = 'mr-25' 
                                    >
                                        <Media
                                            src         = {photo}
                                            alt         = 'Generic placeholder image'
                                            width       = '80'
                                            height      = '80'
                                            object
                                            onError     = {Helper.fallbackImage_}
                                            className   = 'rounded mr-50'
                                        />
                                    </Media>
                                    <Media
                                        id          = "user-manajement-photo"
                                        body
                                        className   = 'mt-75 ml-1'
                                    >
                                        <Button.Ripple
                                            tag         = {Label}
                                            size        = 'sm'
                                            color       = 'primary'
                                            className   = 'mr-75'
                                        >
                                            Upload
                                            <Input
                                                type        = 'file'
                                                name        = "photo"
                                                hidden
                                                accept      = 'image/*'
                                                innerRef    = {register()}
                                                onChange    = {selectPhoto}
                                            />
                                        </Button.Ripple>
                                    </Media>
                                </Media>
                            </FormGroup>
                        </Col>
                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='satker'>Satuan Kerja</Label>
                                <div id="user-manajement-satker">
                                    <Controller
                                        name    = "workunit_id"
                                        control = {control}
                                        as      = {
                                            <Select
                                                id              = "workunit_id" 
                                                theme           = {selectThemeColors}
                                                options         = {workunitOptions}
                                                className       = 'react-select'
                                                // isDisabled      = {
                                                //     data ?
                                                //         (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Verifikator Daerah') || localStorage.getItem('role') === 'Admin Daerah' ?
                                                //             false
                                                //         :
                                                //             true 
                                                //     : false
                                                // }
                                                placeholder     = "Pilih Satker"
                                                isClearable
                                                classNamePrefix = 'select'
                                            />
                                        }
                                        tabIndex     = {5}
                                    />
                                </div>
                                {console.log(errors)}
                                {errors && errors.workunit_id && <Label>{errors?.workunit_id?.label?.message}</Label>}
                            </FormGroup>
                            <FormGroup>
                                <Label for='position_id'>Jabatan</Label>
                                <div id="user-manajement-position">
                                    <Controller
                                        name    = "position_id"
                                        control = {control}
                                        as      = {
                                            <Select
                                                id              = "position_id" 
                                                theme           = {selectThemeColors}
                                                options         = {PositionOptions}
                                                className       = 'react-select'
                                                // isDisabled      = {
                                                //     data ?
                                                //         (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Verifikator Daerah') || localStorage.getItem('role') === 'Admin Daerah' ?
                                                //             false
                                                //         :
                                                //             true 
                                                //     : false
                                                // }
                                                placeholder     = "Pilih Jabatan"
                                                isClearable
                                                classNamePrefix = 'select'
                                            />
                                        }
                                        tabIndex     = {6}
                                    />
                                </div>
                                {errors && errors.position_id && <Label>{errors?.position_id?.label?.message}</Label>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='id'>NIP</Label>
                                <div id="user-manajement-nip">
                                    <Input
                                        type         = 'text'
                                        name         = 'identity_id'
                                        invalid      = {(errors?.identity_id) ? true : false}
                                        innerRef     = {register()}
                                        defaultValue = {(data) ? data.identity_id : null}
                                        tabIndex     = {1}
                                        readOnly     = {
                                            data ?
                                                (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Verifikator Daerah') || localStorage.getItem('role') === 'Admin Daerah' ?
                                                    false
                                                :
                                                    true 
                                            : false
                                        }
                                    />
                                </div>

                                {errors && errors.identity_id && <Label>{errors.identity_id.message}</Label>}
                            </FormGroup>
                        </Col>
                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='struktur'>Struktur/Bidang</Label>
                                <div id="user-manajement-structure">
                                    <Controller
                                        name    = "sector_id"
                                        control = {control}
                                        as      = {
                                            <Select
                                                id              = "sector_id" 
                                                theme           = {selectThemeColors}
                                                options         = {sectorOptions}
                                                className       = 'react-select'
                                                isDisabled      = {
                                                    data ?
                                                        (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Verifikator Daerah') || localStorage.getItem('role') === 'Admin Daerah' ?
                                                            false
                                                        :
                                                            true 
                                                    : false
                                                }
                                                isClearable
                                                placeholder     = "Pilih Struktur/Bidang"
                                                classNamePrefix = 'select'
                                            />
                                        }
                                        tabIndex     = {7}
                                    />
                                </div>

                                {errors && errors.sector_id && <Label>{errors?.sector_id?.label?.message}</Label>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='ktpnumber'>No. KTP</Label>
                                <div id="user-manajement-ktp">
                                    <Input
                                        type         = 'text'
                                        name         = 'ktp'
                                        invalid      = {(errors.ktp) ? true : false}
                                        innerRef     = {register()}
                                        defaultValue = {(data) ? data.ktp : null}
                                        tabIndex     = {2}
                                        readOnly     = {
                                            data ?
                                                (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Verifikator Daerah') || localStorage.getItem('role') === 'Admin Daerah' ?
                                                    false
                                                :
                                                    true 
                                            : false
                                        }
                                    />
                                </div>

                                {errors && errors.ktp && <Label>{errors.ktp.message}</Label>}
                            </FormGroup>
                        </Col>
                        <Col
                            md="6"
                            sm="12"
                        >
                            <FormGroup>
                                <Label for='phone'>No. Telpon</Label>
                                <div id="user-manajement-phone">
                                    <Input
                                        type         = 'text'
                                        name         = 'phone_number'
                                        invalid      = {(errors.phone_number) ? true : false}
                                        innerRef     = {register()}
                                        tabIndex     = {8}
                                        defaultValue = {(data) ? data.phone_number : null}
                                    />
                                </div>

                                {errors && errors.phone_number && <Label>{errors.phone_number.message}</Label>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            md = "6"
                            sm =" 12"
                        >
                            <FormGroup>
                                <Label for='name'>Nama Lengkap</Label>
                                <div id="user-manajement-name">
                                    <Input
                                        type         = 'text'
                                        name         = 'name'
                                        invalid      = {(errors.name) ? true : false}
                                        innerRef     = {register()}
                                        tabIndex     = {3}
                                        defaultValue = {(data) ? data.name : null}
                                    />
                                </div>

                                {errors && errors.name && <Label>{errors.name.message}</Label>}
                            </FormGroup>
                        </Col>

                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='email'>Surel</Label>
                                <div id="user-manajement-email">
                                    <Input
                                        type         = 'text'
                                        name         = 'email'
                                        invalid      = {(errors.email) ? true : false}
                                        innerRef     = {register()}
                                        tabIndex     = {9}
                                        defaultValue = {(data) ? data.email : null}
                                    />
                                </div>
                                {errors && errors.email && <Label>{errors.email.message}</Label>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='name'>Privilage</Label>
                                <div id="user-manajement-privilage">
                                    <Controller
                                        name    = "user_group"
                                        control = {control}
                                        as      = {
                                            <Select
                                                id              = "user_group" 
                                                theme           = {selectThemeColors}
                                                options         = {AuthGroupOptions}
                                                className       = 'react-select'
                                                isDisabled      = {
                                                    data ?
                                                        (localStorage.getItem('role') === 'Admin' || localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Verifikator Daerah') || localStorage.getItem('role') === 'Admin Daerah' ?
                                                            false
                                                        :
                                                            true 
                                                    : false
                                                }
                                                isClearable
                                                placeholder     = "Pilih Privilage"
                                                classNamePrefix = 'select'
                                            />
                                        
                                        }
                                        tabIndex     = {4}
                                    />
                                </div>
                                {errors && errors.user_group && <Label>{errors?.user_group?.label?.message}</Label>}
                            </FormGroup>
                        </Col>
                        <Col
                            md = "6"
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='address'>Alamat</Label>
                                <div id="user-manajement-address">
                                    <Input
                                        type         = 'textarea'
                                        name         = 'address'
                                        rows         = '4'
                                        invalid      = {(errors.address) ? true : false}
                                        innerRef     = {register()}
                                        placeholder  = 'Alamat'
                                        tabIndex     = {10}
                                        defaultValue = {(data) ? data.address : null}
                                    />
                                </div>

                                {errors && errors.address && <Label>{errors.address.message}</Label>}
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div id="account-data" className='border-top mt-2 py-2'>
                    {
                        !data ?
                            <AccountForm
                                errors          = {errors}
                                register        = {register}
                                setUsername     = {(par) => { setUsername(par) }}
                                setPassword     = {(par) => { setPassword(par) }}
                                setModalAccount = {(par) => { setModalAccount(par) }}
                            />
                        :
                            <EditAccountForm
                                data            = {data}
                                errors          = {errors}
                                register        = {register}
                            />
                    }
                </div>

                <ModalFooter className="d-flex justify-content-between px-0">
                    <div id="user-manajement-batal">
                        <Button
                            color   = 'primary'
                            outline
                            onClick = {() => setModalForm(false)}
                        >
                            Batal
                        </Button>
                    </div>
                    {/* {
                        !data ? 
                            <div id="user-manajement-account">
                                <Button 
                                    color   = 'primary' 
                                    outline 
                                    onClick = {() => setModalAccount(true)}
                                >
                                    Buat Akun
                                </Button>
                            </div> 
                        :
                            <div id="user-manajement-account">
                                <Button 
                                    color   = 'primary' 
                                    outline 
                                    onClick = {() => setModalEditAccount(true)}
                                >
                                    Ubah Kata Sandi
                                </Button>
                            </div> 
                    } */}
                    <div id="user-manajement-submit">
                        <SubmitButton
                            size      = "sm"
                            isLoading = {loading}
                        >
                            Submit
                        </SubmitButton>
                    </div>
                </ModalFooter>
            </Form>
        </Fragment>
    );
};

export default ModalForm;
