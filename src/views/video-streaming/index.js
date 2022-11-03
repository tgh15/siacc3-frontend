import Select                   from "react-select";
import { 
    Row, 
    Col 
}                               from "reactstrap";
import SearchTable              from "../../components/widgets/custom-table/SearchTable";
import VideoPlayer              from "./video";
import { selectThemeColors }    from '@utils';
import VideoStreamingAPI from "../../services/pages/video-streaming";
import { useEffect, useState } from "react";
import data from "../configuration/work-unit-list/geojson";
import Skeleton from "react-loading-skeleton";
import CustomTableBodyEmpty from "../../components/widgets/custom-table/CustomTableBodyEmpty";


const VideoStreaming = () => {

    const [liveList, setLiveList] = useState(null);
    const [savedList, setSavedList] = useState(null);
    const [historyList, setHistoryList] = useState(null);

    const GetVideoStreaming = () => {

        const param = {
            all : true
        }

        VideoStreamingAPI.VideoStreamingList(param).then(
            res => {

                if(res.is_error === false){

                    let liveList_ = [], savedList_ = [], historyList_ = [];

                    if( res.data.length > 0){
                        res.data.map((data) => (
                            data.broadcast.status === "published" ? 
                                liveList_.push(data)
                            :
                                data.broadcast.status === "finished" ? 
                                    savedList_.push(data)
                                :
                                    historyList_.push(data)
                        ))
    
                        setLiveList(liveList_);
                        setSavedList(savedList_);
                        setHistoryList(historyList_);
                    }else{
                        setLiveList([]);
                        setSavedList([]);
                        setHistoryList([]);
                    }
                }

                console.log(res, 'res video streaming');
            }, 
            err => {
                console.log(err, 'error video streaming');
            }
        )
    }

    useEffect(() => {
        GetVideoStreaming();
    }, []); 
    
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
                    <h3 className="card-title">Sedang Siaran</h3>
                </Col>
                {
                    liveList == null ? 
                        <>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                        </>
                    :
                        liveList.length > 0 ?
                            liveList.map((data, index) => (
                                index <= 2 &&
                                <Col md={4}>
                                    <VideoPlayer
                                        data    = {data}
                                        live    = {true}
                                        detail  = {false}
                                    />
                                </Col>
                            ))
                        :
                            <Col md={12}>
                                <CustomTableBodyEmpty/>
                            </Col>
                }
            </Row>
            <hr/>
            <Row>
                <Col md={12}>
                    <h3 className="card-title">Siaran Disimpan</h3>
                </Col>
                {
                    savedList == null ? 
                        <>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                        </>
                    :
                        savedList.length > 0 ?
                            savedList.map((data, index) => (
                                index <= 2 &&
                                <Col md={4}>
                                    <VideoPlayer
                                        data    = {data}
                                        live    = {false}
                                        detail  = {false}
                                    />
                                </Col>
                            ))
                        :
                            <CustomTableBodyEmpty/>
                }
            </Row>
            <hr/>
            <Row className="mb-4">
                <Col md={12}>
                    <h3 className="card-title">Riwayat</h3>
                </Col>
                {
                    historyList == null ? 
                        <>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                            <Col md={4}>
                                <Skeleton height={200}/>
                            </Col>
                        </>
                    :
                        historyList.length > 0 ?
                            historyList.map((data, index) => (
                                index <= 2 &&
                                <Col md={4}>
                                    <VideoPlayer
                                        data    = {data}
                                        live    = {false}
                                        detail  = {false}
                                    />
                                </Col>
                            ))
                        :
                            <CustomTableBodyEmpty/>
                }
            </Row>
        </>
    );
};

export default VideoStreaming;