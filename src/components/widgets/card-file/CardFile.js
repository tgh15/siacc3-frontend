import React,{Fragment}         from 'react';
import { File }                 from 'react-feather';
import {FormGroup, Button}      from 'reactstrap';


const CardFile = ({item}) => {
    return(
        <Fragment>
            <FormGroup>
                <p style={{ fontWeight: 'bold', margin: '0px', textAlign: 'left' }}>
                    Dokumen:
                </p>
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
                                    <a href={v.attachment}>
                                        {v.Name}
                                    </a>
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