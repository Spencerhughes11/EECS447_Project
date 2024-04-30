import React, { useState, useEffect } from "react";
import { Col, Container, Row, 
        Button, Table,Form, FormGroup, Input, Label} from "reactstrap";
import Query from '../components/queries';
import NBAQuery from "../components/NBAQueries";
// import DropdownMenu, {
//     DropdownItemCheckbox,
//     DropdownItemCheckboxGroup,
//   } from '@atlaskit/dropdown-menu';
import Select from 'react-select';


export default function NBA() {
    // const [requestData, setRequestData] = useState(null);

    // // let handleRequest 

    // const responseData = Temp({requestData});
    // let requestData = {table: 'ship'}
    // return(
    //     <Container className="vh-100 ">
    //         <Button>Click</Button>
    //     </Container>
    // );


      
      
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [requestData, setRequestData] = useState()
    const toggleTable =  () => {
        // try {
            // const requestData = { table: 'ship' };
        //     const responseData = await Temp(requestData);
            // let queryInfo = {
            //     position: selectedPosition.value,
            //     // year: selectedYear.value,
            //     team: selectedTeam.value,
            //     cols: selectedColValues,
            // }
            // // console.log(queryInfo.cols);
            // setRequestData(queryInfo);
            setShowTable(true);
        //     console.log(tableData);
        // } catch (error) {
        //     console.error('Error fetching data: ', error);
        // }
    };

                   


    return (
      <div>
        
        <h1 className="m-4">Favorites</h1>
        <Row className="m-3 w-75 d-flex align-items-center justify-content-center">
             <Col>
                 <Button onClick={toggleTable}>Get Table</Button>
            </Col>
        </Row>
        {showTable &&  (
            <NBAQuery requestData={requestData} />             // **NOT currently using requestData as param

        )}
      </div>
    );
}

