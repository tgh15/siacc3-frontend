import React, { createContext, useState, useEffect, useMemo }  from 'react';
import { workunitAPI }                                         from '../services/pages/configuration/workunit';

export const WorkunitContext    = createContext();

export const WorkunitProvider   =  ({ children }) => {

    const [workunit, setWorkunit]       = useState([]);

    const providerWorkunit              = useMemo(() => ({ workunit, setWorkunit }), [workunit, setWorkunit]);

    const getWorkunitListAPI = () => {
        workunitAPI.getWorkunitList().then(
            res => {  
                if(res.status === 200){
                    if(res.data != null){
                        setWorkunit(res.data);
                    }
                }                  
            },
            err => {
                console.log('workunitContext', err);
            }
        );
    };

    useEffect(() => {
        getWorkunitListAPI();

        return(() => {
            setWorkunit([]);
        });
    },[]);

    return (
        <WorkunitContext.Provider value={providerWorkunit}>
            {children}
        </WorkunitContext.Provider>
    );
};