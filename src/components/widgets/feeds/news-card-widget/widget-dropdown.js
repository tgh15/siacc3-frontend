import React, { useEffect } from 'react';

import { useState } from "react";

import {
        Hash, 
        Star,
        Users,
        Bookmark, 
        CheckSquare,
        MoreVertical,
        Printer, 
    } from "react-feather";
import Trophy                   from '../../../../assets/icons/trophy.svg';

import { 
        DropdownItem, 
        DropdownMenu, 
        ButtonDropdown, 
        DropdownToggle,
    }                           from "reactstrap";


import SubmitDiscussion         from '../submit-discussion';

export const DropDownItemWithIcon = ({Icon,text,subText,onClick,Img,id})=>{
    return(
        <DropdownItem
            id      = {id}
            style   = {{width:"100%"}} 
            onClick = {onClick}
        >
            <div className="media" >
                <div style={{marginRight:"16px"}}>
                    {
                        Icon != undefined ?
                            <Icon size={22}/>
                        :
                            Img
                    }
                </div>
                <div className="media-body">
                    <h6 className="mb-0">
                        {text} 
                    </h6>
                    <small className="text-muted">
                        {subText}
                    </small>
                </div>
            </div>
        </DropdownItem>
    )
}
export const WidgetChildDropdown = (props)=>{

    const {index}                           = props;

    const [saved,setsaved]                  = useState(props.saved)
    const [discussion,setDiscussion]        = useState(false)
    const [dropdownOpen,setDropdownOpen]    = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    useEffect(()=>{
        setsaved(props.saved)
    },[props, props.selectedCheck])

    const toggleDiscussion = () => {
        setDiscussion(!discussion);
    }
    return(
        <ButtonDropdown 
            isOpen  = {dropdownOpen}
            toggle  = {toggleDropdown}
        >
            <SubmitDiscussion
                dataNews         = {props.dataNews}
                discussion       = {discussion}
                toggleDiscussion = {toggleDiscussion}
            />
            <DropdownToggle color id={`more_option_${props.index}`}>
                <MoreVertical size={14}/>
            </DropdownToggle>
            <DropdownMenu>
                <DropDownItemWithIcon
                    id      = {`submit_discussion_option_${index}`}
                    Icon    = {Users} 
                    text    = "Ajukan Pembahasan"
                    subText = "Teruskan berita ke grup untuk dibahas"
                    onClick = {() => {toggleDiscussion()}}
                />
                {
                    localStorage.getItem('role') === 'Pimpinan Pusat' || localStorage.getItem('role') === 'Verifikator Pusat' || localStorage.getItem('role') === 'Analis Direktorat' ? 
                        props.selectedCheck ?
                            props.self_selected_check ?
                                <DropDownItemWithIcon
                                    id      = {`cancel_selected_news_option_${index}`}
                                    Icon    = {CheckSquare} 
                                    text    = {"Batalkan Berita Pilihan"}
                                    onClick = {() => {props.cancelFromSelected(props.dataNews)}}
                                    subText = "Batalkan ini ke berita pilihan"
                                />
                            :
                                null
                        :
                            <DropDownItemWithIcon
                                id      = {`selected_news_option_${index}`}
                                Icon    = {CheckSquare} 
                                text    = {"Jadikan Berita Pilihan"}
                                onClick = {() => {props.changeToSelected(props.dataNews)}}
                                subText = "Jadikan ini ke berita pilihan"
                            />
                    :
                        null
                }
                
                <DropDownItemWithIcon
                    id      = {`saved_news_option_${index}`}
                    Icon    = { Bookmark } 
                    text    = { saved ? "Batalkan Simpan Berita" : "Simpan Berita" } 
                    onClick = { () => { props.setSaved()} }
                    subText = "Simpan ini ke berita tersimpan"
                />

                <DropDownItemWithIcon
                    id      = {`generate_news_option_${index}`}
                    Icon    = { Printer }
                    text    = "Generate Berita"
                    onClick = {() => {props.setShowExportForm()}}
                    subText = "Mengkonversi Berita Ke PDF."
                />

                {
                    localStorage.getItem('role') === 'Pimpinan Pusat' ? 
                        <DropDownItemWithIcon
                            id      = {`trophy_news_option_${index}`}
                            Img     = {<img src={Trophy} height={22} width={22}/>} 
                            text    = "Berikan Trophy"
                            onClick = {() => { props.setShowTrophyForm(true)}}
                            subText = "Berikan berita ini trophy"
                        />
                    :
                        null
                }

                <DropDownItemWithIcon
                    id      = {`rating_news_option_${index}`}
                    Icon    = {Star} 
                    text    = "Detail Rating"
                    onClick = {() => { props.setShowRatingForm(true); props.getRatingByAgentReport()}}
                    subText = "Menampilkan jumlah rating"
                />
                {
                    props.hashtag != undefined && localStorage.getItem('role') === 'Verifikator Pusat'? 
                        <DropDownItemWithIcon
                            id      = {`rating_news_option_${index}`}
                            Icon    = {Hash} 
                            text    = "Ubah Hashtag"
                            onClick = {() => { props.setShowHashtagForm(true)}}
                            subText = "Mengubah hashtag"
                        />
                    :
                        null
                }
            </DropdownMenu>
        </ButtonDropdown>
    )
}