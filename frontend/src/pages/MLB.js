import React, { useState, useEffect } from "react";
import { Col, Container, Row, Input, 
        Button,  DropdownToggle,
        DropdownMenu,  DropdownItem,
        Dropdown, Table} from "reactstrap";
import Temp from '../components/Temp';

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
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [requestData, setRequestData] = useState({table: 'ship'})
    const toggleTable =  () => {
        // try {
            // const requestData = { table: 'ship' };
        //     const responseData = await Temp(requestData);
            // setTableData(responseData);
            setShowTable(true);
        //     console.log(tableData);
        // } catch (error) {
        //     console.error('Error fetching data: ', error);
        // }
    };
  
    return (
      <div>
        <Button onClick={toggleTable}>Get Table</Button>
        
        {showTable &&  (
            <Temp requestData={requestData} />
        //  <div>
        //      <h2>Table</h2>
        //      <table>
        //          <thead>
        //              <tr>
        //                  {tableData.columns.map((column, index) => (
        //                     <th key={index}>{column}</th>
        //                 ))}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {tableData.data.map((row, rowIndex) => (
        //                 <tr key={rowIndex}>
        //                     {tableData.columns.map((column, columnIndex) => (
        //                         <td key={columnIndex}>{row[column]}</td>
        //                     ))}
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
        )}
      </div>
    );
}