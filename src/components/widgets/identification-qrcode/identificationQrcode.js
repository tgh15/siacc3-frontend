import { Fragment, useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { WebsocketURL } from "../../../configs/socket";
import QRCode from 'qrcode';


const IdentificationQrcode = props => {
    const [socketStatus, setSocketStatus] = useState(false);
    const [encryptedText, setEncryptedText] = useState(null);
    const [socketDigitalIdentification, setSocketDigitalIdentification] = useState();

    useEffect(() => {
        //Socket
        if (socketStatus === false) {
            console.log(props.uuid);
            const websocketDI = new WebSocket(WebsocketURL.digitalIdSocket(props.uuid_user));
            setSocketDigitalIdentification(websocketDI);
        }

        return () => {
            if (socketDigitalIdentification != null) {
                socketDigitalIdentification.close(1000, "complete");
            }
        };

    }, []);

    if (socketDigitalIdentification != null) {

        socketDigitalIdentification.onopen = function (e) {
            setSocketStatus(true);

            let socketMessage = {
                type: 'digital-id-encrypt',
                is_secure: true,
                token: localStorage.getItem('token'),
                payload: {
                    uuid: props.uuid_user
                }
            };

            socketDigitalIdentification.send(JSON.stringify(socketMessage));
        };

        socketDigitalIdentification.onmessage = function (event) {
            let res = JSON.parse(event.data);

            if (res.type == "digital-id-encrypt") {

                if (res.status == 200) {
                    // console.log(res);
                    if (encryptedText == null) {
                        // alert('QR Code berhasil dibuat.');
                    } else {
                        // alert('QR Code telah berubah.');
                    }
                    QRCode.toDataURL(`${process.env.REACT_APP_DIGITAL_IDENTIFICATION}`+'/'+res.encrypted_text, { errorCorrectionLevel: 'H' }, function (err, url) {
                        setEncryptedText(url);
                    });
                }
            }
        };

        socketDigitalIdentification.onclose = function (e) {
            console.log('complete socketDigitalIdentification');
        };
    }


    return (
        <Fragment>
            {
                encryptedText != undefined ?
                    <img src={encryptedText} alt="qrcode" style={{ width: props.width }} /> :
                    <Spinner
                        size    = "md"
                        color   = "primary"
                    />
            }
        </Fragment>
    )
}


export default IdentificationQrcode;