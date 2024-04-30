import React, { useState, useEffect } from "react";
import { Col, Container, Row, Input, 
    Button,  DropdownToggle,
    DropdownMenu,  DropdownItem,
    Dropdown, Table} from "reactstrap";
    import SortableTable from "./Table";

export default function AddToFavorites(queryData) {
    const [responseData, setResponseData] = useState(null);

    const fetchData = async (requestData) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/setfavorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            setResponseData(data);
            console.log(data.message);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    
    const requestData = {

        position: queryData.requestData.position,
        cols: queryData.requestData.cols,
        team: queryData.requestData.team,
    };
    
    useEffect(() => {
        // console.log(requestData);
        fetchData(requestData);
    }, [queryData]); // Run only once on component mount

    if (!responseData) {
        return <div>Loading...</div>;
    }else {
    return(
        <>Added to Favorites!</>
    )}


}
