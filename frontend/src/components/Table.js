import React, { useState , useEffect} from 'react';
import { useTable, useSortBy } from 'react-table';
import { Container, Table, Button, Modal, ModalHeader, 
        ModalBody,ModalFooter, CardBody, CardText} from 'reactstrap';
import PlayerCard from './PlayerCard';

import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import Username from "../pages/Profile";
import { useNavigate } from "react-router-dom";


function SortableTableFunc({ columns, data, selectedPlayer, setSelectedPlayer }) {
    // const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [modal, setModal] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        // Get the initial state from sessionStorage or set to default value
        const saved = localStorage.getItem('favorites');
        const initialState = JSON.parse(saved) || [];
        return initialState;
    });
    const [res, setRes] = useState(null);
    let navigate = useNavigate();
    const togglePlayer = () => {
        setModal(!modal);
        
    };

    const setFav = async (userData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/setfavplayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const res = await response.json();
            setRes(res);
            // console.log(res)
            if (res.error) {
                navigate('/nba');
                alert(res.error);
            } else {
                // alert(`Welcome, '${username}'!`)
                // setUser(res.user.username);
                // setIsLoggedIn(true);
                
 
            }

            console.log('res: ', res);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    const setteamFav = async (userData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/setfavteam', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const res = await response.json();
            setRes(res);
            // console.log(res)
            if (res.error) {
                navigate('/nba');
                alert(res.error);
            } else {
                // alert(`Welcome, '${username}'!`)
                // setUser(res.user.username);
                // setIsLoggedIn(true);
                
 
            }

            console.log('res: ', res);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const fetchDataremovefav = async (userData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/removefavplayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const res = await response.json();
            setRes(res);
            // console.log(res)
            if (res.error) {
                navigate('/nba');
                alert(res.error);
            } else {
                // alert(`Welcome, '${username}'!`)
                // setUser(res.user.username);
                // setIsLoggedIn(true);
                
 
            }

            console.log('res: ', res);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    
    const toggleFavorite = () => {
        console.log("favs: ", favorites);
        if (favorites.includes(selectedPlayer.NAME)) {
            setFavorites(favorites.filter(NAME => NAME !== selectedPlayer.NAME));
            let user = sessionStorage.getItem('user');
            let userData = JSON.parse(user);
            let username = userData.username;
            let userID = userData.id;
            console.log('Selected player:', selectedPlayer);
            if (selectedPlayer.id === undefined){
                let removeDATA = {
                    userID: userID,
                    username: username,
                    teamID: selectedPlayer.TEAM,
                    type: 'remove'
                }
                setteamFav(removeDATA);

            } else{
            let removeDATA = {
                userID: userID,
                username: username,
                playerID: selectedPlayer.id,
                type: 'remove'
            }
            setFav(removeDATA);
            }
        } else {
            
            setFavorites([...favorites, selectedPlayer.NAME]);
            let user = sessionStorage.getItem('user');
            let userData = JSON.parse(user);
            let userID = userData.id;
            let username = userData.username;
            console.log('Selected player:', selectedPlayer);
            if(selectedPlayer.id === undefined){

            let favDATA = {
                // user: username,
                userID: userID,
                username: username,
                // name: selectedPlayer.NAME,
                teamID: selectedPlayer.TEAM,
                type: 'add'

            };
            setteamFav(favDATA);
        } else{
            let favDATA = {
                // user: username,
                userID: userID,
                username: username,
                // name: selectedPlayer.NAME,
                playerID: selectedPlayer.id,
                type: 'add'

            };
            setFav(favDATA);

        }
            // NEED TO FIX THIS SO THAT IT WILL SHOW UP AS FAVORITED WHEN RELOADING, THIS COULD BE DONE BY QUERYING THE FAV TABLE AND SET THOSE PLAYERS TO FAVORTIED
            // WITH THE TOGGLE 
        }
        // sessionStorage.setItem('favorites', favorites);

    };
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);
    // console.log(favorites);

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
            
        {selectedPlayer && favorites.includes(selectedPlayer.NAME) ? 
          <MdFavorite size={50} onClick={() => toggleFavorite(selectedPlayer?.NAME,selectedPlayer?.TEAM,selectedPlayer?.PPG,selectedPlayer?.RPG,selectedPlayer?.APG) } color='#e31b23'/> :
          <MdFavoriteBorder size={50} onClick={toggleFavorite} color='#e31b23'/> }
          {/* <Button color="secondary" onClick={() => setSelectedPlayer(null)}>
            Cancel
          </Button> */}
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
