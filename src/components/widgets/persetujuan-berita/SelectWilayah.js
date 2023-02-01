import React, { useContext, useEffect, useState }       from 'react'
import { Globe, MapPin }                        from 'react-feather'
import { Button, FormGroup, Label, Spinner }    from 'reactstrap'
import { ModalBase }                            from '../modals-base'
import { selectThemeColors }                    from '@utils'

import Select                                   from 'react-select'
import { useSelector }                          from 'react-redux'

import WorkunitHelper                           from '../../../helpers/WorkunitHelper';
import UnitWorkListApi                          from '../../../services/pages/configuration/unit-work-list';
import CategoriesHelper                         from '../../../helpers/CategoriesHelper';
import { feedsCategoryAPI }                     from '../../../services/pages/feeds/categories';
import feedsAgentReportAPI                      from '../../../services/pages/feeds/agent-reports';       
import CustomToast                              from '../custom-toast'
import { PerformanceContext }                   from '../../../context/PerformanceContext'

export const SelectWilayah  = ({data,show,setShow,onSubmit, index, statePosition}) => {

    const [unit,setUnit]                                = useState(null);
    const [type,setType]                                = useState("");
    const [categories,setCategories]                    = useState(null);
    const [submitLoading, setSubmitLoading]             = useState(false);
    const [activeCategories,setActiveCategories]        = useState([]);

    const { workunitOptionsApproval }   = useContext(PerformanceContext);  

    const [agentUpdate,setAgentUpdate] = useState({
        agent_report_id : data.id,    
        kind            : null,
        category_id     : [],
        workunit_id     : []
    });

    function getUnitWork(){
        const promise = new Promise((resolve,reject)=>{
            UnitWorkListApi.get({
                params:{},
                onSuccess:(resp)=>{resolve(resp.data)},
                onFail:reject
            });
        });
        return promise;
    }

    function handlerUnitChange(e){
            let arr             = [];
            let datas; 
            let isDisable       = false;
            let isDisableAll    = false;

            e.map(v => {
                const {value,label} = v;

                if( value == "all"){
                    isDisable   = true;
                    arr         = [];
                    arr.push(0);
                }else if(value!="all"){
                    isDisableAll = true;
                    arr = [];
                }
            })
            
            if(isDisable){
                datas = unit.map(unitx=>{
                    if(unit.value=="all"){
                        return{
                            value:unitx.value,
                            label:unitx.label,
                        }
                    }else{
                        return{
                            ...unitx,
                            isdisabled:true,
                        }
                    }
                });

                setUnit(datas);
            }else if(isDisableAll){
                e.map( vmap => {
                    arr.push(vmap.value)
                });

                datas = unit.map(uni=>{
                    if(uni.value=="all"){
                        return{
                            ...uni,
                            isdisabled:true,
                        }
                    }else{
                        return {
                            value:uni.value,
                            label:uni.label,
                        }
                    }
                });
                setUnit(datas);
            }else{
                setUnit(null);
            }
            
            setAgentUpdate({...agentUpdate,workunit_id:arr});
            setTimeout(() => {
                console.log("agent",agentUpdate)
            }, 2000);
        }
    
    function handlerCategoriesGet(){

        const proms =  new Promise((resolve, reject) => {

            feedsCategoryAPI.getCategory().then(
                res => {
                    resolve(res.data.category);
                }
            ).catch(
                err => {
                    reject([]);
                }
            )
            
        });

        return proms;
    }

    const handleSubmit = ()=>{

        console.log(agentUpdate)
        
        if(localStorage.getItem('role') == "Verifikator Pusat" || localStorage.getItem('role') == "Admin"){
            if(agentUpdate.category_id.length > 0 && agentUpdate.kind != null && agentUpdate.workunit_id.length >0){
                setSubmitLoading(true);
                feedsAgentReportAPI.shareAgentReportByWorkunit(agentUpdate).then(
                    res => {
                        if(res.status === 200){
                            setShow()
                            onSubmit(index, statePosition)
                            CustomToast("success", "Penentuan Status Berhasil.")
                            setAgentUpdate({agent_report_id:data.id,    
                                kind        : null,
                                category_id : [],
                                workunit_id : []
                            })
                        }else{
        
                        }
                        setSubmitLoading(false);
        
                    }
                ).catch(
                    err => {
                        setSubmitLoading(false);
                    }
                )
            }else{
                CustomToast('danger', 'Masih Ada Kolom Belum Terisi');
            }
        }else{
            if(agentUpdate.category_id.length > 0 ){
                setSubmitLoading(true);
                feedsAgentReportAPI.shareAgentReportByWorkunit(agentUpdate).then(
                    res => {
                        if(res.status === 200){
                            setShow()
                            onSubmit(index, statePosition)
                            CustomToast("success", "Penentuan Status Berhasil.")
                            setAgentUpdate({agent_report_id:data.id,    
                                kind        : null,
                                category_id : [],
                                workunit_id : []
                            })
                        }else{
        
                        }
                        setSubmitLoading(false);
        
                    }
                ).catch(
                    err => {
                        setSubmitLoading(false);
                    }
                )
            }else{
                CustomToast('danger', 'Masih Ada Kolom Belum Terisi');
            }
        }
        
    }    

    useEffect(()=>{
        if(show){
            if(categories==null){
                handlerCategoriesGet().then(resp=>{
                    const cats = CategoriesHelper.toSelectVal(resp)
                    console.log(cats, 'test')
                    setCategories(cats)
                })
            }
        }
    },[show,categories]);

    useEffect(()=>{
        if(show){
            if(unit==null){
                getUnitWork().then(response_unit=>{
                    const {workunit}= response_unit
                    const unit_select_data = WorkunitHelper.unitToSelectVal(workunit)
                    setUnit(unit_select_data)
                })
            }
        }
    },[show,unit])

    useEffect(()=>{
        if(show && activeCategories.length == 0 ){

            const formData = {
                agent_report_id : data.id
            };

            feedsAgentReportAPI.detailAgentReport(formData).then(
                response_detail => {
                    if(response_detail.data == null || (response_detail.data.category==undefined || response_detail.data.category==null)){
                        setActiveCategories([])
                    }else{
                        const cats = CategoriesHelper.toSelectVal(response_detail.data.category)
                        console.log(cats, 'category')
                        let xdata = []
                        cats.map(
                            v => {
                            xdata.push(v.value)
                        })
                        
                        setAgentUpdate({
                            ...agentUpdate,
                            category_id:xdata
                        })

                        setActiveCategories(cats)
                    }
                }
            )

            // AgentReportApi.detail(data.id).then(response_detail=>{
            //     if(response_detail.data.category==undefined||response_detail.data.category==null){
            //         setActiveCategories([])
            //     }else{
            //         const cats = CategoriesHelper.toSelectVal(response_detail.data.category)
            //         setActiveCategories(cats)
            //     }
            // })
        }
    },[show])

    useEffect(() => {
        console.log(activeCategories)
    },[activeCategories])

    
    return(
        <ModalBase 
            show    = {show} 
            title   = "Tentukan Status" 
            unmount = {true}
            setShow = {setShow} 
        >
            {
                localStorage.getItem('role') == "Verifikator Pusat" || localStorage.getItem('role') == "Admin" ?
                    <FormGroup>
                        <Label>Jenis Berita</Label>
                        <p>
                            <Button
                                id      = {`select_national_kind_${index}`}
                                outline = { type !== "nasional" } 
                                onClick = { () => {
                                    setType('nasional')
                                    setAgentUpdate({
                                        ...agentUpdate,
                                        kind:2,
                                    })
                                }} 
                                size    = {"sm"} 
                                color   = "primary"
                            >
                                <Globe size={14}/> Nasional
                            </Button>&nbsp;

                            <Button 
                                id      = {`select_local_kind_${index}`}
                                onClick = { () => {
                                    setType('lokal')
                                    setAgentUpdate({
                                        ...agentUpdate,
                                        kind:1,
                                    })
                                }}  
                                size    = {"sm"} 
                                color   = "primary"
                                outline = { type !== "lokal"} 
                            >
                                <MapPin size={14}/> Lokal
                            </Button>
                        </p>
                    </FormGroup>
                :
                    null
            }
            <FormGroup>
                <Label>Kategori Berita</Label>
                <Select
                    id              = {`select_category_${index}`}
                    name            = 'colors'
                    value           = {activeCategories != null && activeCategories}
                    theme           = {selectThemeColors}
                    isMulti
                    options         = {categories == null ? [] : categories}
                    className       = 'react-select'
                    isClearable     = {false}
                    defaultValue    = {activeCategories != null && activeCategories}
                    classNamePrefix = 'select'
                    onChange        = {(data)=>{
                        let xdata = []
                        data.map(v=>{
                            xdata.push(v.value)
                        })
                        
                        setAgentUpdate({
                            ...agentUpdate,
                            category_id:xdata
                        })
                        setActiveCategories(data);
                    }}

                />
            </FormGroup>
            {
                localStorage.getItem('role') == "Verifikator Pusat" || localStorage.getItem('role') == "Admin" ?
                    <>
                        <FormGroup>
                            <blockquote className="blockquote pl-1 border-left-primary border-left-3">
                                Untuk tidak membatasi berita terpilih silahkan pilih "SEMUA WILAYAH" pada pilihan wilayah berikut.
                            </blockquote>
                        </FormGroup>
                        <FormGroup>
                            <Select
                                id               = {`select_workunit_${index}`}
                                name             = 'colors'
                                theme            = {selectThemeColors}
                                isMulti
                                options          = {workunitOptionsApproval}
                                onChange         = {handlerUnitChange}
                                className        = 'react-select'
                                isClearable      = {false}
                                classNamePrefix  = 'select'
                                isOptionDisabled = {(option) => option.isdisabled}
                            />
                        </FormGroup>
                    </>
                :
                    null
            }
            <FormGroup className="text-center">
                {
                    !submitLoading ?
                        <Button
                            id      = {`approval_button_${index}`}
                            size    = "sm" 
                            color   = "primary"
                            onClick = {() => {handleSubmit()}} 
                            outline 
                        >
                            Selesai
                        </Button>
                    :
                        <Button 
                            size    = "sm" 
                            color   = "primary"
                            outline 
                        >
                            <Spinner/>
                        </Button>

                }
            </FormGroup>
        </ModalBase>
    )
}