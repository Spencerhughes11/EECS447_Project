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
import Retreiveusers from "../components/getusers";
import Userjoin from "../components/communityquery";




export default function Community() {
  const [selectedPosition, setSelectedPosition] = useState({ label: 'position...', value: 'ALL' });
  const [selectedTeam, setSelectedTeam] = useState({ label: 'Team..', value: 'ALL' });
  const [selectedUser, setSelectedUser] = useState({ label: 'User..', value: 'ALL' });
  const [selectedCols, setSelectedCols] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [requestData, setRequestData] = useState();
  // const requestData = {
  //   'query': 'SELECT * FROM users'
  // };
  // useEffect(() => {

    // }
//     fetchData().then(data => {
//         setUserData(data || []);
//     });
// }, []); 

let queryInfo;

  const handlepositionChange = (selectedOption) => setSelectedPosition(selectedOption);
  const handleTeamChange = (selectedOption) => setSelectedTeam(selectedOption);
  const handleUserChange = (selectedOption) => setSelectedUser(selectedOption);
  const handleColsChange = (selectedOption) => setSelectedCols(selectedOption);
    const toggleTable =  () => {

            setShowTable(true);

    };



    // const userOptions = userData.map(user => ({ label: user.username, value: user.id }));

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

    const cols = ['PPG', 'APG', 'RPG','all'].map(col => ({ label: col, value: col }));
    return (
      <div>
      
        <h1 className="m-3">Community</h1>
        <h4 className="">See who other users favorite teams and players are</h4>
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
        {showTable && (
            <Retreiveusers />             // **NOT currently using requestData as param
          // <span>{Retreiveusers({requestData})}</span>
        )}
      </div>
    );
}