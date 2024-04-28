import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Table } from 'reactstrap';

function SortableTableFunc({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <Table {...getTableProps()} className='rounded'>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default function SortableTable({ responseData }) {
    const columns = React.useMemo(() => responseData.columns.map(col => ({
        Header: col,
        accessor: col,
    })), [responseData.columns]);

    const data = React.useMemo(() => responseData.data, [responseData.data]);

    return (
        <Container >
            <h2>Table</h2>
            <SortableTableFunc columns={columns} data={data} className='rounded'/>
        </Container>
    );
}
