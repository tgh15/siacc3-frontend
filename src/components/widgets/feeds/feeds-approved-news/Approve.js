
import React,{ Fragment, useState, useEffect }             from 'react';
import { Archive, Globe, MoreHorizontal, User } from 'react-feather';
import { 
    Button, 
    FormGroup, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle, 
    UncontrolledButtonDropdown 
} from 'reactstrap';

//Moment
import moment                                   from 'moment';

import { NewsApprovedHeadChildCard }            from './ChildCard';
import { SelectWilayah,SelectLeader }           from '../../persetujuan-berita';
import CarouselAttachment                       from '../../card-carousel';
import CardUrl                                  from '../../card-url/CardUrl';
import CardFile                                 from '../../card-file/CardFile';
import CardVideo                                from '../../card-video';
import CardAudio                                from '../../card-audio';

import getAttachments                           from '../../../../services/pages/feeds/agent-reports/getAttachments';

export const ApprovedNewsWidget = (props) => {

    const {
        title,
        status,
        index,
        avatar,
        account,
        division,
        location,
        text:teks,
        timeUpdate,
        agent_report,
        statePosition,
        getAgentReportByStatusAll
    } = props;

    const [attachment, setAttachment]                       = useState(null);
    const [leaderModalState,setLeaderModalState]            = useState(false);
    const [publicationModalState,setPublicationModalState]  = useState(false);

    const toggle = {
        leader      : () => {setLeaderModalState(!leaderModalState)},
        toArchive   : () => {props.onChangeToArchive(props)},
        publication : () => {setPublicationModalState(!publicationModalState)},
    };

    //Process attachment
    const processAttachment = (data, type) => {
        let attachment_ = [];

        if (data != null && data.length > 0) {
            data.map((data) => (
                data.type === type && attachment_.push(data)
            ))
        }

        console.log(attachment_, `type attachment ${type}`)

        return attachment_;
    };

    const getAttach = async() => {
        let attach = await getAttachments(agent_report.id);
        console.log(attach, 'get attach data');
        setAttachment(attach.data);
    }

    useEffect(() => {
        getAttach();
    }, []);

    return(
        <Fragment>
            {
                "method" in props ? 
                    <NewsApprovedHeadChildCard
                        title       = {agent_report.employee.name}
                        avatar      = {agent_report.employee.photo}
                        location    = {agent_report.location_name}
                        division    = {agent_report.employee.workunit}
                        subTitle    = {moment(agent_report.created_at).format("DD MMMM YYYY, HH:mm")}
                    />
                :
                    <NewsApprovedHeadChildCard
                        title       = {account}
                        avatar      = {avatar}
                        location    = {location}
                        division    = {division}
                        subTitle    = {timeUpdate}
                    />
            }

            <FormGroup>
                <h4>{title}</h4>
            </FormGroup>

            <FormGroup>
                {/* image */}
                {
                    attachment != null && attachment.length > 0 ?
                        <CarouselAttachment
                            images = {processAttachment(attachment, "Image")}
                        /> 
                    : null
                }
                
                {/* video */}
                {
                    attachment != null && attachment.length > 0 ?
                        <CardVideo
                            item = {processAttachment(attachment, "Video")}
                        />
                    : null
                }
                
                {/* audio */}
                {
                    attachment != null && attachment.length > 0 ?
                        <CardAudio
                            item = {processAttachment(attachment, "Audio")}
                        />
                    : null
                }
                {
                    "method" in props ? 
                        <Fragment>
                            <p className="text-justify mt-1">
                                {agent_report.when_}, telah terjadi {agent_report.what}, 
                                bertempat di {agent_report.where} {agent_report.who}. 
                                Kejadian ini terjadi karena {agent_report.why}, {agent_report.how}
                            </p>
                        </Fragment>
                    : 
                        <p className="text-justify mt-1">
                            {teks}
                        </p>
                }
                {/* link */}
                {
                    attachment != null && attachment.length > 0 ?
                        <CardUrl
                            data = {processAttachment(attachment, "Link")}
                        />
                    : null
                }

                {/* document */}
                {
                    attachment != null && attachment.length > 0 ?
                        <CardFile
                            item = {processAttachment(attachment, "Document")}
                        />
                    : null
                }

                    <div style={{wordBreak: 'break-word'}}>
                        <p>

                        {
                            agent_report.hashtag != undefined ? 
                                agent_report.hashtag.map((data) => (
                                    <a href={`/advanced-search?keyword=${data.tag.replace('#',"")}`}><span className="mr-1">{data.tag}</span></a>
                                ))
                            :
                                null
                        }
                        </p>

                    </div>

            </FormGroup>
            
            {
                "hidden_status" in props ? null :
                <div className="text-right">
                    <SelectLeader 
                        show        = {leaderModalState} 
                        setShow     = {toggle.leader}
                        agentRpt    = {agent_report} 
                        getAgentReportByStatusAll = {getAgentReportByStatusAll}
                    />
                    
                    <SelectWilayah 
                        data                = {agent_report} 
                        show                = {publicationModalState} 
                        index               = {index}
                        setShow             = {toggle.publication}
                        onSubmit            = {props.onSubmit} 
                        statePosition       = {statePosition}
                    />
                    { 
                        localStorage.getItem('role') == 'Verifikator Pusat' || localStorage.getItem('role') == 'Admin' ?
                            agent_report.status == 1 ? 
                                <UncontrolledButtonDropdown direction='left'>
                                    <Button 
                                        color       = "primary" size="sm" 
                                        onClick     = {toggle.publication} 
                                        className   = "btn-sm"
                                    >
                                        Tentukan Status
                                    </Button>
                                    <DropdownToggle 
                                        size    = "sm" 
                                        color   = "primary"
                                    >
                                        <MoreHorizontal size={14}/>
                                    </DropdownToggle>
                                    <DropdownMenu className='dropdown-toggle-split'>
                                        <DropdownItem 
                                            tag               = "a" 
                                            href              = "#"
                                            onClick           = {() => {toggle.leader()}} 
                                        >
                                            <User size        = {14}/>&nbsp;Teruskan Ke Pimpinan
                                        </DropdownItem>
                                        <DropdownItem 
                                            tag               = "a" 
                                            href              = "#"
                                            onClick           = {toggle.publication} 
                                        >
                                            <Globe size       = {14}/>&nbsp;Publikasikan
                                        </DropdownItem>
                                        <DropdownItem 
                                            tag               = "a" 
                                            href              = "#"
                                            onClick           = {() => {toggle.toArchive()}} 
                                        > 
                                            <Archive size     = {14}/>&nbsp;Arsipkan
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            :
                                'Menunggu Persetujuan Verifikator Daerah'
                        :
                            null
                    }

                    { 
                        localStorage.getItem('role') == 'Verifikator Daerah' || localStorage.getItem('role') == 'Admin Daerah'?
                            agent_report.status == 0 ? 
                                <UncontrolledButtonDropdown direction='left'>
                                    <Button 
                                        color       = "primary" size="sm" 
                                        onClick     = {toggle.publication} 
                                        className   = "btn-sm"
                                    >
                                        Tentukan Status
                                    </Button>
                                    <DropdownToggle 
                                        size    = "sm" 
                                        color   = "primary"
                                    >
                                        <MoreHorizontal size={14}/>
                                    </DropdownToggle>
                                    <DropdownMenu className='dropdown-toggle-split'>
                                        <DropdownItem 
                                            tag               = "a" 
                                            href              = "#"
                                            onClick           = {() => {toggle.leader()}} 
                                        >
                                            <User size        = {14}/>&nbsp;Teruskan Ke Pimpinan
                                        </DropdownItem>
                                        <DropdownItem 
                                            tag               = "a" 
                                            href              = "#"
                                            onClick           = {toggle.publication} 
                                        >
                                            <Globe size       = {14}/>&nbsp;Publikasikan
                                        </DropdownItem>
                                        <DropdownItem 
                                            tag               = "a" 
                                            href              = "#"
                                            onClick           = {() => {toggle.toArchive()}} 
                                        > 
                                            <Archive size     = {14}/>&nbsp;Arsipkan
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            :
                                'Menunggu Persetujuan Verifikator Daerah'
                        :
                            null
                    }
                </div>
            }

            {
                "method" in props ? null : <hr/>
            }
        </Fragment>
    );
};