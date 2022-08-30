import React            from 'react'

import { Button }       from "reactstrap"
import { ChevronLeft }  from "react-feather"
import { useSelector }  from 'react-redux'

export const ChevLeft = ({categories, setCategories, executeScroll}) => {

    const {activeCategories} = useSelector(state => {return state.FeedsCategoriesReducer})
    
    return(
        <div className="text-center">
            {
                activeCategories.id != "all" ? 
                
                    <Button
                        color       = "primary" 
                        onClick     = {() => {
                            executeScroll(-100)

                            // let  before = 0;
                            // categories.map((val,index)=>{
                            //     if(activeCategories.id==val.id){
                            //         before = index-1;
                            //     }
                            // });

                            // const nextCat = categories[before];
                            // setCategories(nextCat);
                        }} 
                        className   = "btn-icon rounded-circle btn-sm mr-2"
                    >
                        <ChevronLeft size={14}/>
                    </Button>
                :
                    <Button 
                        color       = "primary" 
                        className   = "btn-icon rounded-circle btn-sm mr-2"
                        onClick     = {() => {
                            executeScroll(-100)
                        }}
                    >
                        <ChevronLeft size={14} />
                    </Button>
            }
        </div>
    )
}