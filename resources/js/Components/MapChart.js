import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';

export const MapChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            HC_map(Highcharts); // Initialize the map module
        }
    }, [chartRef]);

    const options = {
        chart: {
            map: 'countries/jp/jp-all'
        },
        title: {
            text: 'Temperature Map of Japan'
        },
        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/jp/jp-all.js">Japan</a>'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: 0,
            max: 40,
            stops: [
                [0, '#FFFFFF'],
                [0.5, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
            ]
        },
        series: [{
            data: [
                ['jp-3426', 20.5],
                ['jp-3424', 15.7],
                ['jp-3423', 25.2],
                // add more data points here
            ],
            mapData: Highcharts.maps['countries/jp/jp-all'],
            joinBy: 'hc-key',
            name: 'Temperature',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            tooltip: {
                valueSuffix: '°C'
            }
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
