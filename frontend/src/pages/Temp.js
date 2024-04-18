import React, { useState, useEffect } from "react";

export default function Temp() {
    const [responseData, setResponseData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    table: 'ship',
                }),
            });
            const data = await response.json();
            setResponseData(data);
            console.log('data: ', data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // useEffect(() => {
    fetchData();
    // }, []);

    // Check if responseData is null
    if (!responseData) {
        return <div>Loading...</div>;
    }
    let data = JSON.stringify(responseData);

    return (
        <div>
            <p>Response Data: {data}</p>
        </div>
    );
}
