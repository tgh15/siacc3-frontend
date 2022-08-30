import { createContext, useEffect, useState } from "react";
import CustomToast from "../components/widgets/custom-toast";
import SettingPerformanceApi from "../services/pages/configuration/setting-performance";



const TrophyContext = createContext(null)


const TrophyProvider = ({ children }) => {

    const [trophies, setTrophies] = useState([]);

    const getData = () => {
        SettingPerformanceApi.getTrophy("list").then(
            res => {
                setTrophies(res.data);
            },
            err => {
                console.log("danger", "Gagal mengambil data Trophy");
            }

        )
    }

    useEffect(() => {
        getData();
    }, [])

    return <TrophyContext.Provider
        value={{
            trophies
        }}>{children}</TrophyContext.Provider>
}

export { TrophyContext, TrophyProvider }

