import "./UserManagement.scss";

import { Row, Col }     from 'reactstrap';
import ImageRounded     from '../../../components/widgets/image-rounded';
import ProfileQrCode    from '../../../components/widgets/profile-qrcode';

const Detail = ({ data }) => {

    return (
        <Row className="mx-0">
            <Col sm="4" className="p-3">
                <ProfileQrCode data={data}/>
            </Col>
            <Col sm="8" className="py-3 pl-0">
                <Row>
                    <Col md="6">
                        <span className="font-weight-bolder">
                            Data Pribadi
                        </span>
                        <div>
                            <ImageRounded 
                                src     = {data.photo != "" ? data.photo : `https://ui-avatars.com/api/?name=${data ? data.name : "UN"}&background=4e73df&color=fff&bold=true`}
                                width   = {100} 
                                height  = {100}
                            />
                        </div>
                        <table className='table-detail'>
                            <tr>
                                <th>NIP</th>
                                <td>{data.identity_id}</td>
                            </tr>
                            <tr>
                                <th>Nama Lengkap</th>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <th>Jabatan</th>
                                <td>{data.position}</td>
                            </tr>
                            <tr>
                                <th>Satker</th>
                                <td>{data.workunit}</td>
                            </tr>
                            <tr>
                                <th>Struktur / Bidang</th>
                                <td>{data.sector}</td>
                            </tr>
                        </table>

                    </Col>
                    <Col md="6">
                        <table className='table-detail mx-0'>
                            <tr>
                                <th>No. KTP</th>
                                <td>{data.ktp}</td>
                            </tr>
                            <tr>
                                <th>No. Telepon</th>
                                <td>{data.phone_number}</td>
                            </tr>
                            <tr>
                                <th>Surel</th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <th>Alamat</th>
                                <td>{data.address}</td>
                            </tr>
                        </table>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Detail;