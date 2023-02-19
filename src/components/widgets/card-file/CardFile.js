import React,{Fragment}         from 'react';
import { File }                 from 'react-feather';
import {FormGroup, Button}      from 'reactstrap';
import FileSaver                from "file-saver";



const CardFile = ({item}) => {

    return(
        <Fragment>
            <FormGroup>
                {
                    Array.isArray(item) && item.length > 0 &&
                    <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>
                        Dokumen:
                    </p>
                }
                {
                    Array.isArray(item) ? item.map((v) => {
                        return (
                            <Button 
                                key         = {`identity-${v.attachment_id}`}
                                color       = "none"
                                className   = "p-0"
                            >
                                
                                <div style={{ background: '#e7fae8', borderRadius: '10px', whiteSpace: 'nowrap', display: 'inline-table', color: '#4c8865', padding: '15px', marginRight: '10px'}}>
                                    <File 
                                        size        = {20} 
                                        className   = "mr-1"
                                    />
                                    {
                                        typeof v.attachment.name == 'string' ?
                                            <a onClick={() => {FileSaver.saveAs(new Blob([v.attachment]), v.Name)}}>
                                                {v.Name}
                                            </a>
                                        :
                                            <a href={v.attachment}>
                                                {v.Name}
                                            </a>

                                    }
                                </div>
                            </Button>
                        )
                    }) : null
                }
            </FormGroup>
    </Fragment>
    );
};

export default CardFile;