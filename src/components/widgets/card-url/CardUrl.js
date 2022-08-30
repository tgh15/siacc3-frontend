import React         from 'react';
import { Link }      from 'react-feather';
import { FormGroup } from 'reactstrap';


const CardUrl = ({data}) => {
    const items = () => {
        let arrs = null;

        if(Array.isArray(data)) {
            arrs = data.map(value => {
                const {agent_report_id, id, attachment} = value;

                return(
                    <FormGroup key={`attachment-url-${agent_report_id}-${id}`}>
                        <p style={{ fontWeight: 'bold', margin: '0px' }}>
                            Sumber:
                        </p>
                        <div className="d-flex justify-content-start">
                            <div style={{ background: '#e7fae8', borderRadius:'10px', padding: '20px', color: '#4c8865' }}>
                                <Link 
                                    size        = {20} 
                                    className   = "mr-1"
                                />
                                <a 
                                    href    = {attachment} 
                                    target  = "_blank"
                                >
                                    {attachment}
                                </a>
                            </div>
                        </div>
                    </FormGroup>
                );
            });
        };
        return arrs;
    };

    return (
        <FormGroup>
            <FormGroup>
                {items()}
            </FormGroup>
        </FormGroup>
    );
};

export default CardUrl;