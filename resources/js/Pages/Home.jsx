import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Initialize the Highcharts modules
HighchartsMap(Highcharts);

export default function Dashboard({ auth }) {
    useEffect(() => {
        (async () => {
            const topology = await fetch(
                'https://code.highcharts.com/mapdata/custom/world.topo.json'
            ).then((response) => response.json());

            if (document.getElementById('container')) {
                Highcharts.mapChart('container', {
                    chart: {
                        map: topology,
                    },

                    title: {
                        text: 'Highcharts Map Example',
                        align: 'left',
                    },

                    subtitle: {
                        text: 'World map',
                        align: 'left',
                    },

                    legend: {
                        enabled: true,
                    },

                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom',
                        },
                    },

                    series: [
                        {
                            name: 'Countries',
                            color: '#E0E0E0',
                            enableMouseTracking: false,
                        },
                        {
                            type: 'mapbubble',
                            name: 'Population 2019',
                            joinBy: ['iso-a2', 'code'],
                            data: [
                                {
                                    code: 'AF',
                                    name: 'Afghanistan',
                                    value: 38041754,
                                },
                                {
                                    code: 'AL',
                                    name: 'Albania',
                                    value: 2862427,
                                },
                                {
                                    code: 'DZ',
                                    name: 'Algeria',
                                    value: 43053054,
                                },

                            ],
                            maxSize: '12%',
                            minSize: '2%',
                            tooltip: {
                                pointFormat: '{point.name}: {point.value}',
                            },
                        },
                    ],
                });
            }
        })();
    }, []);

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
