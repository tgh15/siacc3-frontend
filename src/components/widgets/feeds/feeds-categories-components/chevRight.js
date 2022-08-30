import React                    from 'react'
import { ChevronRight }         from 'react-feather';
import { useSelector }          from 'react-redux';

import { Button }               from "reactstrap";

export const ChevRight = ({categories, setActive, executeScroll}) => {

    const {activeCategories:activeCategory} = useSelector(state => {return state.FeedsCategoriesReducer})

    let currentIndex  = 0;

    categories.map((value,catIndex) => {
        if(value.id === activeCategory.id){
            currentIndex = catIndex;
        }
    });

    const nextIndex = currentIndex+1;
    if( currentIndex+1 < categories.length || activeCategory.id == "all"){
        return (
            <div>
                <Button 
                    color       = "primary" 
                    onClick     = {() => {
                        executeScroll(+100)
                        // setActive(categories[nextIndex]);
                    }} 
                    className   = "btn-icon rounded-circle btn-sm"
                >
                    <ChevronRight size={14}/>
                </Button>
            </div>
        )
    }else{
        return(
            <div>
            <Button  
                color       = "primary" 
                className   = "btn-icon rounded-circle btn-sm"
                onClick     = {() => executeScroll(+100)}
            >
                <ChevronRight size={14}/>
            </Button>
        </div>
        )
    }
}