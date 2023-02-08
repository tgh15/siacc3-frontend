
export function updatePercentiles(featureCollection, workunitList) {
    const { features } = featureCollection;
    if(workunitList != null){
        return {
            type: 'FeatureCollection',
            features: features.map(f => {

                let selectedWorkunit;

                let properties;
                
                selectedWorkunit = workunitList.filter((data_) => (
                    data_.code === f.properties.KODE_KAB
                ))

                if(selectedWorkunit.length > 0){
                    if(selectedWorkunit[0].total_report >= 0 && selectedWorkunit[0].total_report <= 10){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 1
                        };
                    }else if(selectedWorkunit[0].total_report >= 11 && selectedWorkunit[0].total_report <= 100){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 2
                        };
                    }else if(selectedWorkunit[0].total_report >= 101 && selectedWorkunit[0].total_report <= 300){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 3
                        };
                    }
                    else if(selectedWorkunit[0].total_report >= 301){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 4
                        };
                    }else{
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 0
                        };
                    }
                }else{

                    properties = {
                        ...f.properties,
                        REPORT_COUNT: 0
                    };
                }
                return { ...f, properties };
            })
        };
    }
}

export function updatePercentilesDetail(featureCollection, workunitList) {
    const { features } = featureCollection;
    if(workunitList != null){
        return {
            type: 'FeatureCollection',
            features: features.map(f => {

                let selectedWorkunit;

                let properties;
                
                selectedWorkunit = workunitList.filter((data_) => (
                    data_.code === f.properties.adm2_pcode
                ))

                if(selectedWorkunit.length > 0){
                    if(selectedWorkunit[0].total_report > 0 && selectedWorkunit[0].total_report <= 10){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 1
                        };
                    }else if(selectedWorkunit[0].total_report >= 11 && selectedWorkunit[0].total_report <= 100){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 2
                        };
                    }else if(selectedWorkunit[0].total_report >= 101 && selectedWorkunit[0].total_report <= 300){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 3
                        };
                    }
                    else if(selectedWorkunit[0].total_report >= 301){
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 4
                        };
                    }else{
                        properties = {
                            ...f.properties,
                            REPORT_COUNT: 0
                        };
                    }
                }else{

                    properties = {
                        ...f.properties,
                        REPORT_COUNT: 0
                    };
                }
                return { ...f, properties };
            })
        };
    }
}

export function updateColor(featureCollection, workunitList) {
    const { features } = featureCollection;
    if(workunitList != null){
        let properties;

        return {
            type: 'FeatureCollection',
            features: features.map((f,index)=> {
                properties = {
                    ...f.properties,
                    REPORT_COUNT: index
                };
                return { ...f, properties };
            })
        };
    }
}