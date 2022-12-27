import React, { Fragment }  from 'react';
import { 
    Col, 
    Row,
    Card, 
    Input, 
    Button, 
    CardBody, 
    CardHeader, 
} from 'reactstrap';

import Skeleton                     from 'react-loading-skeleton';

//Image
import defaultPhoto                 from '@src/assets/images/logo/logo-kejaksaan.png';

//Icon
import { Share, Trash2 }            from 'react-feather';

//Helper
import Helper                       from '../../helpers';

//Components
import CardUrl                      from '../../components/widgets/card-url/CardUrl';
import CardFile                     from '../../components/widgets/card-file/CardFile';
import CardVideo                    from '../../components/widgets/card-video';
import CardAudio                    from '../../components/widgets/card-audio';
import FilterDate                   from './Filter';
import SearchTable                  from '../../components/widgets/custom-table/SearchTable';
import { ModalBase }                from '../../components/widgets/modals-base';
import ContainerFluid               from '../../components/widgets/fluid';
import CarouselAttachment           from '../../components/widgets/card-carousel';
import CustomTableBodyEmpty         from '../../components/widgets/custom-table/CustomTableBodyEmpty';
import { EditDraftComponent }       from '../../components/widgets/list-draft/form_component';
import { BerandaFileProvider }      from '../../components/utility/context/pages/beranda';
import CustomTablePaginate from '../../components/widgets/custom-table/CustomTablePaginate';


