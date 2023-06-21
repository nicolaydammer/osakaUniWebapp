import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {WindSpeedTable} from "@/Components/WindSpeedTable.jsx";

// Initialize the Highcharts modules
HighchartsMap(Highcharts);
export default function Dashboard({ auth, tempAndDownfall, topWindSpeeds }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head>
                <title>Home</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                            <div id="container" style={{ height: '500px', margin: '0 auto' }}>
                                <WindSpeedTable topWindSpeeds={topWindSpeeds}></WindSpeedTable>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
