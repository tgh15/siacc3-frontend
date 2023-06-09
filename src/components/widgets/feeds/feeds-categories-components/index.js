import React, { useEffect, useRef, useState, useContext }   from 'react'
import { Button, Col, Row }                     from 'reactstrap'
import { Sliders }                              from 'react-feather'
import { ChevLeft }                             from './chevLeft';
import { ChevRight }                            from './chevRight';
import { FeedsCategoriesFilterModal }           from '../feeds-card-categories-filter'
import ContainerFluid                           from '../../fluid';
import { Fragment }                             from 'react';
import { useDispatch, useSelector }             from 'react-redux';
import { changeActiveCategories }               from '../../../../redux/actions/app/SetCategories';
import { focusToObject }                        from '../../../utility/Utils';
import { CategoryContext }                      from '../../../../context/CategoryContext';

var refs = [];

const CategoriesButton = ({ categories, setActive, id }) => {

    const selectors = useSelector(state => {
        const { FeedsCategoriesReducer } = state;
        return FeedsCategoriesReducer;
    })

    if (categories.id == selectors.activeCategories.id) {
        return (
            <li 
                id          = {id}
                className   = "nav-item"
            >
                <a 
                    onClick     = {() => {setActive(categories)}}
                    className   = "nav-link active" 
                >
                    {categories.name}
                </a>
            </li>
        )
    } else {
        return (
            <li 
                id          = {id}
                ref         = {refs[categories.id]} 
                className   = "nav-item"
            >
                <a 
                    onClick     = {() => {setActive(categories)}}
                    className   = "nav-link" 
                >
                    {categories.name}
                </a>
            </li>
        )
    }
}

export const FeedCategoriesWidget = (props) => {


    const { 
        modals,
        onFilter,
        isApproval, 
        activeFilter, 
        onChangeCategories,
    }                                           = props;
    
    const [activeFilterState,setActiveFilter]   = useState(activeFilter);
    const [filterModalState, setFiltModalState] = useState(false);

    const {category: feedsCategories}           = useContext(CategoryContext);

    let divRef                                  = useRef(null);
    const dispatch                              = useDispatch();

    const executeScroll = (offset) => {
        divRef.current.scrollLeft += offset;
    };

    useEffect(()=>{
        let filteredState = activeFilter == undefined ? true : ( activeFilter ? true : false);
        setActiveFilter(filteredState);
    },[activeFilter]);

    const activate = (category) => {
        console.log('active', category);
        dispatch(changeActiveCategories(category));
        onChangeCategories();
    }
    
    if (Array.isArray(feedsCategories)) {
        return (
            <div>
                <Row className="mx-0 " style={{ marginTop: "1em", marginBottom: "2em" }}>

                    {
                        (modals == null || modals == undefined) ? 
                            <FeedsCategoriesFilterModal
                                title           = "Filter"
                                showing         = {filterModalState} 
                                setShow         = {setFiltModalState} 
                                onFilter        = {(e)=>{onFilter(e)}}
                            />
                        : 
                            modals
                    }                    

                    <Col 
                        md  = {12} 
                        sm  = {12}
                        className = "px-0 d-flex align-items-center justify-content-between"
                    >
                        {
                            activeFilterState ? 
                                <Button
                                    id          = {'beranda_filter_button'} 
                                    color       = "primary" 
                                    onClick     = {() => {setFiltModalState(true)}} 
                                    className   = "btn-icon btn-sm mr-1"
                                >
                                    <Sliders size={14} />
                                </Button>
                            :
                                null
                        }
                        <ChevLeft
                            categories      = {feedsCategories}
                            executeScroll   = {executeScroll}
                            setCategories   = {(category) => {activate(category);}}
                        />
                        <Fragment>
                            <ul 
                                id              = {`category_filter`}
                                ref         = {divRef}
                                className   = "cat-menu-component nav nav-tabs mb-0" 
                            >
                                {
                                    Array.isArray(feedsCategories) ? 
                                        isApproval == undefined ? 
                                            feedsCategories.map((feedscategory, index) => {
                                                return (
                                                    <CategoriesButton
                                                        id              = {`category_filter_${index}`}
                                                        key             = {`cat-feeds-components-${feedscategory.id}`}
                                                        setActive       = {(category) => {activate(category)}} 
                                                        categories      = {feedscategory} 
                                                    />
                                                )
                                            })
                                        :
                                            (feedsCategories.filter((data, index) => data.id != 'selected_news')).map((feedscategory) => {
                                                return (
                                                    <CategoriesButton
                                                        id              = {`category_filter_${index}`}
                                                        key             = {`cat-feeds-components-${feedscategory.id}`}
                                                        setActive       = {(category) => {activate(category)}} 
                                                        categories      = {feedscategory} 
                                                    />
                                                )
                                            })

                                    : 
                                        null
                                }
                            </ul>
                        </Fragment>
                        <ChevRight
                            setActive       = {(category) => { activate(category); }} 
                            executeScroll   = {executeScroll}
                            categories      = {feedsCategories}
                        />
                    </Col>
                </Row>
            </div>

        )
    } else {
        return (
            <Row style={{ marginTop: "1em", marginBottom: "1em" }}>

            </Row>
        )
    }

}
