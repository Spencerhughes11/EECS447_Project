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


export default function MLB() {
    // const [requestData, setRequestData] = useState(null);

    // // let handleRequest 

    // const responseData = Temp({requestData});
    // let requestData = {table: 'ship'}
    // return(
    //     <Container className="vh-100 ">
    //         <Button>Click</Button>
    //     </Container>
    // );
    const [selectedYear, setSelectedYear] = useState({label: '2024', value: '2024'});
    const [selectedTeam, setSelectedTeam] = useState({ label: 'Kansas City Royals', value: 'Kansas City Royals' });
    const [selectedPositions, setSelectedPosition] = useState();
    const [selectedCols, setSelectedCols] = useState([]);

    const handleYearChange = (selectedOption) => {
      setSelectedYear(selectedOption);
    };
    const handleTeamChange = (selectedOption) => {
      setSelectedTeam(selectedOption);
    };
    const handlePositionChange = (selectedOption) => {
      setSelectedPosition(selectedOption);
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
                year: selectedYear.value,
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
    const years = ['2015', '2016', '2017', '2018', '2019', '2020',
                   '2021', '2022', '2023', '2024', 'all'].map(year => ({ label: year, value: year }));
    const teams = [
        "Arizona Diamondbacks", "Atlanta Braves", "Baltimore Orioles", "Boston Red Sox",
        "Chicago White Sox", "Chicago Cubs", "Cincinnati Reds", "Cleveland Guardians",
        "Colorado Rockies", "Detroit Tigers", "Houston Astros", "Kansas City Royals",
        "Los Angeles Angels","Los Angeles Dodgers","Miami Marlins", "Milwaukee Brewers",
        "Minnesota Twins", "New York Yankees", "New York Mets", "Oakland Athletics",
        "Philadelphia Phillies", "Pittsburgh Pirates", "San Diego Padres", "San Francisco Giants",
        "Seattle Mariners", "St. Louis Cardinals", "Tampa Bay Rays", "Texas Rangers", "Toronto Blue Jays",
        "Washington Nationals"].map(team => ({ label: team, value: team }));

    const cols = ['year', 'p_game', 'p_formatted_ip', 'ff_avg_speed', 'ff_avg_spin',
             'sl_avg_spin', 'cu_avg_spin'].map(col => ({ label: col, value: col }));
    return (
      <div>
         <div>
                <Header />
        </div>
        <h1>MLB Stats</h1>
        <Row className="m-3 w-75 d-flex align-items-center justify-content-center">
            <Col>
                <Select
                // isMulti
                name="position"
                options={[
                    {label: 'Hitters', value: 'stats'},
                    {label: 'Pitchers', value: 'stats'}
                ]}
                onChange={handlePositionChange}
                value={selectedPositions}
                />
             </Col>
            <Col>
                <Select
                // isMulti
                name="years"
                options={years}
                onChange={handleYearChange}
                value={selectedYear}
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
                name="league"
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