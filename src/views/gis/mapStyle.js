import { FillLayer } from 'react-map-gl';

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
        'fill-color': {
            property: 'REPORT_COUNT',
            stops: [
                [0, '#badc58'],
                [1, '#6ab04c'],
                [2, '#f1c40f'],
                [3, '#e67e22'],
                [4, '#d35400'],
            ]
        },
        'fill-opacity': 0.8
    }
};

export const dataLayer2 = {
    id: 'data2',
    type: 'fill',
    paint: {
        'fill-color': {
            property: 'REPORT_COUNT',
            stops: [
                [0, '#badc58'],
                [1, '#6ab04c'],
                [2, '#f1c40f'],
                [3, '#e67e22'],
                [4, '#d35400'],
            ]
        },
        'fill-opacity': 0.8
    }
};