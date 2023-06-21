import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export function WindSpeedTable({ auth, topWindSpeeds }) {
    function createData(country, city, wind) {
        return {country, city, wind};
    }

    const rows = topWindSpeeds.map((station) =>
        createData(station.nearest_location.administrative_region1,
            station.nearest_location.administrative_region2,
            data.wind_speed));

    export default function WindSpeedTable() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Country</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Wind speed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.country}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.country}
                                </TableCell>
                                <TableCell align="right">{row.city}</TableCell>
                                <TableCell align="right">{row.wind}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
