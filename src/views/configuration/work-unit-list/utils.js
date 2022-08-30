
export function updatePercentiles(featureCollection, accessor) {
    const { features } = featureCollection;
    
    return {
        type: 'FeatureCollection',
        features: features.map(f => {

            let val;

            if(accessor > 0 && accessor < 5){
                val = 1
            }else if(accessor > 6 && accessor < 1000){
                val = 2
            }

            const properties = {
                ...f.properties,
                percentile: val
            };

            return { ...f, properties };
        })
    };
}