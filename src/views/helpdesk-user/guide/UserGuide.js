import React, { 
    Fragment, 
    useState, 
    useEffect
} from 'react';

import { 
    Col, 
    Row, 
    Card, 
    Input, 
    CardBody, 
    InputGroup, 
    InputGroupText, 
    InputGroupAddon
} from 'reactstrap';

import parse                    from 'html-react-parser';
import Select                   from 'react-select';
import Skeleton                 from 'react-loading-skeleton';
import { selectThemeColors }    from '@utils';

//Css
import '../style.scss';

//Icon
import { 
    Search, 
    ChevronUp,
    HelpCircle,
    ChevronDown,
} from 'react-feather';

//Components
import Helper                   from '../../../helpers';
import ContainerFluid           from '../../../components/widgets/fluid';
import CustomTableBodyEmpty     from '../../../components/widgets/custom-table/CustomTableBodyEmpty';

//API Url
import { SettingsAPI }          from '../../../services/pages/helpdesk/settings';
import { InstructionAPI }       from '../../../services/pages/helpdesk/instruction';


const UserGuide = () => {
    //Helper
    const { shortenWord } = Helper;

    //State
    const [guideAll, setGuideAll]           = useState(false);
    const [filterData, setFilterData]       = useState(null);
    const [categoryAll, setCategoryAll]     = useState(false);
    const [contentDetail, setContentDetail] = useState(null);

    useEffect(() => {
        getAllGuide();
        getAllCategory();
    }, []);

    //Get all guide
    const getAllGuide = () => {
        InstructionAPI.getGuideAll().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    setGuideAll([...res.data]);
                    setFilterData([...res.data]);
                }
            },
            err => {
                console.log(err.message);
            }
        )
    };

    //Get all guide category
    const getAllCategory = () => {
        SettingsAPI.getAllCategory().then(
            res => {
                if (res.status === 200 && res.data != null) {
                    let newData = [];

                    res.data.map((data) => (
                        newData.push({
                            value : data.id,
                            label : data.name
                        })
                    ));

                    setCategoryAll(newData);
                }
            },
            err => {
                console.log(err.message);
            }
        )
    };

    //filter category
    const filterCategory = (id) => {
        const selected = id;
        
        let newFilter = filterData.filter((data) => (
            data.guide_category_id == selected
        ));
        
        setGuideAll(newFilter);
    };

    //search guide
    const searchGuide = (e) => {
        let newSearch = filterData.filter((data) => (
            data.title.toLowerCase().includes(e.target.value)
        ));

        setGuideAll(newSearch);
    };

    return (
        <Fragment>
            <Row className='mb-1'>
                <Col 
                    md = "8" 
                    sm = "12"
                >
                    <InputGroup className='input-group-merge mb-2'>
                        <InputGroupAddon addonType='prepend'>
                            <InputGroupText>
                                <Search size={14}/>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                            onChange    = {searchGuide}
                            placeholder = 'Klik untuk mencari...'
                        />
                    </InputGroup>
                </Col>
                <Col 
                    md = "4" 
                    sm = "12"
                >
                    <Select
                        theme           = {selectThemeColors}
                        onChange        = {(e) => { e ? filterCategory(e.value) : getAllGuide()}}
                        options         = {categoryAll}
                        className       = 'react-select'
                        isClearable
                        placeholder     = "Pilih Kategori"
                        classNamePrefix = 'select'
                    />
                </Col>
            </Row>

            {
                guideAll && guideAll.map((data) => (
                    <div>
                        {
                            contentDetail === data.id ?
                                <Card className="green-bg">
                                    <CardBody>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <div 
                                                    style     = {{ background: '#fff' }}
                                                    className = "avatar mr-1"
                                                >
                                                    <div className="avatar-content">
                                                        <HelpCircle 
                                                            size  = {20} 
                                                            style = {{ color: '#006334' }}
                                                        />
                                                    </div>
                                                </div>   
                                                <h4 style={{ color: '#fff', marginTop: '5px', fontWeight: 'bold' }}>
                                                    {data.title}
                                                </h4>
                                            </div>
                                            <ChevronUp
                                                size      = {20} 
                                                style     = {{ color: '#fff' }}
                                                onClick   = {() => {
                                                    setContentDetail(data.id); 
                                                    setContentDetail(true)
                                                }}
                                                className = 'cursor-pointer'
                                            />
                                        </div>
                                        <Card style={{ margin: '10px 50px 0px 47px' }}>
                                            <CardBody style={{ padding: '10px' }}>
                                                <p className='text-justify m-0 text-dark'>
                                                    {parse(data.content)}
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </CardBody>
                                </Card>
                            :
                                <Card style={{ marginBottom: '1rem' }}>
                                    <CardBody>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex align-items-center'>
                                                <div 
                                                    style     = {{ background: '#006334' }}
                                                    className = "avatar mr-1" 
                                                >
                                                    <div className="avatar-content">
                                                        <HelpCircle size={20}/>
                                                    </div>
                                                </div>   
                                                <h4 style={{ color: '#006334', marginTop: '5px', fontWeight: 'bold' }}>
                                                    {data.title}
                                                </h4>
                                            </div>
                                            <ChevronDown
                                                size      = {20} 
                                                onClick   = {() => setContentDetail(data.id)}
                                                className = 'cursor-pointer'
                                            />
                                        </div>
                                        <Card 
                                            style     = {{ margin: '10px 50px 0px 47px' }} 
                                            className = 'white-bg'
                                        >
                                            <CardBody style={{ padding: '10px' }}>
                                                <p className='text-justify m-0 text-dark'>
                                                    {parse(shortenWord(data.content))}
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </CardBody>
                                </Card>
                        }
                    </div>
                ))
            }
            {
                !guideAll && guideAll !== null &&
                <Fragment>
                    <div className='p-2'>
                        <div className='d-flex justify-content-start'>
                            <Skeleton style={{ borderRadius: 50, width: 32, height: 32 }}/>
                            <ContainerFluid>
                                <Skeleton style={{ width: "20%", marginTop: '13px' }}/>
                            </ContainerFluid>
                        </div>
                        <Skeleton style = {{ height: "5em", marginTop: '15px' }}/>
                        <Skeleton style = {{ width: "10%", marginTop: '13px' }}/>
                    </div>
                </Fragment>
            }
            {
                guideAll && guideAll.length === 0 &&
                <CustomTableBodyEmpty/>
            }
        </Fragment>
    );
};

export default UserGuide;