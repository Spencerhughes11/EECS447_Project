import React, { useState, useEffect } from "react";
import { Col, Container, Row, Input, 
    Button,  DropdownToggle,
    DropdownMenu,  DropdownItem,
    Dropdown, Table} from "reactstrap";

export default function Temp() {
    const [responseData, setResponseData] = useState(null);

    const fetchData = async (requestData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000', {
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
        query: 'SELECT name, year, ff_avg_speed FROM stats ORDER BY ff_avg_speed DESC LIMIT 10'
    };
    useEffect(() => {
        
        fetchData(requestData);
    }, []); // Run only once on component mount

    if (!responseData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h2>Table</h2>
            <Table>
                <thead>
                    <tr>
                        {responseData.columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {responseData.data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {responseData.columns.map((column, columnIndex) => (
                                <td key={columnIndex}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
