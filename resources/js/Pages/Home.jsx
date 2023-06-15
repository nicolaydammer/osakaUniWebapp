import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Initialize the Highcharts modules
HighchartsMap(Highcharts);

// Data for the chart
const data = [
    {
        "lat": 51.507222,
        "lon": -0.127647,
        "name": "London",
        "country": "GB",
        "clusterPointsAmount": 20
    },
    {
        "lat": 48.856614,
        "lon": 2.352222,
        "name": "Paris",
        "country": "FR",
        "clusterPointsAmount": 2
    },
    {
        "lat": 40.416775,
        "lon": -3.703790,
        "name": "Madrid",
        "country": "ES",
        "clusterPointsAmount": 1
    },
    {
        "lat": 52.520008,
        "lon": 13.404954,
        "name": "Berlin",
        "country": "DE",
        "clusterPointsAmount": 1
    },
    {
        "lat": 41.902782,
        "lon": 12.496366,
        "name": "Rome",
        "country": "IT",
        "clusterPointsAmount": 1
    },
    {
        "lat": 52.229676,
        "lon": 21.012229,
        "name": "Warsaw",
        "country": "PL",
        "clusterPointsAmount": 1
    },
    {
        "lat": 59.329323,
        "lon": 18.068581,
        "name": "Stockholm",
        "country": "SE",
        "clusterPointsAmount": 1
    },
    {
        "lat": 55.676098,
        "lon": 12.568337,
        "name": "Copenhagen",
        "country": "DK",
        "clusterPointsAmount": 1
    },
    {
        "lat": 59.913869,
        "lon": 10.752245,
        "name": "Oslo",
        "country": "NO",
        "clusterPointsAmount": 1
    },
    {
        "lat": 60.169856,
        "lon": 24.938379,
        "name": "Helsinki",
        "country": "FI",
        "clusterPointsAmount": 1
    }
];

