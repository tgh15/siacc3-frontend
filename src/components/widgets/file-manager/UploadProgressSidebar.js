import { useContext } from "react"
import { Card, Progress } from "reactstrap"
import { FileManagerContext } from "../../../context/FileManagerContext"
import Sidebar from "../sidebar"

const UploadProgressSidebar = ({ open, toggleSidebar }) => {
    const { progressData } = useContext(FileManagerContext)

    const ProgressItems = data => {
            return (
                <Card>
                    <h5>{data.fileName}</h5>
                    <Progress value={data.percent} className='progress-bar-primary'>
                        {data.percent}%
                    </Progress>
                </Card>
            )
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title='Upload Progress'
            headerClassName='mb-1'
            contentClassName='p-0'
            bodyClassName='pb-sm-0 pb-1'
            toggleSidebar={toggleSidebar}
        >
            {
                progressData.map((data, i) => (
                    ProgressItems(data)

                ))
            }
        </Sidebar>
    )
}

export default UploadProgressSidebar