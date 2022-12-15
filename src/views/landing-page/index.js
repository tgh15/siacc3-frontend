import { useEffect } from "react";
import { X } from "react-feather";
import LogoDark  from "../../assets/images/logo/logo_dark.png"
import CustomToast from "../../components/widgets/custom-toast";

const LandingPage = () => {

    const handleRedirect = () => {
        if (localStorage.getItem('role') === 'Helpdesk') {
            window.location.href = "/helpdesk/home";
        } else {
            window.location.href = "/beranda";
        }
    }

    useEffect(() => {
        CustomToast('success','Anda akan dialihkan ke halaman selanjutnya dalam beberapa detik.');

        setTimeout(() => {
            handleRedirect();
        }, 5000);

        return () => {};
    }, []);

    return (
        <>
            <div style={{backgroundColor: '#242527', minHeight: '100vh', display:'flex', alignItems:'center', justifyContent:'center', position: 'relative' }}>
                <div
                    style   = {{ color: 'white', float: 'right', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer'}}        
                    onClick = {() => handleRedirect()}
                >
                    <X/>
                </div>
                <div style={{ textAlign: 'center'}}>
                    <img 
                        src     = {LogoDark} 
                        alt     = "SiaccIcon" 
                        style   = {{ height: '100px', marginBottom: '50px' }}
                    />
                    <h1> 
                        <span style= {{ color: '#176138'}}>RESTRICTED ACCESS</span>
                        <span style= {{ color: 'white'}}> | </span> 
                        <span style= {{ color: '#f1c40f'}}>PROPERTY OF THE JAM INTEL KEJAKSAAN AGUNG R.I.</span>
                    </h1>
                </div>
            </div>
        </>
    )
}

export default LandingPage;

