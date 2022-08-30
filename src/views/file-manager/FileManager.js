import React, {  useEffect, useState }  from 'react';
import { Col, Row }                     from 'reactstrap';

//Components
import { FileManagerTable }             from '../../components/widgets/file-manager/Table';
import { DetailFileComponent }          from '../../components/widgets/file-manager/detail-file-component';
import { FileManagerProvider }          from '../../context/FileManagerContext';
import { TopComponentFileManager }      from '../../components/widgets/file-manager/top-component';
import { LeftSidebarFileManagement }    from '../../components/widgets/file-manager/left-sidebar';
import CustomTableNotAuthorized         from '../../components/widgets/custom-table/CustomTableNotAuthorized';

//API
import DriveApi                         from '../../services/pages/drive';

import Helper                           from '../../helpers';

const FileManager = (props) => {
    const [diskData, setDiskData]   = useState(false);
    const [rwBgColor, setRwBgcolor] = useState({});

    const {getRoleByMenuStatus}     = Helper;

    const getDisk = () => {
        DriveApi.statistic.disk({
            onSuccess: (res) => {
                setDiskData(res);
            },
            onFail: (err) => {
                console.log(err);
            }
        })
    };

    useEffect(() => {
        getDisk();
    }, []);

    return (
        <FileManagerProvider>
            <Row 
                id      = "fs-component" 
                style   = {{ ...rwBgColor }}
            >
                <LeftSidebarFileManagement diskData={diskData}/>
                <Col>
                    {
                        getRoleByMenuStatus('File Manajemen', 'file_management_list') ?
                            <>
                                <TopComponentFileManager 
                                    show    = {false} 
                                    setBg   = {(param) => { setRwBgcolor(param) }}
                                    />
                                <Row>
                                    <Col md={12}>
                                        <FileManagerTable/>
                                    </Col>
                                    <DetailFileComponent/>
                                </Row>
                            </>
                        :
                            <CustomTableNotAuthorized/>
                    }
                </Col>
            </Row>
        </FileManagerProvider>
    );
};

export default FileManager;