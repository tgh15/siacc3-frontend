import { Fragment, useEffect, useState, useRef }    from 'react';

//Css
import "./WorkUnitLevelSelect.scss";

//Components
import CustomToast                          from '../../../components/widgets/custom-toast';
import { ChevLeft }                         from '../../../components/widgets/feeds/feeds-categories-components/chevLeft';
import { ChevRight }                        from '../../../components/widgets/feeds/feeds-categories-components/chevRight';
import workunitListAPI                      from '../../../services/pages/configuration/unit-work-list/WorkunitList';


const WorkUnitLevelSelect = ({ isRtl, onSelect, getAllData, setListData, setStatusGetData }) => {
    //State
    const [level, setLevel] = useState(false);

    const workunitLevel = () => { 
        setListData(false);

        workunitListAPI.getWorkunitLevel().then(
            res => {
                if (!res.is_error) {
                    let data_;

                    if(localStorage.getItem('role') === 'Verifikator Daerah' || localStorage.getItem('role') === 'Admin Daerah'){
                        data_ = res.data.workunit_level.filter((data) => (
                            data.name !== 'KEJAKSAAN AGUNG'
                        ))
                    }else{
                        data_ = res.data.workunit_level
                    }

                    setLevel(data_);
                } else {
                    CustomToast("danger", res.code);
                }
            }
        ).catch(
            err => {
                CustomToast("danger", err.code);
            }
        )
    };

    useEffect(() => {
        workunitLevel();
    }, []);

    const refreshTable = (workunit_level_id) => {
        onSelect(workunit_level_id);
    };

    return (
        <Fragment>
            <div className='d-flex justify-content-between'>
                <ChevLeft/>

                <Fragment>
                    <ul
                        className="cat-menu-component nav nav-tabs mb-0"
                    >
                        <li className="nav-item">
                            <a 
                                onClick   = {() => {getAllData(); setStatusGetData()}}
                                className = "nav-link active"
                            >
                                SEMUA SATUAN KERJA
                            </a>
                        </li>

                        {
                            level && level.map((data, index) => (
                                <div key={index}>
                                    <li className="nav-item">
                                        <a 
                                            key       = {`cat-feeds-components-${data.id}`}
                                            onClick   = {() => { refreshTable(parseInt(data.id)) }}
                                            className = "nav-link active"
                                        >
                                            {data.name}
                                        </a>
                                    </li>
                                </div>
                            )) 
                        }
                    </ul>
                </Fragment>
            </div>
        </Fragment>
    )
}

export default WorkUnitLevelSelect;