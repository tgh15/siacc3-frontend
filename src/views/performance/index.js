import {  PerformanceProvider } from "../../context/PerformanceContext"
import PerformanceContainer from "./PerformanceContainer"


const Performance = () => {
    return (
        <PerformanceProvider>
            <PerformanceContainer />
        </PerformanceProvider>
    )
}

export default Performance