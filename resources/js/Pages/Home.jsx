import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EuropeMap from '@/Components/MapEurope.jsx';
import JapanMap from '@/Components/MapJapan.jsx';

// Initialize the Highcharts modules
HighchartsMap(Highcharts);

export default function Dashboard({ auth }) {
    const [showJapanMap, setShowJapanMap] = useState(true);

    const handleToggleMap = () => {
        setShowJapanMap(!showJapanMap);
    };

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
                            {showJapanMap ? <JapanMap /> : <EuropeMap />}

                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleToggleMap}
                            >
                                {showJapanMap ? 'Show Europe Map' : 'Show Japan Map'}
                            </button>
                            <div id="container" style={{ height: '500px', margin: '0 auto' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">

            </div>
        </AuthenticatedLayout>
    );
}
