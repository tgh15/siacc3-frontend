import { useContext, useState } from "react"

//Component
import { Recorder }     from 'react-voice-recorder'
import { ModalBase }    from "../../components/widgets/modals-base"
import { ChatContext }  from "../../context/ChatContext"

//SCSS
import './record.scss'

//Service
import ChatApi          from "../../services/pages/chat"

const ModalRecord = props => {

    const {
        show,
        setShow,
    } = props

    const { sendMessage } = useContext(ChatContext)

    const [loading, setLoading]           = useState(false);
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

    const audioUpload = (file) => {
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
            setLoading(false);
          },
          onFail: (err) => {
            console.log(err)
          }
        })
    };

    const handleAudioStop = (data) => {
        setAudioDetails({ audioDetails: data });
    }
    
    const handleAudioUpload = (file) => {
        setLoading(true);

        audioUpload(file);
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
                uploadButtonDisabled={loading}
            />
        </ModalBase>
    )
}

export default ModalRecord