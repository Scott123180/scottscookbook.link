import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

class QueryResults extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        if(Object.keys(this.props.data).length == 0) return <div>poopy</div>


        const foods = this.props.data.foods;
        return (
            <div>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell><strong>&nbsp;Description</strong></TableCell>
                        <TableCell><strong>Source</strong></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {foods.map((row) => (
                        <TableRow
                        key={row.fdcId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" >
                            &nbsp;{row.description}
                        </TableCell>
                        <TableCell component="th" scope="row" >
                            &nbsp;{row.dataType}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <Stack>
                    <Pagination count={this.props.data.pageList.length} color="primary" />
                </Stack>

            </div>
        );

    }
}

export default QueryResults;