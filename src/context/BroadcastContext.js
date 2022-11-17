import { useEffect, useState }          from "react";
import { createContext }                from "react";
import CustomToast                      from "../components/widgets/custom-toast";
import { WebsocketURL }                 from "../configs/socket";
import broadcastAPI                     from "../services/pages/broadcast";
import Helper                           from "../helpers";


const BroadcastContext = createContext(null)


const BroadcastProvider = ({ children }) => {

    const [broadcast, setBroadcast]                         = useState(null);
    const [broadcastCount, setBroadcastCount]               = useState(0);
    const [socketBroadcast, setSocketBroadcast]             = useState(null);
    const [broadcastSelected, setBroadcastSelected]         = useState(null);
    const [modalDetailBroadcast, setModalDetailBroadcast]   = useState(false)
    const [socketBroadcastStatus, setSocketBroadcastStatus] = useState(null);

    const {
        getUserData
    }                                                       = Helper;
    
    if (socketBroadcast != null) {
        socketBroadcast.onopen = function (e) {
            setSocketBroadcastStatus(true);
        };

        socketBroadcast.onmessage = function (event) {
            let res = JSON.parse(event.data);

            if (res.status === 201 && res.type === "communication-message-broadcast") {

                CustomToast('success', 'Pesan siaran berhasil terkirim');
                getBroadcast();
            }
        };

        socketBroadcast.onclose = function (e) {
            console.log('complete socketBroadcast');
        };
    }

    const getBroadcast = () => {
        return broadcastAPI.getBroadcast().then(
            (res) => {
                if (res.status === 200 && res.data != null) {
                    setBroadcast([...res.data]);

                    let _data = res.data.filter((data) => (
                        data.is_read === false
                    ));
                    setBroadcastCount(_data.length);
                } else {
                    setBroadcast([]);
                }
            }, err => {
                console.log(err);
            }
        );
    }

    const readBroadcast = (id) => {
        const formData = {
            id: id
        };

        return broadcastAPI.readBroadcast(formData).then(
            (res) => {
                if (res.status === 200) {
                    getBroadcast();
                    if (broadcastCount > 0) {
                        setBroadcastCount(broadcastCount - 1);
                    }
                }
            }, err => {
                console.log(err);
            }
        );
    }

    


    // use Effect
    useEffect(() => {
        if (getUserData().uuid) {
            getBroadcast();
            const websocket = new WebSocket(WebsocketURL.broadcastSocket(getUserData().uuid));
            setSocketBroadcast(websocket);
        }


        return () => {
            if (socketBroadcast != null) {
                socketBroadcast.close(1000, "complete");
            }

            return(() => {
                setBroadcast(null)
                setBroadcastCount(0)
                setSocketBroadcast(null)
                setBroadcastSelected(null)
                setModalDetailBroadcast(false)
                setSocketBroadcastStatus(null)
            })
        };
    }, []);

    return <BroadcastContext.Provider
        value={{
            broadcastCount,
            setBroadcastCount,
            broadcast,
            setBroadcast,
            broadcastSelected,
            setBroadcastSelected,
            readBroadcast,
            socketBroadcast,
            modalDetailBroadcast,
            setModalDetailBroadcast
        }}> {children} </BroadcastContext.Provider>
}

export { BroadcastContext, BroadcastProvider };


