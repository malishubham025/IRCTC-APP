import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./viewTrains.css";

function ViewTrains() {
    const [trains, setTrains] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await axios.get("http://localhost:3001/view-trains");
                if (response.status === 200) {
                    setTrains(response.data.data);
                }
            } catch (err) {
                console.error("Error occurred:", err);
                if (err.response?.status === 404) {
                    setError("No trains found.");
                } else {
                    setError("Failed to fetch trains. Please try again.");
                }
            }
        };
    
        fetchTrains();
    }, []);
    

    return (
        <div className="train-table-container">
            <h1 style={{width:"20%",margin:"0 auto 0 auto"}}>All Trains </h1>
            {error && <p className="error-message">{error}</p>}
            <table className="train-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Seats</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.source}</td>
                            <td>{data.destination}</td>
                            <td>{data.seats}</td>
                            <td>
                                <button className="view-details-btn">View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewTrains;

