import * as React from 'react';

export function WindSpeedTable({topWindSpeeds}) {
    function createData(country, city, wind) {
        return {country, city, wind};
    }
    const data = topWindSpeeds

    let rows = []

    for (const i in data) {
       rows.push(createData(data[i].station.nearest_location.administrative_region1, data[i].station.nearest_location.administrative_region2, data[i].wind_speed))
    }

    let tableRows = rows.map((row) => (
        <tr>
            <td component="th" scope="row">{row.country}</td>
            <td align="right">{row.city}</td>
            <td align="right">{row.wind}</td>
        </tr>))
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th align="right">City</th>
                        <th align="right">Wind speed</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    )
}
