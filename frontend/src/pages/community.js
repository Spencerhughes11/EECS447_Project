import React, { useState, useEffect } from "react";
import { Col, Container, Row, 
        Button, Table,Form, FormGroup, Input, Label} from "reactstrap";
import Query from '../components/queries';
import Header from '../components/Header';
// import DropdownMenu, {
//     DropdownItemCheckbox,
//     DropdownItemCheckboxGroup,
//   } from '@atlaskit/dropdown-menu';
import Select from 'react-select';


export default function Fav() {
    // const [requestData, setRequestData] = useState(null);

    // // let handleRequest 

    // const responseData = Temp({requestData});
    // let requestData = {table: 'ship'}
    // return(
    //     <Container className="vh-100 ">
    //         <Button>Click</Button>
    //     </Container>
    // );
    // function Retreiveusers() {
    //   const [responseData, setResponseData] = useState(null);
    //   // console.log('QD', queryData);
    //   const fetchData = async () => {
    //       try {
    //           const response = await fetch('http://127.0.0.1:5000/retreiveusers', {
    //               method: 'POST',
    //               headers: { 'Content-Type': 'application/json' },
    //               body: JSON.stringify('usercall'),
    //           });
    //           const data = await response.json();
    //           setResponseData(data);
    //           console.log(data.message);
    //       } catch (error) {
    //           console.error('Error fetching data: ', error);
    //       }
    //     }
    //     return requestData
    //   }

    const [selectedPosition, setSelectedPosition] = useState({label: 'position...', value: 'ALL'});
    const [selectedTeam, setSelectedTeam] = useState({ label: 'Team..', value: 'ALL' });
    const [selectedUser, setSelectedUser] = useState({ label: 'User..', value: 'ALL' });
    const [selectedCols, setSelectedCols] = useState([]);
    const [userData, setUserData] = useState([]);
      // Fetch user data from the backend when the component mounts
// Fetch user data from the backend when the component mounts and when selectedUser changes
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/retreiveusers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify('usercall'),
          });
          const data = await response.json();
          if (typeof data === 'object' && data !== null) {
            // Convert JSON response into a list
            const userList = Object.values(data).map(user => ({
              id: user.username, // Assuming each user object has an 'id' property
              // name: user.first, // Assuming each user object has a 'name' property
              // Add more properties as needed
            }));
            setUserData(userList); 
          }
          // Update requestData with fetched data
          console.log(data.message);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      fetchData(); // Call fetchData function
    }, [selectedUser]); 


    console.log("user data:", userData);

    const handlepositionChange = (selectedOption) => {
      setSelectedPosition(selectedOption);
    };
    const handleTeamChange = (selectedOption) => {
      setSelectedTeam(selectedOption);
    };
    const handleUserChange = (selectedOption) => {
      setSelectedUser(selectedOption);
    };
    const handleColsChange = (selectedOption) => {
      setSelectedCols(selectedOption);
    };
  
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [requestData, setRequestData] = useState()
    const toggleTable =  () => {
        // try {
            // const requestData = { table: 'ship' };
        //     const responseData = await Temp(requestData);
            let queryInfo = {
                // table: selectedPositions,
                // year: selectedYear.value,
                // team: selectedTeam,
                // cols: selectedCols,
            }
            // console.log(queryInfo.year.value);
            setRequestData(queryInfo);
            setShowTable(true);
        //     console.log(tableData);
        // } catch (error) {
        //     console.error('Error fetching data: ', error);
        console.log('Clicked');
        // }
    };


    const users = userData.username;
    // useEffect(() => {
    //   // console.log(requestData);
    //   Retreiveusers();
    // }, [selectedUser]); 


    const positions = ['G', 'F', 'C', 'G-F', 'F-C', 'all'].map(position => ({ label: position, value: position }));
    const teams = [
                    "Atl", "Bos", "Bro", "Cha",
                    "Chi", "Cle", "Dal", "Den", "Det",
                    "Gol", "Hou", "Ind", "Lac", "Lal",
                    "Mem", "Mia", "Mil", "Min", "Nor",
                    "Nyk", "Okc", "Orl", "Phi", "Pho",
                    "Por", "Sac",  "San",  "Tor",
                    "Uta", "Was", 'all'
                ].map(team => ({ label: team.toUpperCase(), value: team.toUpperCase() }));

    const cols = ['PPG', 'APG', 'RPG','ALL'].map(col => ({ label: col, value: col }));
    return (
      <div>
      
        <h1 className="m-4">Community Stats</h1>
        <Row className="m-3 w-75 d-flex align-items-center justify-content-center">
            <Col>
                <Select
                // isMulti
                name="user"
                options={userData}
                onChange={handleUserChange}
                value={selectedUser}
                />
             </Col>
            <Col>
                <Select
                // isMulti
                name="position"
                options={positions}
                onChange={handlepositionChange}
                value={selectedPosition}
                />
             </Col>
            <Col>
                <Select
                // isMulti
                name="team"
                options={teams}
                onChange={handleTeamChange}
                value={selectedTeam}
                />
             </Col>
            <Col>
                <Select
                isMulti
                name="stat"
                options={cols}
                onChange={handleColsChange}
                value={selectedCols}
                />
             </Col>
             <Col>
                 <Button onClick={toggleTable}>Get Table</Button>
            </Col>
        </Row>
        {showTable &&  (
            <Query requestData={requestData} />             // **NOT currently using requestData as param

        )}
      </div>
    );
}