import { Fragment }         from "react";
import { 
    Plus,
    Archive,
    Sliders, 
    Download,
    ArrowLeft,
}                           from "react-feather";
import { 
    Col, 
    Row,
    Button, 
    DropdownItem,
    DropdownMenu, 
    DropdownToggle, 
    UncontrolledDropdown,
}                           from "reactstrap";


const SearchCrawling = (props) => {
    //Props
    const { 
        status, 
        exportPDF,
        exportWord,
        exportExcel,
        getResultAll, 
        getResultArchive,
        setShowFilterForm,
        setShowSubmitForm, 
        setShowResultForm, 
    } = props;

    return (
        <Row>
            <Col 
                md        = "6" 
                className = "d-flex"
            >
                {
                    status == 1 ?
                        <UncontrolledDropdown className="mr-2">
                            <div id="ekspor-crawling">
                                <DropdownToggle 
                                    size     = "sm"
                                    color    = 'primary' 
                                    outline 
                                >
                                    <Download size={23}/> 
                                    <span className="ml-1">Ekspor</span>
                                </DropdownToggle>
                            </div>
                            <DropdownMenu>
                                {exportExcel()}
                                <DropdownItem 
                                    tag     = 'a' 
                                    onClick = {() => exportWord()}
                                >
                                    Jadikan Berkas Word
                                </DropdownItem>
                                <DropdownItem 
                                    tag     = 'a' 
                                    onClick = {() => exportPDF()}
                                >
                                    Jadikan Berkas PDF
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    : null
                }
                {
                    status == 2 ? 
                        <Button.Ripple 
                            color       = 'primary'
                            outline
                            onClick     = {() => getResultAll()}
                            className   = "d-flex justify-content-between btn-icon rounded-circle mr-1" 
                        > 
                            <ArrowLeft size={18}/>
                        </Button.Ripple>
                    :
                        null
                }
                <div id="create-crawling">
                    <Button.Ripple 
                        color       = 'primary' 
                        onClick     = {() => setShowSubmitForm(true)}
                        className   = "d-flex justify-content-between" 
                    >
                        <Plus 
                            size      = {14} 
                            className = "mr-1"
                        />
                        <span className='align-middle ms-25'>Tambah Crawling Baru</span>
                    </Button.Ripple>
                </div>
            </Col>
            <Col 
                md        = "6" 
                className = "d-flex justify-content-end"
            >
                {
                    status == 3 ?
                        <Button.Ripple 
                            color       = 'primary' 
                            onClick     = {() => setShowResultForm(true)}
                            className   = "d-flex justify-content-between"
                        >
                            <span className='align-middle ms-25'>Simpan Hasil Crawling</span>
                        </Button.Ripple>
                    : null
                }
                {   
                    status == 1 || status == 2?
                        <Fragment>
                            {
                                status == 1 ?
                                    <div id="archive-crawling">
                                        <Button.Ripple 
                                            color     = 'primary' 
                                            onClick   = {() => {getResultArchive()}}
                                            className = 'btn-icon mr-2' 
                                        >
                                            <Archive size={16}/>
                                        </Button.Ripple>
                                    </div>
                                : null
                            }
                            <div id="filter-crawling">
                                <Button.Ripple 
                                    color     = 'primary' 
                                    onClick   = {() => {setShowFilterForm(true)}}
                                    className = 'btn-icon' 
                                >
                                    <Sliders size={16}/>
                                </Button.Ripple>
                            </div>
                        </Fragment>
                    : null
                }
            </Col>
        </Row>
    );
};

export default SearchCrawling;