export default function Dashboard({ auth }) {
    useEffect(() => {

        (async () => {

            const topology = await fetch(
                'https://code.highcharts.com/mapdata/custom/europe.topo.json'
            ).then(response => response.json());

            // Data structure: [country_code, latitude, longitude, capital_city]
            const newData = [
                ['dk', 55.66, 12.58, 'Copenhagen'],
                ['fo', 62, -6.79, 'Torshavn'],
                ['hr', 45.8, 16, 'Zagreb'],
                ['nl', 52.35, 4.91, 'Amsterdam'],
                ['ee', 59.43, 24.71, 'Tallinn'],
                ['bg', 42.68, 23.31, 'Sofia'],
                ['es', 40.4, -3.68, 'Madrid'],
                ['it', 41.9, 12.48, 'Rome'],
                ['sm', 43.93, 12.41, 'San Marino'],
                ['va', 41.9, 12.45, 'Vatican'],
                ['tr', 39.93, 32.86, 'Ankara'],
                ['mt', 35.88, 14.5, 'Valetta'],
                ['fr', 48.86, 2.33, 'Paris'],
                ['no', 59.91, 10.75, 'Oslo'],
                ['de', 52.51, 13.4, 'Berlin'],
                ['ie', 53.31, -6.23, 'Dublin'],
                ['ua', 50.43, 30.51, 'Kyiv'],
                ['fi', 60.16, 24.93, 'Helsinki'],
                ['se', 59.33, 18.05, 'Stockholm'],
                ['ru', 55.75, 37.6, 'Moscow'],
                ['gb', 51.5, -0.08, 'London'],
                ['cy', 35.16, 33.36, 'Nicosia'],
                ['pt', 38.71, -9.13, 'Lisbon'],
                ['gr', 37.98, 23.73, 'Athens'],
                ['lt', 54.68, 25.31, 'Vilnius'],
                ['si', 46.05, 14.51, 'Ljubljana'],
                ['ba', 43.86, 18.41, 'Sarajevo'],
                ['mc', 43.73, 7.41, 'Monaco'],
                ['al', 41.31, 19.81, 'Tirana'],
                ['nc', 35.18, 33.36, 'North Nicosia'],
                ['rs', 44.83, 20.5, 'Belgrade'],
                ['ro', 44.43, 26.1, 'Bucharest'],
                ['me', 42.43, 19.26, 'Podgorica'],
                ['li', 47.13, 9.51, 'Vaduz'],
                ['at', 48.2, 16.36, 'Vienna'],
                ['sk', 48.15, 17.11, 'Bratislava'],
                ['hu', 47.5, 19.08, 'Budapest'],
                ['ad', 42.2, 1.24, 'Andorra la Vella'],
                ['lu', 49.6, 6.11, 'Luxembourg'],
                ['ch', 46.91, 7.46, 'Bern'],
                ['be', 50.83, 4.33, 'Brussels'],
                ['pl', 52.25, 21, 'Warsaw'],
                ['mk', 42, 21.43, 'Skopje'],
                ['lv', 56.95, 24.1, 'Riga'],
                ['by', 53.9, 27.56, 'Minsk'],
                ['is', 64.15, -21.95, 'Reykjavik'],
                ['md', 47, 28.85, 'Chisinau'],
                ['cz', 50.08, 14.46, 'Prague']
            ];
            // Get temperature for specific localization, and add it to the chart. It
            // takes point as first argument, countries series as second and capitals
            // series as third. Capitals series have to be the 'mappoint' series type,
            // and it should be defined before in the series array.
            async function getTemp(point, countries, capitals) {

                const json = await fetch(
                    'https://api.met.no/weatherapi/locationforecast/2.0/?' +
                    `lat=${point[1]}&lon=${point[2]}`
                ).then(response => response.json());

                const temp = json.properties.timeseries[0].data.instant.details
                        .air_temperature,
                    value = parseInt(temp, 10);

                const country = {
                    'hc-key': point[0],
                    value
                };
                const capital = {
                    name: point[3],
                    lat: point[1],
                    lon: point[2],
                    colorKey: 'y',
                    y: Number.isInteger(value) ? value : null,
                    custom: {
                        label: Number.isInteger(value) ?
                            `${value}℃` :
                            '<span style="font-weight: normal; opacity: 0.5">N/A</span>'
                    }
                };

                countries.addPoint(country);
                capitals.addPoint(capital);
            }

            // Create the chart
            Highcharts.mapChart('container', {
                chart: {
                    map: topology,
                    events: {
                        load: function () {
                            const countries = this.series[0],
                                capitals = this.series[1];
                            newData.forEach(elem => getTemp(elem, countries, capitals));
                        }
                    }
                },

                title: {
                    text: 'Current temperatures in capitals of Europe',
                    align: 'left'
                },

                subtitle: {
                    text: 'Data source: <a href="https://api.met.no/">https://api.met.no/</a>',
                    align: 'left'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                colorAxis: {
                    min: -25,
                    max: 40,
                    labels: {
                        format: '{value}°C'
                    },
                    stops: [
                        [0, '#0000ff'],
                        [0.3, '#6da5ff'],
                        [0.6, '#ffff00'],
                        [1, '#ff0000']
                    ]
                },

                legend: {
                    title: {
                        text: 'Degrees Celsius'
                    }
                },

                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25CF</span> {point.key}:<br/>',
                    pointFormat: 'Temperature: <b>{point.custom.label}</b>'
                },

                series: [{
                    allAreas: true,
                    name: 'Temperatures',
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false,
                    accessibility: {
                        point: {
                            valueDescriptionFormat: '{xDescription}, {point.value}°C.'
                        }
                    }
                }, {
                    name: 'Capitals of Europe',
                    type: 'mappoint',
                    showInLegend: false,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#000'
                    },
                    dataLabels: {
                        crop: true,
                        format: '<span>{key}</span><br><span>{point.custom.label}</span>'
                    },
                    accessibility: {
                        point: {
                            valueDescriptionFormat: '{xDescription}, {point.temp}°C.'
                        }
                    }
                }]
            });

        })();
    }, []); // empty dependency array to run only once

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!

                            <div id="container" style={{ height: '500px', margin: '0 auto' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
