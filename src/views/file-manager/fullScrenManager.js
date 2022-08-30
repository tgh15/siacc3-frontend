
const FullScreenHandle = (fscren) => {
    let xref    = document.getElementsByTagName("body");
    let ref     = xref[0];
    const color = window.getComputedStyle(document.querySelector("body")).getPropertyValue("background-color");
    
    if(!fscren){
        const searchDom = document.getElementById("root");
        
        if(ref.requestFullscreen){
            searchDom.style.backgroundColor=color
            ref.requestFullscreen()
        }else if(ref.webkitRequestFullscreen){
            ref.webkitRequestFullscreen()
        }else if(ref.msRequestFUllscreen){
            ref.msRequestFUllscreen()
        }
    }else{
        try{
            document.webkitExitFullscreen();
        }catch(e){
            console.log(e);
        }
    }
};

export default FullScreenHandle;