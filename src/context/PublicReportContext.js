import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import PublicReportApi from "../services/pages/public-report";
import UserManagementApi from "../services/pages/configuration/user-management"

const PublicReportContext = createContext(null)

const PublicReportProvider = ({ children }) => {

    // states
    const [listData, setListData] = useState(false)
    const [banners,setBanners] = useState([])
    const [dataSelected,setDataSelected] = useState(null)
    const [leaders,setLeaders] = useState([])
    // refs
    const keyword = useRef(null)

    const setKeyword = (value) => {
        keyword.current = value;
    }

    const getBanner = () => {
        setBanners(false)
        PublicReportApi.getBaner({
            onSuccess: (res) => {
                setBanners(res.data);
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    const getLeader = () => {
        UserManagementApi.list({
            onSuccess : (res) => {
                setLeaders(res.filter(opt => opt.user_group[0].name == "Pimpinan Pusat"))
            },onFail : (err) =>{
                console.log(err);
            }
        })
    }

    const getData = (order) => {

        setListData(false)
        PublicReportApi.get({
            keyword: keyword.current,
            orderBy : order ?? "asc",
            onSuccess: (res) => {
                setListData(res.data);
            },
            onFail: (err) => {
                console.log(err)
            }
        })
    }

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        getBanner()
        getLeader()
    },[])

    return <PublicReportContext.Provider
        value={{
            listData,
            setListData,
            setKeyword,
            getData,
            dataSelected,
            setDataSelected,
            banners,
            setBanners,
            getBanner,
            leaders
        }} >{children}</PublicReportContext.Provider>
}

export { PublicReportContext, PublicReportProvider }