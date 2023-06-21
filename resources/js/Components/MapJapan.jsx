import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';

// Load Highcharts map module
HighchartsMap(Highcharts);

const JapanMap = () => {
    useEffect(() => {
        const fetchMapData = async () => {
            const topology = await fetch(
                'https://code.highcharts.com/mapdata/countries/jp/jp-all.topo.json'
            ).then(response => response.json());

            const data = [
                ['Hokkaido', 43.2203, 142.8635, 10],
                ['Aomori', 40.8221, 140.7474, 11],
                ['Iwate', 39.7036, 141.1526, 12],
                // Add more coordinates here
            ];

            const options = {
                chart: {
                    map: topology,
                },
                title: {
                    text: 'Rainfall in Japan',
                },
                subtitle: {
                    text:
                        'Source map: <a href="http://code.highcharts.com/mapdata/countries/jp/jp-all.topo.json">Japan</a>',
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom',
                    },
                },
                colorAxis: {
                    min: 0,
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.point.name + '</b><br>Value: ' + this.point.value;
                    },
                },
                series: [
                    {
                        data: data.map(([name, lat, lon, value]) => ({
                            name,
                            lat,
                            lon,
                            value,
                        })),
                        name: 'Temperature',
                        states: {
                            hover: {
                                color: '#BADA55',
                            },
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name} {point.value}',
                        },
                    },
                    {
                        type: 'mappoint',
                        name: 'Custom Point',
                        data: [
                            //TODO: hier moeten de stations toegevoegd worden.
                            { name: 'Custom Point', lat: 35.6895, lon: 139.6917, value: 50 },
                        ],
                        color: 'red',
                    },
                ],
            };

            Highcharts.mapChart('container', options);
        };

        fetchMapData();
    }, []);

    return <div id="container"></div>;
};

export default JapanMap;