const ListDraft = (props) => {

    const handleSearch = (e) => {
        props.setFilter({type: 'text', value: e});
    };

    return (
        <Fragment>
            {/* Modal Edit */}
            <ModalBase 
                show        = {props.showEditForm} 
                title       = {"Edit Draft"}
                setShow     = {props.setShowEditForm} 
            >
                <BerandaFileProvider>
                    <ContainerFluid>
                        <EditDraftComponent
                            data               = {props.selectedEdit}
                            closeModal         = {props.setShowEditForm} 
                            getDraftAPI        = {props.getDraftAPI}
                        />
                    </ContainerFluid>
                </BerandaFileProvider>
            </ModalBase>

            <Row>
                <Col 
                    md = '12' 
                    sm = '12'
                >
                    <Card>
                        <CardBody>
                            <h5 
                                style     = {{ fontWeight: 'bold' }}
                                className = "mb-3" 
                            >
                                List Draft
                            </h5>
                            
                            <div className="d-flex justify-content-between">
                                <div className="d-flex mb-2">
                                    <div id="filter-draft">
                                        <FilterDate
                                            setFilter           = {props.setFilter}
                                            basicModal          = {props.basicModal}
                                            handleFilter        = {props.handleFilter}
                                            setBasicModal       = {props.setBasicModal}
                                            filterListDraft     = {props.filterListDraft}
                                            setFilterListDraft  = {props.setFilterListDraft}
                                        />
                                    </div>
                                    <p 
                                        id        = "total-draft"
                                        className = 'm-0'
                                    >
                                        Total Draft {props.filterListDraft.length}
                                    </p>
                                </div>
                                <div className="d-flex">
                                    <div id="search-draft">
                                        <SearchTable
                                            id          = "search-data-draft" 
                                            onSearch    = {handleSearch}
                                            placeholder = "Cari Draft" 
                                        />
                                    </div>
                                </div>
                            </div>

                            <Row className="d-flex justify-content-end mb-2">
                                <CustomTablePaginate
                                    getData         = {(params) => { props.getDraftAPI(params.page)}}
                                    pagination      = {props.pagination} 
                                    offsetSearch    = {12} 
                                />
                            </Row>

                            {
                                !props.loading &&
                                props.filterListDraft &&
                                props.filterListDraft.map((data) => (
                                    <Card 
                                        id    = "list-draft"
                                        style = {{ border: '1px solid #d9dbe9' }} 
                                    >
                                        <CardBody>
                                            {/* header */}
                                            <Row>
                                                <Col 
                                                    md = '11' 
                                                    sm = '12'
                                                >
                                                    <h5 style={{ fontWeight: 'bold' }}>
                                                        {data.title}
                                                    </h5>
                                                </Col>
                                                <Col 
                                                    md = '1' 
                                                    sm = '12'
                                                >
                                                    <div style={{ marginLeft: '24px' }}>
                                                        {  
                                                            props.AvaiableShareAll ? 
                                                                <Input 
                                                                    type  = "checkbox"
                                                                    style = {{ cursor: 'pointer' }}
                                                                /> 
                                                            : null 
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                            {/* image */}
                                            {
                                                data.attachment.length > 0 ?
                                                    <CarouselAttachment
                                                        images = {props.processAttachment(data.attachment, "Image")}
                                                    /> 
                                                : null
                                            }
                                            
                                            {/* video */}
                                            {
                                                data.attachment.length > 0 ?
                                                    <CardVideo
                                                        item = {props.processAttachment(data.attachment, "Video")}
                                                    />
                                                : null
                                            }
                                            
                                            {/* audio */}
                                            {
                                                data.attachment.length > 0 ?
                                                    <CardAudio
                                                        item = {props.processAttachment(data.attachment, "Audio")}
                                                    />
                                                : null
                                            }
                                            
                                            {/* content text */}
                                            <p className="text-justify mt-2">
                                                {data.when_}, telah terjadi {data.what}, 
                                                bertempat di {data.where} {data.who}. 
                                                Kejadian ini terjadi karena {data.why}, {data.how}
                                            </p>
                                            
                                            <div className="mb-2 d-flex">
                                                {
                                                    data.hashtag.length > 0 ?
                                                        data.hashtag.map((data) => (
                                                            <a href={`/advanced-search?keyword=${data.tag.replace('#',"")}`}><h6 className="text-primary mr-1">{data.tag}</h6></a>
                                                        ))
                                                    :
                                                    null
                                                }
                                            </div>

                                            {/* link */}
                                            {
                                                data.attachment.length > 0 ?
                                                    <CardUrl
                                                        data = {props.processAttachment(data.attachment, "Link")}
                                                    />
                                                : null
                                            }

                                            {/* document */}
                                            {
                                                data.attachment.length > 0 ?
                                                    <CardFile
                                                        item = {props.processAttachment(data.attachment, "Document")}
                                                    />
                                                : null
                                            }

{
                                                data.attachment.length > 0 ?
                                                    <CardFile
                                                        item = {props.processAttachment(data.attachment, "Other")}
                                                    />
                                                : null
                                            }

                                            {/* footer */}
                                            <Row>
                                                <Col 
                                                    md = '10' 
                                                    sm = '12'
                                                >
                                                    <div className="d-flex">
                                                        <h6 
                                                            style     = {{ fontWeight: 'bold' }}
                                                            className = "mr-2" 
                                                        >
                                                            Last Update
                                                        </h6>
                                                        <p style={{ fontSize: '12px' }}>
                                                            {Helper.dateIndo(data.updated_at)}
                                                        </p>
                                                    </div>
                                                </Col>
                                                <Col 
                                                    md = '2' 
                                                    sm = '12'
                                                >
                                                    <div class="d-flex justify-content-between">
                                                        <Share 
                                                            id      = "share-draft"
                                                            size    = {25} 
                                                            style   = {{ marginTop: '7px', cursor: 'pointer' }}
                                                            onClick = {() => {props.handleShare(data.id)}}
                                                        />
                                                        <Trash2
                                                            id      = "delete-draft"
                                                            size    = {25} 
                                                            style   = {{ marginTop: '7px', cursor: 'pointer' }}
                                                            onClick = {() => { props.setShowDeleteForm(true); props.setSelectedId(data.id) }}
                                                        />
                                                        <Button 
                                                            id      = "update-draft"
                                                            color   = "primary" 
                                                            style   = {{ width: '100px' }}
                                                            onClick = {() => { props.setSelectedEdit(data); props.setShowEditForm(true)}}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                            
                            {
                                !props.loading &&
                                props.listDraft && props.listDraft.length === 0 && 
                                <div style={{ border: '1px solid #d9dbe9', borderRadius: '7px' }}>
                                    <CustomTableBodyEmpty/>
                                </div>
                            }
                            {
                                props.loading && 
                                <div>
                                    <Skeleton style={{ width: '30%' }}/>
                                    <Skeleton/>
                                    <Skeleton/>
                                    <Skeleton/>
                                    <Skeleton/>
                                </div>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ListDraft;