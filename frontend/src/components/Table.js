import React, { useState} from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Table, Button, Modal, ModalHeader, 
        ModalBody,ModalFooter, CardBody, CardText} from 'reactstrap';
import PlayerCard from './PlayerCard';

import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";


function SortableTableFunc({ columns, data, selectedPlayer, setSelectedPlayer }) {
    // const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [modal, setModal] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const togglePlayer = () => {
        setModal(!modal);
        
    };
    const toggleFavorite = () => {
        setFavorite(!favorite);
        // console.log(favorite);
    };
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <Container>
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
                                    <Button size='sm' color='link' onClick={() => setSelectedPlayer(row.original)}>
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
        {/* PLAYER POPUP */}
        <Modal isOpen={selectedPlayer !== null} toggle={() => setSelectedPlayer(null)} >
            <ModalHeader toggle={() => setSelectedPlayer(null)}>{selectedPlayer?.NAME}  -  {selectedPlayer?.TEAM}</ModalHeader>
            <ModalBody>
            <CardBody className='p-3'> 
                    <CardText>
                    PPG: {selectedPlayer?.PPG}
                    </CardText>
                    <CardText>
                    RPG: {selectedPlayer?.RPG} 
                    </CardText>
                    <CardText>
                    APG: {selectedPlayer?.APG}
                    </CardText>
                </CardBody>
            </ModalBody>
            <ModalFooter>
        {favorite ? 
          <MdFavoriteBorder size={50} onClick={toggleFavorite} color='#e31b23'/> :
          <MdFavorite size={50} onClick={toggleFavorite} color='#e31b23'/> }
          <Button color="secondary" onClick={() => setSelectedPlayer(null)}>
            Cancel
          </Button>
        </ModalFooter>
        </Modal>
        </Container>
    );
}

export default function SortableTable({ responseData }) {
    const columns = React.useMemo(() => responseData.columns.map(col => ({
        Header: col,
        accessor: col,
    })), [responseData.columns]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const data = React.useMemo(() => responseData.data, [responseData.data]);
    // let name = selectedPlayer ? selectedPlayer.NAME : '';
    // console.log(name);
    return (
        <div style={{width: '15%', margin: '2em'}}>
            {/* <Container>
            {selectedPlayer && <PlayerCard player={selectedPlayer} />}

            </Container> */}
           <SortableTableFunc 
                columns={columns} 
                data={data} 
                selectedPlayer={selectedPlayer} 
                setSelectedPlayer={setSelectedPlayer}
            />

        </div>
    );
}
