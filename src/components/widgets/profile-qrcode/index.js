import { Fragment }         from "react";
import { useSkin }          from '@hooks/useSkin';
import { Card, CardBody }   from "reactstrap";

//Assets
import ImageRounded         from "../image-rounded";
import LogoKejaksaan        from "@src/assets/images/logo/kejaksaan.png";
import defaultAvatar        from "@src/assets/images/portrait/small/150x150.png";

//Css
import "./index.scss";

//Components
import IdentificationQrcode from "../identification-qrcode/identificationQrcode";


const ProfileQrCode = ({ data }) => {
    const [skin, setSkin] = useSkin();
    const illustration = skin === 'dark' ? 'bg-profile11.png' : 'bg-profile.jpg',
        source = require(`@src/assets/images/bg/${illustration}`).default

    return (
        <Fragment>
            <Card 
                style     ={{ backgroundImage: `url(${source})` }}
                className = "profile-qrcode text-center"
            >
                <CardBody className="px-0">
                    <div className="logo-mask">
                        <ImageRounded 
                            src    = {LogoKejaksaan} 
                            width  = {45} 
                            height = {44}
                        />
                    </div>
                    <div className="card-name">
                        <small>KEJAKSAAN AGUNG RI</small>
                        <p style={{ fontSize: "14px", marginBottom: "0px" }}>
                            {data.name}
                        </p>
                        <small>
                            NIP : {data.identity_id}
                        </small>
                    </div>
                    <div className="mt-1">
                        <ImageRounded src={data.photo != "" ? data.photo : `https://ui-avatars.com/api/?name=${data ? data.name : "UN"}&background=4e73df&color=fff&bold=true`} width={75} />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <span className="mt-4">
                            {data.workunit}
                        </span>
                        <br/>
                        <span className="font-weight-bolder">
                            {data.sector}
                        </span>
                    </div>
                    
                    <div 
                        style     = {{ marginTop: "10px" }}
                        className = "mt-2" 
                    >
                        <IdentificationQrcode
                            width       = "100px"
                            uuid_user   = {data.uuid_user} 
                        />
                    </div>
                    <Card >
                        <CardBody style={{ backgroundColor: "#558937", paddingTop: "5px", borderRadius: "5px" }}>

                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
        </Fragment>
    )
};

export default ProfileQrCode;