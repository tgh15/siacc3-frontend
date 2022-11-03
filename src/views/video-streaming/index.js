import Select       from "react-select";
import { Col, Row } from "reactstrap";
import SearchTable  from "../../components/widgets/custom-table/SearchTable";
import { selectThemeColors }                    from '@utils';
import VideoPlayer from "./video";


const VideoStreaming = () => {
    return (
        <>
            <Row>
                <Col 
                    md          = {3} 
                    className   = {"d-flex align-items-center "} 
                >
                    <h3>SIARAN</h3>
                </Col>
                <Col md={4}>
                    <SearchTable
                        placeholder = "Cari Siaran"
                    />
                </Col>
                <Col md={5}>
                    <Row>
                        <Col md={6}>
                            <Select
                                id              = "filter" 
                                theme           = {selectThemeColors}
                                options         = {[
                                    {label : 'Satuan', value : 'Satuan'}
                                ]}
                                className       = 'react-select'
                                isClearable
                                placeholder     = 'Pilih Kategori'
                                classNamePrefix = 'select'
                            />
                        </Col>
                        <Col md={6}>
                            <Select
                                id              = "filter" 
                                theme           = {selectThemeColors}
                                options         = {[
                                    {label : 'Satuan', value : 'Satuan'}
                                ]}
                                className       = 'react-select'
                                isClearable
                                placeholder     = 'Pilih Tingkat Satuan Kerja'
                                classNamePrefix = 'select'
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h3>Sedang Siaran</h3>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col md={12}>
                    <h3>Siaran Disimpan</h3>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col md={12}>
                    <h3>Riwayat</h3>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
                <Col md={4}>
                    <VideoPlayer/>
                </Col>
            </Row>
        </>
    );
};

export default VideoStreaming;