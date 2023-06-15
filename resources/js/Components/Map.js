import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = () => {
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // Set chart options
        setChartOptions({
            title: {
                text: 'My Chart'
            },
            series: [{
                data: [1, 2, 3, 4, 5]
            }]
        });
    }, []);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default Chart;
