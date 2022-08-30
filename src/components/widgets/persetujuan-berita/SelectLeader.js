import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Col, CustomInput, FormGroup, Row, Spinner } from 'reactstrap'
import PositionApi from '../../../services/pages/configuration/position'
import feedsAgentReportAPI from '../../../services/pages/feeds/agent-reports'
import AgentReportApi from '../../../services/pages/feeds/agent-reports'
import CustomToast from '../custom-toast'
import { ModalBase } from '../modals-base'
import SelectMultipleUser from '../select-multiple-user'
import SelectMultipleLeader from '../select-multiple-user/leader'
import CheckboxLeader from './CheckboxLeader'

const get_position = (page)=>{
    const promise = new Promise((resolve,reject)=>{
        PositionApi.get({
            params:{page:page},
            onSuccess:resolve,
            onFail:reject,
        })
    })
    return promise
}

export const SelectLeader = ({show,setShow,agentRpt, getAgentReportByStatusAll})=>{

    function handleSubmit(val){
        if(val.length > 0){

            const formData = {
                position_id     : val,
                agent_report_id : agentRpt.id
            };

            feedsAgentReportAPI.shareAgentReportByPosition(formData).then(
                res => {
                    CustomToast("success","Berhasil meneruskan Berita")
                    setShow()
                    getAgentReportByStatusAll(1);
                }
            )

        }else{
            CustomToast("danger","Pilih salah satu pimpinan terlebih dahulu ")
        }
    }

    return(
        <SelectMultipleLeader
            show        = {show}
            title       = "Pilih Pimpinan"
            setShow     = {(par) => setShow(par)}
            onSelect    = {(par) => { handleSubmit(par) }}
            titleButton = "Selesai"
        />
    )
}