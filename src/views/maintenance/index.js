import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import LogoDark                                         from "@src/assets/images/logo/logo_dark.png"


const MaintenancePage = () => {
    return (
        <>
            <Card className='mb-3 text-center rounded'>
                <div className="rounded" style={{backgroundColor: '#242527', minHeight: '50vh', display:'flex', alignItems:'center', justifyContent:'center', position: 'relative' }}>
                    <div style={{ textAlign: 'center'}}>
                        <img 
                            src     = {LogoDark} 
                            alt     = "SiaccIcon" 
                            style   = {{ height: '100px', marginBottom: '50px' }}
                        />
                        <h1> 
                            <span style= {{ color: '#176138'}}>MENU PERFORMANCE SEDANG DALAM PROSES PERBAIKAN</span>
                        </h1>
                        <h3> 
                            <span style= {{ color: '#f1c40f'}}>KAMI MOHON MAAF ATAS KETIDAKNYAMANAN INI</span>
                        </h3>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default MaintenancePage;