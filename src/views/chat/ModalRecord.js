import { useContext, useState } from "react"
import { Search } from "react-feather"
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"
import { ModalBase } from "../../components/widgets/modals-base"
import { ChatContext } from "../../context/ChatContext"
import { Recorder } from 'react-voice-recorder'
import './record.scss'
import ChatApi from "../../services/pages/chat"

const ModalRecord = props => {

    const {
        show,
        setShow,
    } = props

    const { sendMessage } = useContext(ChatContext)

    const [audioDetails, setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: null,
            m: null,
            s: null,
        }
    })

    const handleAudioStop = (data) => {
        console.log(data)
        setAudioDetails({ audioDetails: data });
    }
    
    const handleAudioUpload = (file) => {

        const myFile = new File([file], 'rekaman.ogg', {
            type: file.type,
        });
        

        let data = new FormData();
        data.append("attachment[]", myFile);
    
        ChatApi.uploadAttachment({
          dataFile: data,
          onSuccess: (res) => {
            sendMessage("", [res[0].id])
            setShow(false);
          },
          onFail: (err) => {
            console.log(err)
          }
        })
    }

    const handleReset = () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: null,
                m: null,
                s: null,
            }
        }
        setAudioDetails({ audioDetails: reset });
    }



    return (
        <ModalBase show={show} setShow={() => { setShow(!show) }} title={"Kirim Pesan Suara"} size={"sm"} >
            <Recorder
                record={true}
                audioURL={audioDetails.url}
                showUIAudio
                handleAudioStop={data => handleAudioStop(data)}
                handleOnChange={(value) => handleOnChange(value, 'firstname')}
                handleAudioUpload={data => handleAudioUpload(data)}
                handleReset={() => handleReset()}
            />
        </ModalBase>
    )
}

export default ModalRecord