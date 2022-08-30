import { 
    useState, 
    Fragment, 
    useEffect, 
} from "react";
import { Key } from "react-feather";


const IconKey = ({ data }) => {
    //State
    const [dataDevice, setDataDevice]       = useState(false);
    const [modalDeviced, SetModalDeviced]   = useState(false);
    const [modalUnDevice, SetModalUnDevice] = useState(false);
    
    const setIcon = () => {
        
        if (data.device == "not_connected") {
            return <Key size={20} className="cursor-pointer" onClick={() => { SetModalUnDevice(true) }}/>
        } else if (data.device === 1) {
            return <Key size={20} className="cursor-pointer text-success" onClick={() => { SetModalDeviced(true) }}/>
        } else if (data.device === 2) {
            return <Key size={20} className="cursor-pointer text-primary"/>
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIcon(data.device);
            console.log("waitting");
        }, 1000);
        return () => {clearTimeout(timer); console.log("done");} ;
    }, []);

    return (
        <Fragment>
            {dataDevice && dataDevice}
            {!dataDevice && "loading.."}
        </Fragment>
    );
};

export default IconKey;