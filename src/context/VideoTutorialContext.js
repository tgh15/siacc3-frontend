import {createContext} from 'react'
import { videoTutorAPI } from '../services/pages/configuration/user-preferences/video-tutorial'

export const VideoTutorialContext = createContext()

const VideoTutorialContextProvider = (props) => {

    const getListVideoViewer = () => {
        videoTutorAPI.getListVideoViewer("Admin Daerah")
            .then(res => {
                console.log(res)
            })
        

    }

    return (
        <VideoTutorialContext.Provider value={{getListVideoViewer}}>
            {props.children}
        </VideoTutorialContext.Provider>
    )
}

export default VideoTutorialContextProvider