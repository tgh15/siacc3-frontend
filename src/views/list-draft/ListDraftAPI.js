import React, { Fragment, useState, useEffect } from 'react';
import moment                                   from 'moment';

//API
import { feedsDraftAPI }                        from '../../services/pages/feeds/list-draft';

//Component
import ListDraft                                from './ListDraft';
import FormDelete                               from '../../components/widgets/form-delete/FormDelete';
import CustomToast                              from '../../components/widgets/custom-toast';
import SubmitDiscussion                         from '../../components/widgets/feeds/submit-discussion';
import Helper from '../../helpers';


const ListDraftAPI = () => {
    //State
    const [loading, setLoading]                         = useState(false);
    const [filter, setFilter]                           = useState(null);
    const [listDraft, setListDraft]                     = useState([]);
    const [pagination, setPagination]                   = useState(null);
    const [basicModal, setBasicModal]                   = useState(false)
    const [selectedId, setSelectedId]                   = useState(null);
    const [selectedEdit, setSelectedEdit]               = useState(null);
    const [showEditForm, setShowEditForm]               = useState(false);
    const [selectedShare, setSelectedShare]             = useState(null);
    const [showDeleteForm, setShowDeleteForm]           = useState(false);
    const [filterListDraft, setFilterListDraft]         = useState([]);
    const [AvaiableShareAll, setAvaiableShareAll]       = useState(false);
    const [showDiscussionForm, setShowDiscussionForm]   = useState(false);

    useEffect(() => {
        if(filter == null){
            getDraftAPI();
        }else{
            if(filter.type == 'text'){
                handleFilter();
            }
        }
    }, [filter]);
    
    //Get list draft
    const getDraftAPI = (page = 1) => {

        const params = {
            uuid : Helper.getUserData().uuid,
            page : page
        }
        setLoading(true);

        feedsDraftAPI.getListDraft(params).then(
            res => {
                if(!res.is_error){
                    if (res.status === 200 && res.data != null) {
                        setLoading(false);
                        setListDraft(res.data.result);
                        setPagination(res.data.pagination)
                        setFilterListDraft(res.data.result); 
                    }else{
                        setListDraft([]);
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        )
    };

    //Filter date
    const handleFilter = () => {
        if(filter != null){
            let filter_ = [];
            if(filter.type === "date"){
                filter_ = listDraft.filter((data) => (
                    moment(data.updated_at).format('YYYY-MM-DD')=== moment(filter.value[0]).format('YYYY-MM-DD')
                ));
            }else{
                if(filter.value.length > 0){
                    filter_ = listDraft.filter((data) => (
                        data.title.toLowerCase().includes(filter.value)
                    ));
                }else{
                    filter_ = listDraft;
                }
            }

            setBasicModal(false);
            setFilterListDraft(filter_);
        }else{
            setFilterListDraft(listDraft);
        }
    };

    //Process attachment
    const processAttachment = (data, type) => {
        let attachment = [];

        if (data != null && data.length > 0) {
            attachment = data.filter((data) => (
                data.type === type
            ))
        }

        return attachment;
    };

    //Delete list draft
    const onDelete = () => {
        feedsDraftAPI.deleteListDraft(selectedId).then(
            res => {
                if(!res.is_error){
                    if (res.status === 200) {
                        setLoading(true);
                        setListDraft(false);
                        setShowDeleteForm(false);
    
                        //Success Message
                        CustomToast('success', 'Data Berhasil di hapus');
    
                        //Refresh List Draft
                        getDraftAPI();
                    }
                }else{
                    CustomToast('danger', res.message);
                }
            },
            err => {
                CustomToast('danger', err.message);
            }
        )
    };

    const handleShare = (id) => {
        setSelectedShare(id);
        setShowDiscussionForm(true);
    };

    return (
        <Fragment>
            <SubmitDiscussion
                type             = "draft"
                dataNews         = {selectedShare}
                discussion       = {showDiscussionForm}
                toggleDiscussion = {() => setShowDiscussionForm(!showDiscussionForm)}
            />

            <FormDelete
                show        = {showDeleteForm}
                title       = "Hapus Draft"
                setShow     = {(par) => setShowDeleteForm(par)}
                loading     = {loading} 
                onDelete    = {onDelete}
                description = "Draft"
            />

            <ListDraft
                //State
                filter              = {filter}
                loading             = {loading}
                setFilter           = {setFilter}
                listDraft           = {listDraft}
                pagination          = {pagination}
                showEditForm        = {showEditForm}
                selectedEdit        = {selectedEdit}
                setSelectedId       = {setSelectedId}
                setSelectedEdit     = {setSelectedEdit}
                setShowEditForm     = {setShowEditForm}
                filterListDraft     = {filterListDraft}
                AvaiableShareAll    = {AvaiableShareAll}
                setShowDeleteForm   = {setShowDeleteForm}
                setFilterListDraft  = {setFilterListDraft}
                setAvaiableShareAll = {setAvaiableShareAll}

                //Function
                onDelete            = {onDelete}
                getDraftAPI         = {getDraftAPI}
                handleShare         = {handleShare}
                basicModal          = {basicModal}
                setBasicModal       = {setBasicModal}
                handleFilter        = {handleFilter}
                processAttachment   = {processAttachment}
            />
        </Fragment>
    );
};

export default ListDraftAPI;