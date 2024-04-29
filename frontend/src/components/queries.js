import React, { useState, useEffect } from "react";
import { Col, Container, Row, Input, 
    Button,  DropdownToggle,
    DropdownMenu,  DropdownItem,
    Dropdown, Table} from "reactstrap";
    import SortableTable from "./Table";

export default function Query(queryData) {
    const [responseData, setResponseData] = useState(null);

    const fetchData = async (requestData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/mlb', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            setResponseData(data);
            console.log('data: ', data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    
    const requestData = {
        query: (queryData.requestData.year === 'all') ? 
            'SELECT * FROM stats LIMIT 15' : 
            `SELECT * FROM stats WHERE year = ${queryData.requestData.year} LIMIT 15`
    };
    
    useEffect(() => {
        // console.log(queryData);
        fetchData(requestData);
    }, [queryData]); // Run only once on component mount

    if (!responseData) {
        return <div>Loading...</div>;
    }

    return (
        <SortableTable responseData={responseData} />
        // <Container>
        //     <h2>Table</h2>
        //     <Table>
        //         <thead>
        //             <tr>
        //                 {responseData.columns.map((column, index) => (
        //                     <th key={index}>{column}</th>
        //                 ))}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {responseData.data.map((row, rowIndex) => (
        //                 <tr key={rowIndex}>
        //                     {responseData.columns.map((column, columnIndex) => (
        //                         <td key={columnIndex}>{row[column]}</td>
        //                     ))}
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </Table>
        // </Container>
    );
}
