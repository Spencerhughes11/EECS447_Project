import React, { useState, useEffect } from "react";
import SortableTable from "./Table";


export default function Retreiveusers({ requestData }) {
    const [responseData, setResponseData] = useState(null);
    const [users, setUsers] = useState([]);


    // console.log('QD', queryData);
    const fetchData = async (queryData) => {
        try {
            // setIsLoading(true);

            const response = await fetch('http://127.0.0.1:5000/getfavplayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(queryData),
            });
            const data = await response.json();
            setResponseData(data);
            // setIsLoading(false);

            console.log("data: ", data);
            // console.log("respdata: ", responseData);
            // return data;
        } catch (error) {
            console.error('Error fetching data: ', error);
            // setIsLoading(false);

        }
    };
    // const req = queryData.requestData;
    // if (!requestData) {
    //     return <div>Loading...</div>;
    // }
    useEffect(() => {
        // if (requestData) {
            // const queryData = 'SELECT username FROM users'

        console.log('req', requestData);

          fetchData(requestData);
        // } else {
        //     return( <h1>Not good</h1>);
        // }
      }, []);

      if (!responseData) {
        return <div>Loading...</div>;
    }
    return (
        <SortableTable responseData={responseData} />

    );
}