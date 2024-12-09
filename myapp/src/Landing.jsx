import React from "react";
import Nav from "./Nav";
import axios from "axios";

function Landing() {
    const [searchTrains, setSearchTrains] = React.useState({
        source: "",
        des: "",
        date: ""
    });
    const [trainData, setTrainData] = React.useState([]);

    const handleSearchTrain = (e) => {
        const { name, value } = e.target;
        setSearchTrains({ ...searchTrains, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        axios.post("http://localhost:3001/train-deatails", searchTrains)
            .then((response) => {
                alert("Trains fetched successfully!");
                console.log("Response Data:", response.data);
                setTrainData(response.data); // Update state with train data
            })
            .catch((err) => {
                if (err.response?.status === 404) {
                    alert("No trains found for the given details.");
                } else if (err.response?.status === 500) {
                    alert("Some error occurred!");
                    console.error(err.response?.data);
                } else {
                    alert("An unexpected error occurred.");
                    console.error(err);
                }
            });
    };

    return (
        <div>
            <Nav />
            <section id="hero">
                <h1>Your Journey Starts Here</h1>
                <p>Book your bus tickets with ease and comfort</p>
                <form id="search-form" method="post" onSubmit={handleSubmit}>
                    <input type="text" onChange={handleSearchTrain} name="source" placeholder="From" required />
                    <input type="text" onChange={handleSearchTrain} name="des" placeholder="To" required />
                    <input type="date" onChange={handleSearchTrain} name="date" required />
                    <button type="submit">Search Trains</button>
                </form>
            </section>
            <section id="popular-routes">
                {trainData.length > 0 ? (
                    trainData.map((data, index) => (
                        <div key={index} className="route-card">
                            <h3>{data.source} to {data.destination}</h3>
                            <p>Date: {new Date(data.date).toLocaleDateString()}</p>
                            <p>Time: {data.time}</p>
                            <p>Seats Available: {data.total_seats}</p>
                            <button>Book Now</button>
                        </div>
                    ))
                ) : (
                    <p>No trains available for the selected criteria.</p>
                )}
            </section>
        </div>
    );
}

export default Landing;
