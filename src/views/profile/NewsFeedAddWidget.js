
import { useState }                 from "react";
import { Link, Image, File }        from "react-feather"; 
import { Button, Card, CardBody }   from "reactstrap";

import { ModalBase }                from "@components/modals-base";
import RowAvatarWidget              from "@components/rw-avatar";

import { AddBeritaFormComponent }   from "./form_component";


export const NewsFeedAddWidget = () => {
    //State
    const [showmodal ,showModaldata] = useState(false);

    return(
        <Card>
            <CardBody>
                <ModalBase 
                    show    = {showmodal} 
                    title   = {"Buat Postingan Berita"}
                    setShow = {(par) => {showModaldata(par)}} 
                >
                    <div className="container-fluid">
                        <AddBeritaFormComponent/>
                    </div>
                </ModalBase>
                <div 
                    style       = {{paddingTop:"1em"}}
                    className   = "container-fluid" 
                >
                    <div className="row">
                        <RowAvatarWidget/>

                        <div className='col'>
                            <div 
                                onClick     = {() => {showModaldata(true)}} 
                                className   = "form-control"
                            >
                                <span className="text-muted">
                                    Tulis Berita anda...
                                </span>
                            </div>
                        </div>
                    </div>
                    <div 
                        style       = {{marginTop:"1em"}}
                        className   = "row justify-content-center" 
                    >
                        
                        <div className="col text-center">
                            <Button 
                                color       = "" 
                                className   = "btn-icon"
                            >
                                <Image/><br/>
                                <small>Album</small>
                            </Button>
                        </div>
                        <div className="col text-center">
                            <Button color="">
                                <Link/><br/>
                                <small>Tautan</small>
                            </Button>
                        </div>
                        <div className="col text-center">
                            <Button color="">
                                <File/><br/>
                                <small>Berkas</small>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};