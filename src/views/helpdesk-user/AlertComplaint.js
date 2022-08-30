import React, { Fragment }           from 'react';
import { Button, Modal, ModalBody }  from 'reactstrap';
import { useHistory }                from 'react-router-dom';

//Icon
import { Check }                     from 'react-feather';

//Components
import CustomToast                   from '../../components/widgets/custom-toast';


const AlertComplaint = props => {
    //History
    let history = useHistory();

    //Props
    const {
        show,
        code,
        onClose,
    } = props;

    return (
        <Fragment>
            <Modal
                size     = "sm"
                isOpen   = {show}
                toggle   = {() => onClose()}
                centered = "center"
            >
                <ModalBody className="text-center p-2">
                    <h5>PENGADUAN BERHASIL DIBUAT</h5>
                    <Button
                        color     = 'primary'
                        style     = {{ padding: '4px' }}
                        className = 'btn-icon rounded-circle mt-2'
                    >
                        <Check size={16}/>
                    </Button>
                    <p className="m-0 mt-2">
                        Berikut nomor tiket laporan Bpk/Ibu : &nbsp;
                        <span style={{ color: '#176238', fontWeight: 'bold' }}>{code}</span>
                    </p>
                    <p>simpan nomor tiket untuk melakukan pelacakan status pengaduan</p>

                    <div className="d-flex justify-content-between mt-3">
                        <Button
                            color   = 'primary'
                            outline
                            onClick = {() => {
                                navigator.clipboard.writeText(code)
                                CustomToast('success', "Nomor tiket berhasil disalin")
                            }}
                        >
                            Copy Nomor Tiket
                        </Button>

                        <Button color='primary'
                            onClick={() => { history.push(`/track-complaint?code=${code}`) }}>
                            Lihat Pengaduan
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default AlertComplaint;