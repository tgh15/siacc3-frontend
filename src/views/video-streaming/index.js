import Select                   from "react-select";
import { 
    Row, 
    Col, 
    Button
}                               from "reactstrap";
import { useContext, useEffect, useState }  from "react";
import SearchTable              from "../../components/widgets/custom-table/SearchTable";
import VideoPlayer              from "./video";
import { selectThemeColors }    from '@utils';
import VideoStreamingAPI        from "../../services/pages/video-streaming";
import Skeleton                 from "react-loading-skeleton";
import CustomTableBodyEmpty     from "../../components/widgets/custom-table/CustomTableBodyEmpty";
import CreateVideoStreaming     from "./create";
import { CategoryContext }      from "../../context/CategoryContext";
import { ModalBase } from "../../components/widgets/modals-base";


const VideoStreaming = () => {

    const [liveList, setLiveList]                   = useState(null);
    const [savedList, setSavedList]                 = useState(null);
    const [activeMore, setActiveMore]               = useState(null);
    const [historyList, setHistoryList]             = useState(null);
    const [showMoreModal, setShowMoreModal]         = useState(false);
    const [isAddVideoVisible, setIsAddVideoVisible] = useState(false);

    const [byTitle, setByTitle]                     = useState(null);
    const [byCategory, setByCategory]               = useState(null);
    const [byWorkunitLevel, setByWorkunitLevel]     = useState(null);

    const {category}                                = useContext(CategoryContext);

    let category_ = category.slice(2).map((data) => (
        {
            value   : data.id,
            label   : data.name,
        }
    ));

    const GetVideoStreaming = (kind = 'published') => {

        let param = {};

        if(kind === 'published'){
            param.all = true;
        }else if(kind === 'finished'){
            param.saved = true;
        }else{
            param.history = true;
        }

        if(byTitle != null){
            param.title = byTitle;
        }

        if(byCategory != null){
            param.category = byCategory;
        }

        if(byWorkunitLevel != null){
            param.workunit_level_id = byWorkunitLevel
        }

        VideoStreamingAPI.VideoStreamingList(param).then(
            res => {

                if(res.is_error === false){

                    if(res.data != null && res.data.length > 0){
                        
    
                        if(kind === 'published'){

                            setLiveList(
                                res.data.filter((data) => (
                                    (data.broadcast.status === "broadcasting" || data.broadcast.status === "publish") 
                                ))
                            );
                        }else if(kind === 'finished'){
                            setSavedList(res.data);
                        }else{
                            setHistoryList(res.data);
                        }

                    }else{
                        if(kind === 'published'){
                            setLiveList([]);
                        }else if(kind === 'finished'){
                            setSavedList([]);
                        }else{
                            setHistoryList([]);
                        }
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
        GetVideoStreaming('published');
        GetVideoStreaming('finished');
        GetVideoStreaming('history');
    }, [byTitle, byCategory, byWorkunitLevel]); 
    
    return (
        <>
            <CreateVideoStreaming
                isAddVideoVisible       = {isAddVideoVisible}
                setIsAddVideoVisible    = {setIsAddVideoVisible}  
            />

            <ModalBase
                show    = {showMoreModal}
                size    = "xl"
                title   = "Tampilkan Lebih Banyak"
                setShow = {(par) => {setShowMoreModal(par)}}
            >
                {
                    activeMore === 1 &&
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
                                    liveList.map((data,) => (
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
                }
                {
                    activeMore === 2 &&
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
                                    savedList.map((data) => (
                                        <Col md={4}>
                                            <VideoPlayer
                                                data    = {data}
                                                live    = {false}
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
                }
                {
                    activeMore === 3 &&
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
                                    historyList.map((data) => (
                                        <Col md={4}>
                                            <VideoPlayer
                                                data    = {data}
                                                live    = {false}
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
                }
            <Row>
                
            </Row>
                
            </ModalBase>

            <Row>
                <Col 
                    md = {4}
                    className = "mb-1"
                >
                    <Button
                        size        = "md" 
                        color       = "primary"
                        onClick     = {() => setIsAddVideoVisible(true)}
                    >
                        Tambah Siaran
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col 
                    md          = {3} 
                    className   = {"d-flex align-items-center "} 
                >
                    <h3>SIARAN</h3>
                </Col>
                <Col md={4}>
                    <SearchTable
                        onSearch    = {(value) => {setByTitle(value)}}
                        placeholder = "Cari Siaran"
                    />
                </Col>
                <Col md={5}>
                    <Row>
                        <Col md={6}>
                            <Select
                                id              = "filterByCategory" 
                                theme           = {selectThemeColors}
                                options         = {category_}
                                className       = 'react-select'
                                isClearable
                                placeholder     = 'Pilih Kategori'
                                classNamePrefix = 'select'
                                onChange        = {(e) => {setByCategory(e.value)}}
                            />
                        </Col>
                        <Col md={6}>
                            <Select
                                id              = "filter" 
                                theme           = {selectThemeColors}
                                options         = {[
                                    {label : 'Kejaksaan Agung', value : 1},
                                    {label : 'Kejaksaan Tinggi', value : 2},
                                    {label : 'Kejaksaan Negeri', value : 3},
                                    {label : 'Cabang Kejaksaan Negeri', value : 4},
                                ]}
                                className       = 'react-select'
                                isClearable
                                placeholder     = 'Pilih Tingkat Satuan Kerja'
                                classNamePrefix = 'select'
                                onChange        = {(e) => {setByWorkunitLevel(e.value)}}

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
                <Col 
                    md          = {12}
                    className   = "d-flex justify-content-end"
                >       
                    {
                        (liveList != null && liveList.length > 3) &&
                        <h4 className="mt-1" onClick={() => {setActiveMore(1); setShowMoreModal(true)}}>Tampilkan lebih banyak</h4>
                    }
                </Col>
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
                            <Col md={12}>
                                <CustomTableBodyEmpty/>
                            </Col>
                }
                <Col 
                    md          = {12}
                    className   = "d-flex justify-content-end"
                >       
                    {
                        (savedList != null && savedList.length > 3) &&
                        <h4 className="mt-1" onClick={() => {setActiveMore(2); setShowMoreModal(true)}}>Tampilkan lebih banyak</h4>
                    }
                </Col>
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
                            <Col md={12}>
                                <CustomTableBodyEmpty/>
                            </Col>
                }
                <Col 
                    md          = {12}
                    className   = "d-flex justify-content-end"
                >       
                    {
                        (historyList != null && historyList.length > 3) &&
                        <h4 className="mt-1" onClick={() => {setActiveMore(3); setShowMoreModal(true)}}>Tampilkan lebih banyak</h4>
                    }
                </Col>
            </Row>
        </>
    );
};

export default VideoStreaming;