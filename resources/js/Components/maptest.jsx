import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
// import HC_mapbubble from 'highcharts/modules/mapbubble';
// HC_mapbubble(Highcharts);

export const MapChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            HC_map(Highcharts); // Initialize the map module
        }
    }, [chartRef]);

    const options = {
        chart: {
            map: 'world'
        },
        title: {
            text: 'World Map'
        },
        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World</a>'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        series: [{
            name: 'Countries',
            color: '#E0E0E0',
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            name: 'Population 2019',
            joinBy: ['iso-a2', 'code'],
            data: [{
                code: 'CN',
                z: 1433783686
            }, {
                code: 'IN',
                z: 1366417754
            }, {
                code: 'US',
                z: 329064917
            }, {
                code: 'ID',
                z: 270625568
            }, {
                code: 'BR',
                z: 211049527
            }]
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartRef}
            />
        </div>
    );
};
