import React, { createContext, useState, useEffect, useMemo }  from 'react';
import { feedsCategoryAPI }                                    from '../services/pages/feeds/categories';
// import { error_handler }                                       from '../utils/error_handler';

export const CategoryContext    = createContext();

export const CategoryProvider   = ({ children }) => {

    const [category, setCategory]       = useState([]);

    const providerCategory              = useMemo(() => ({ category, setCategory }), [category, setCategory]);

    const getCategoryAPI = () => {
        feedsCategoryAPI.getCategory().then(
            res => {                    
                if("category" in res.data && res.data.category != null){
                    console.log(res.data.category);
                    //Add all category to list
                    res.data.category.unshift(
                        {
                            id   : "all",
                            name : "Semua"
                        },
                        {
                            id   : "selected_news",
                            name : "Berita Pilihan"
                        }
                    )

                    setCategory(res.data.category);
                }
            },
            err => {
                // error_handler(err, 'category');
                console.log('category',err);
            }
        );
    };

    useEffect(() => {
        getCategoryAPI();

        return(() => {
            setCategory([]);
        })
    },[]);

    return (
        <CategoryContext.Provider value={providerCategory}>
            {children}
        </CategoryContext.Provider>
    );
};