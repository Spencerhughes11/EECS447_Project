import React, { useState} from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Table, Button } from 'reactstrap';
import PlayerCard from './PlayerCard';

function SortableTableFunc({ columns, data, selectedPlayer, setSelectedPlayer }) {
    // const [selectedPlayer, setSelectedPlayer] = useState(null);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
    <Table hover striped  {...getTableProps()}>
            <thead  style={{ borderRadius: '5px', backgroundColor: '#f8f9fa', color: '#333' }}>
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
                            <td {...cell.getCellProps()}>
                                {cell.column.id === 'NAME' ? (  // Assuming 'playerName' is the column id for player names
                                    <Button size='sm' color='link'   onClick={() => setSelectedPlayer(cell.value)}>
                                        {cell.render('Cell')}
                                    </Button>
                                ) : (
                                    cell.render('Cell')
                                )}
                            </td>
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
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const data = React.useMemo(() => responseData.data, [responseData.data]);

    return (
        <div style={{width: '15%', margin: '2em'}}>
            <Container>
            {selectedPlayer && <PlayerCard player={selectedPlayer} />}

            </Container>
           <SortableTableFunc 
                columns={columns} 
                data={data} 
                selectedPlayer={selectedPlayer} 
                setSelectedPlayer={setSelectedPlayer}
            />

        </div>
    );
}
