import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DriveApi from "../services/pages/drive";
import { handleMenuHidden } from '../redux/actions/layout'
import FullScreenHandle from '../views/file-manager/fullScrenManager'

const FileManagerContext = createContext(null)

const FileManagerProvider = ({ children }) => {
    
    const [menuActive, setMenuActive] = useState("all")
    const [listData, setListData] = useState(false)
    const [apiActive, setApiActive] = useState("")
    const dispatch = useDispatch()
    const [fullScreen, setFullscreen] = useState(false)
    const [dataSelected, setDataSelected] = useState(null)
    const [dataDetail, setDataDetail] = useState(null)
    const [tags, setTags] = useState(null)
    const [tagSelected, setTagSelected] = useState(null)
    const [dataBreadcums,setDataBreadcums] = useState([])
    const [uploadProgressSidebarOpen, setUploadProgressSidebarOpen] = useState(false)
    const [progressData,setProgressData] = useState([])
    const [shareSelected,setShareSelected] = useState([])
    const [users,setUsers] = useState([])
    const [selectedRows,setSelectedRows] = useState([])
    const [selectedAllRows,setSelectedAllRows] = useState(false)

    const toggleUploadProgressSidebar = () => setUploadProgressSidebarOpen(!uploadProgressSidebarOpen)

    const getData = (path) => {
        setListData(false)
        DriveApi.get({
            path: path,
            onSuccess: (res) => {
                setListData(res)
            }, onFail: (err) => {
                console.log(err)
            }
        })
    }

    const handlerFullScren = () => {
        const fsMode = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

        if (fsMode) {
            setFullscreen(false)
            FullScreenHandle(true)

        } else {
            FullScreenHandle(false)
            setFullscreen(true)
        }
        const navbar = document.getElementsByClassName("header-navbar")
        if (fullScreen) {
            dispatch(handleMenuHidden(false))
            navbar[0].style.display = ''
            navbar[0].style.position = "fixed"
        } else {
            dispatch(handleMenuHidden(true))
            navbar[0].style.display = "none"
        }
    }

    const setUrlApiActive = (url) => {
        setApiActive(url)
        getData(url)
        setSelectedRows([])
        setSelectedAllRows(false)
    }

    const setBreadcums = ({type,name,url}) => {
        if(type == "create"){
            setDataBreadcums([{name : name,url:url}])
        }else{
            setDataBreadcums([...dataBreadcums,{name:name,url : url}])
        }
    }

    const getUser = () => {
        DriveApi.user({
            onSuccess : (res) => {
                setUsers(res)
            },
            onFail : (err) => {
                console.log(err)
            }
        })
    }

    useEffect(() => {
        getUser()
    },[])

    return <FileManagerContext.Provider
        value={{
            menuActive,
            setMenuActive,
            listData,
            setListData,
            getData,
            setUrlApiActive,
            apiActive,
            handlerFullScren,
            fullScreen,
            dataSelected,
            setDataSelected,
            dataDetail,
            setDataDetail,
            tags,
            setTags,
            tagSelected,
            setTagSelected,
            dataBreadcums,
            setDataBreadcums,
            setBreadcums,
            uploadProgressSidebarOpen,
            toggleUploadProgressSidebar,
            setUploadProgressSidebarOpen,
            progressData,
            setProgressData,
            users,
            shareSelected,
            setShareSelected,
            selectedRows,
            setSelectedRows,
            selectedAllRows,
            setSelectedAllRows
        }} >{children}</FileManagerContext.Provider>
}

export { FileManagerContext, FileManagerProvider }

