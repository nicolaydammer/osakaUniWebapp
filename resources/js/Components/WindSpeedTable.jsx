import * as React from 'react';

export function WindSpeedTable({topWindSpeeds}) {
    function createData(country, city, wind) {
        return {country, city, wind};
    }
    console.log(topWindSpeeds);
    const data = topWindSpeeds
    const rows = data.map((station) => createData(station.nearest_location.administrative_region1, station.nearest_location.administrative_region2, data.wind_speed))

    var tableRows = rows.map((row) => (
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
