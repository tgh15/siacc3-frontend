import { createContext, useMemo, useState } from "react"

const BerandaFileContext = createContext(null)
const BerandaFileProvider = ({children})=>{
    const [attachments,setAttachments ] = useState([])

    const contextProviderMemo = useMemo(()=>({attachments,setAttachments}),[attachments,setAttachments])

    return <BerandaFileContext.Provider value={contextProviderMemo}>{children}</BerandaFileContext.Provider>
}

export {BerandaFileContext,BerandaFileProvider}