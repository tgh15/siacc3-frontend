import { useState, Fragment, useEffect } from 'react';
import { Controller, useForm }           from 'react-hook-form';

import {
    Row,
    Col,
    Label,
    Modal,
    Input,
    Button,
    Spinner,
    ModalBody,
    FormGroup,
    ModalHeader,
    ModalFooter,
    CustomInput,
} from "reactstrap";

import Select                            from "react-select";
import classNames                        from 'classnames';
import { selectThemeColors }             from '@utils';

//Icon
import { Check, X }                      from 'react-feather';

//Component
import CustomToast                       from "../../../components/widgets/custom-toast";

//Services
import PrivilageRoleAPI                  from '../../../services/pages/configuration/privilage-role';


const ModalForm = (props) => {
    //Props
    const {
        show,
        data,
        onClose,
        getData,
        templates,
        setDataSelected
    } = props;

    const { control, setValue, watch } = useForm({ mode: "onChange" });

    //State
    const [name, setName]             = useState('');
    const [menus, setMenus]           = useState([]);
    const [inputErr, setInputErr]     = useState({
        name     : false,
        feature  : false,
        features : []
    })
    const [isLoading, setIsLoading]   = useState(false);
    const [detailData, setDetailData] = useState(null);

    const IconSwitch = () => (
        <Fragment>
            <span className='switch-icon-left'>
                <Check size={14}/>
            </span>
            <span className='switch-icon-right'>
                <X size={14}/>
            </span>
        </Fragment>
    );
    
    // options format template for react select
    const formatTemplate = (e) => {
        var options = [];

        e.map(item => {
            options.push({
                value : item.id,
                label : item.name,
            })
        });
        return options;
    };

    // change select template
    const selectTemplate = (id) => {
        var menus    = [];
        var template = templates.find(template => template.id == id.value);

        template.menus.forEach((menu, index) => {
            menu.is_active = false;
            menu.features.forEach(feature => {
                feature.is_active = false;
            });
            menus.push(menu);
        })
        setMenus(menus);
    };

    const switchMenu = (id) => {
        var err_    = { ...inputErr }
        var newMenu = [];

        menus.forEach((menu, index) => {
            if (menu.ID == id) {
                menu.is_active = !menu.is_active;
            }
            newMenu.push(menu);
        });

        if (newMenu.filter(menu => menu.is_active).length == 0) {
            err_.feature = true;
        } else {
            err_.feature = false
        }

        setInputErr(err_);
        setMenus(newMenu);
    };

    const switchFeature = (menu_id, e) => {
        var newMenu = [];

        menus.forEach((menu, index) => {
            if (menu.ID == menu_id) {
                menu.features.forEach(feature => {
                    if (e.findIndex(f => f.value == feature.id) > -1) {
                        feature.is_active = true;
                    } else {
                        feature.is_active = false;
                    }
                });
            }
            newMenu.push(menu);
        });
        setMenus(newMenu);
    };

    const switchFeatureUpdate = (menu_id, e) => {
        let e_          = [];
        let menu_       = [];
        let features_   = [];
        let allMenu_    = [];

        //get value
        e.map((data) => (e_.push(data.value)));

        menu_ = menus.filter((menu) => (menu.ID == menu_id));

        menu_[0].features.map((data) => {
            if(e_.includes(data.id)){
                data.is_active = true;
            }else{
                data.is_active = false;
            }
            features_.push(data);
        })

        menus.map((menu) => {
            if(menu.ID == menu_id){
                menu.features = features_;
            } 
            allMenu_.push(menu);
        })

        setMenus(allMenu_);
    };

    // change format for react select
    const formatOptions = (e) => {
        var options = [];

        e.map(item => {
            options.push({
                value : item.id,
                label : item.feature.title,
            })
        });
        return options;
    };

    const formatOptionsUpdate = (e) => {
        var options = [];

        e.map(item => {
            if(item.is_active === true){
                options.push({
                    value : item.id,
                    label : item.feature.title,
                })
            }
        });
        return options;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // variables
        var menuActivied    = menus.filter(menu => menu.is_active == true);
        var requestMenu     = [];

        var err_ = { ...inputErr }
        // check if name is empty
        if (name == '') {
            err_.name = true;
        } else {
            err_.name = false;
        }

        // check if menu is empty
        if (menus.length == 0) {
            err_.template = true;
        } else {
            err_.template = false;
        }

        if (!menuActivied.length) {
            err_.feature = true;
        } else {
            err_.feature = false;
        }

        // // check if feature is empty
        // if (detailData == null && menuActivied.length) {
        //     menuActivied.map(menu => {

        //         var featureActivied = menu.features.filter(feature => feature.is_active == true)
        //         if (!featureActivied.length) {
        //             err_.features = [...err_.features, menu.ID]
        //             return false
        //         } else {
        //             err_.features = err_.features.filter(index => index != menu.ID); // 2nd parameter means remove one item only
        //         }

        //         var requestFeature = [];
        //         featureActivied.map(feature => {
        //             requestFeature.push({
        //                 feature_id : feature.feature_id,
        //                 is_active  : feature.is_active,
        //                 name       : feature.feature.name
        //             })
        //         })

        //         requestMenu.push({
        //             name      : menu.name,
        //             label     : menu.label,
        //             icon      : menu.icon,
        //             kind      : menu.kind,
        //             link      : menu.link,
        //             features  : requestFeature,
        //             is_active : menu.is_active,
        //         })
        //     })
        // }
        setInputErr(err_);

        if (!err_.name || !err_.template || !err_.feature || !err_.features.length) {
            setIsLoading(true);

            let formData;

            if(detailData == null){
                formData = {
                    name    : name,
                    menus   : menus
                }
            }else{
                formData = {
                    id      : detailData.id,
                    name    : name,
                    title   : detailData.title,
                    menus   : menus
                }
            }
            
            if(detailData == null){
                PrivilageRoleAPI.createGroups(formData).then(
                    res => {
                        if (!res.is_error) {
                            onClose();
                            CustomToast("success", "Data berhasil disimpan");
                            getData();
                        }else {
                            CustomToast("danger", res.message);
                        }
                        setIsLoading(false);
                    }, err => {
                        setIsLoading(false);
                        CustomToast("danger", err.message);
                    }
                )
            }else {
                PrivilageRoleAPI.updateGroups(formData).then(
                    res => {
                        if (!res.is_error) {
                            onClose();
                            CustomToast("success", "Data berhasil diubah, Harap Login Kembali Untuk Mengaktifkan Role Terbaru");
                            getData();
                        }else {
                            CustomToast("danger", res.message);
                        }
                        setIsLoading(false);

                }, err => {
                    setIsLoading(false);
                    CustomToast("danger", err.message);
                })
            }
        }
    };

    //Get detail groups
    const getDetail = () => {
        setMenus([]);

        PrivilageRoleAPI.getGroups({id : data.id}).then(
            res => {
                if (!res.is_error) {
                    setDetailData(res.data);
                    setMenus(res.data.menus);
                    setName(res.data.name);
                }else {
                    CustomToast("danger", res.message);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.message);
            }
        )
    };

    useEffect(() => {
        if(data != null){
            getDetail();
        }else{
            if(templates.length > 0){
                selectTemplate({value: 1});
            }
        }
    }, [data, templates]);

    return (
        <div className='vertically-centered-modal modal-sm'>
            <Modal 
                size           = "lg" 
                isOpen         = {show} 
                toggle         = {() => onClose()} 
                onClosed       = {() => {
                    setMenus([]);
                    setDetailData(null); 
                    setDataSelected(null); 
                }} 
                className      = 'modal-dialog' 
                unmountOnClose = {true} 
            >
                <ModalHeader toggle={() => onClose()}>Tambah Data Privilage Role</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col 
                            md = "6" 
                            sm = "12"
                        >
                            <FormGroup>
                                <Label for='id'>Nama Privilage</Label>
                                <Input 
                                    type         = 'text' 
                                    invalid      = {inputErr.name} 
                                    onChange     = {(e) => setName(e.target.value)} 
                                    disabled     = {detailData != null ? true : false}
                                    defaultValue = {detailData != null ? detailData.name : null}
                                    
                                />
                                {
                                    inputErr.name ?
                                        <Label className="text-danger">Nama Privilage Belum Terisi!</Label> 
                                    : null
                                }
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            {
                                Array.isArray(menus) && menus.length > 0 && <table className='table-form'>
                                    <thead>
                                        <tr>
                                            <th>Status</th>
                                            <th>Menu</th>
                                            <th>Features</th>
                                        </tr>
                                        <tr>
                                            <th colSpan={3}>
                                                {
                                                    inputErr.feature ?
                                                        <Label className="text-danger text-center">Pilihan Menu Belum Terisi!</Label> 
                                                    : null
                                                }
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(menus) && menus.map((menu, index) => (
                                                menu.label != "Endpoint" &&
                                                <tr>
                                                    <td>
                                                        <CustomInput
                                                            id              = {`active-menu-${index}`}
                                                            name            = 'icon-primary'
                                                            type            = 'switch'
                                                            label           = {<IconSwitch />}
                                                            inline
                                                            onChange        = {() => switchMenu(menu.ID)}
                                                            defaultChecked  = {menu.is_active}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type      = 'text'
                                                            value     = {menu.label}
                                                            invalid   = {inputErr.features.find(f => f == menu.ID)}
                                                            readOnly 
                                                            className = {classNames("input-menu", {
                                                                active: menu.is_active
                                                            })}
                                                        />
                                                        {
                                                            inputErr.features.find(f => f == menu.ID) ? 
                                                                <Label className="text-danger">Pilihan Features Belum Terisi!</Label> 
                                                            : null
                                                        }
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <Select
                                                                name            = 'content'
                                                                theme           = {selectThemeColors}
                                                                isMulti
                                                                options         = {formatOptions(menu.features)}
                                                                onChange        = {(e) => { detailData == null ? switchFeature(menu.ID, e) : switchFeatureUpdate(menu.ID, e)}}
                                                                className       = 'react-select mt-1'
                                                                isDisabled      = {!menu.is_active}
                                                                placeholder     = "Pilih Features"
                                                                isClearable
                                                                defaultValue    = {detailData != null ? formatOptionsUpdate(menu.features) : formatOptions(menu.features)}
                                                                classNamePrefix = 'select'
                                                            />
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            }
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-between">
                    <Button 
                        color   = 'primary' 
                        outline 
                        onClick = {() => onClose()}
                    >
                        Batal
                    </Button>
                    <Button 
                        color    = 'primary' 
                        onClick  = {handleSubmit} 
                        disabled = {isLoading}
                    >
                        {isLoading ? <Spinner size="sm" color="success" /> : "Simpan"}
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalForm;